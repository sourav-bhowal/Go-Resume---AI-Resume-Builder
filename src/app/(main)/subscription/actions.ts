"use server";
import { env } from "@/env";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

// Server action to create a customer portal session
export async function createCustomerPortalSession() {
  // Get the current user
  const user = await currentUser();

  // If the user is not found, throw an error
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Get the stripe customer ID from the user's private metadata
  const stripeCustomerId = user.privateMetadata.stripeCustomerId as
    | string
    | undefined;

  // If the stripe customer ID is not found, throw an error
  if (!stripeCustomerId) {
    throw new Error("Stripe customer ID not found");
  }

  // Create a customer portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${env.NEXT_PUBLIC_BASE_URL}/subscription`,
  });

  // If the session URL is not found, throw an error
  if (!session.url) {
    throw new Error("Failed to create customer portal session");
  }

  // Return the session URL
  return session.url;
}
