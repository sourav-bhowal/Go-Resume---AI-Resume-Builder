import { env } from "@/env";
import { cache } from "react";
import prisma from "./prisma";

// Define the subscription levels
export type SubscriptionLevel = "free" | "premium" | "premium_plus";

// Get the subscription level for a user
export const getUserSubscriptionLevel = cache(
  // Cache the result of this function so it doesn't need to be called multiple times
  async (userId: string): Promise<SubscriptionLevel> => {
    // Get the user's subscription from the database
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    // If the user doesn't have a subscription or it has expired, they are on the free plan
    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "free";
    }

    // Check the subscription price ID to determine the subscription level for Premium
    if (
      subscription.stripePriceId ===
      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY
    ) {
      return "premium";
    }

    // Check the subscription price ID to determine the subscription level for Premium Plus
    if (
      subscription.stripePriceId ===
      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PLUS_MONTHLY
    ) {
      return "premium_plus";
    }

    // If the subscription is not recognized, throw an error
    throw new Error("Invalid subscription");
  },
);
