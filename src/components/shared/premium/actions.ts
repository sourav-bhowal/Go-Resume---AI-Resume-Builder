"use server";
import { env } from "@/env";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

// This function will create a new checkout session
export async function createCheckoutSession(priceId: string) {
  // Get the current user
  const user = await currentUser();

  // If the user is not signed in, throw an error
  if (!user) {
    throw new Error("You must be signed in to create a checkout session");
  }

  // Create a new checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      // Add the price ID and quantity to the line items
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription", // Set the mode to subscription
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/subscription/success`, // Redirect to the premium page on success
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/subscription`, // Redirect to the cancel page on cancel
    customer_email: user.emailAddresses[0].emailAddress, // Set the customer email to the user's email
    subscription_data: {
      // Add the user ID to the subscription metadata so we can associate the subscription with the user
      metadata: {
        userId: user.id,
      },
    },
    custom_text: {
      // Add custom text to the checkout session
      terms_of_service_acceptance: {
        message: `I have read the Go Resume [terms of service.](${env.NEXT_PUBLIC_BASE_URL}/tos) I understand that I am subscribing to a recurring payment and that I can cancel at any time.`,
      },
    },
    consent_collection: {
      terms_of_service: "required",
    },
  });

  // If the session not created, throw an error
  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  // Return the session URL
  return session.url;
}
