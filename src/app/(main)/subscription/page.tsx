import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import Stripe from "stripe";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import GetSubscriptionButton from "./GetSubscriptionButton";

// Metadata is used to set the page title
export const metadata: Metadata = {
  title: "my subscriptions",
};

// The page component
export default async function MySubscriptionsPage() {
  // Get the user ID from the session
  const { userId } = await auth();

  // If the user is not logged in, return null
  if (!userId) {
    return null;
  }

  // Get the user's subscription from the database
  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  // Get the price info for the subscription from Stripe
  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  // Render the page
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Current Plan</h1>
      <p>
        Your current plan:{" "}
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription will be canceled on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}
