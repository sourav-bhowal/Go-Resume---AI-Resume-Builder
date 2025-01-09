import { env } from "@/env";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import Stripe from "stripe";

// POST endpoint for Stripe webhook
export async function POST(request: NextRequest) {
  try {
    // Get the payload and signature from the request
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");

    // If the signature is missing, return a 400 error
    if (!signature) {
      return new Response("Signature is missing", { status: 400 });
    }

    // Construct the event from the payload and signature using the Stripe SDK
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );

    // console.log("Event type:", event.type, event.data.object);

    // Handle the event based on its type
    switch (event.type) {
      case "checkout.session.completed": // Handle checkout session completed
        await handleCheckoutSessionCompleted(event.data.object); // Call the handler function for checkout session completed
        break; // Break out of the switch statement
      case "customer.subscription.created": // Handle subscription created
      case "customer.subscription.updated": // Handle subscription updated
        await handleSubscriptionCreatedOrUpdated(event.data.object.id); // Call the handler function for subscription created or updated
        break; // Break out of the switch statement
      case "customer.subscription.deleted": // Handle subscription deleted
        await handleSubscriptionDeleted(event.data.object); // Call the handler function for subscription deleted
        break; // Break out of the switch statement
      default: // Handle other events
        console.log(`Unhandled event type: ${event.type}`); // Log the event type
        break; // Break out of the switch statement
    }

    // Return a 200 response if the event is successfully handled
    return new Response("Event received", { status: 200 });
  } catch (error) {
    // Log and return a 500 response if an error occurs
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Handler function for checkout session completed
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  // Retrieve the user ID from the session
  const userId = session.metadata?.userId;

  // If the user ID is missing, throw an error
  if (!userId) {
    throw new Error("User ID is missing in session metadata");
  }

  // Update the user metadata of Clerk with the Stripe customer ID from the session data
  await (
    await clerkClient()
  ).users.updateUserMetadata(userId, {
    privateMetadata: {
      stripeCustomerId: session.customer as string,
    },
  });
}

// Handler function for subscription created or updated event
async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
  // Retrieve the subscription from Stripe using the subscription ID
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // If the subscription is active, trialing, or past due, upsert the subscription in the database
  if (
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due"
  ) {
    // Upsert the subscription in the database using Prisma client
    await prisma.userSubscription.upsert({
      where: {
        userId: subscription.metadata.userId,
      },
      create: {
        // Create the subscription object if it doesn't exist
        userId: subscription.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      update: {
        stripePriceId: subscription.items.data[0].price.id, // Update the price ID if it has changed in Stripe (e.g., due to a plan change)
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000, // Update the current period end date if it has changed in Stripe (e.g., due to a renewal)
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end, // Update the cancel at period end flag if it has changed in Stripe (e.g., due to a cancellation)
      },
    });
  }
  // If the subscription is canceled, delete the subscription from the database
  else {
    await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    });
  }
}

// Handler function for subscription deleted event
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.userSubscription.deleteMany({
    where: {
      stripeCustomerId: subscription.customer as string,
    },
  });
}
