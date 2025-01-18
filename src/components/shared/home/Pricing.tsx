"use client";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "../premium/actions";
import { env } from "@/env";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// PricingSectionProps
interface PricingSectionProps {
  userSubscriptionLevel: "free" | "premium" | "premium_plus";
}

// PricingSection
export default function PricingSection({
  userSubscriptionLevel,
}: PricingSectionProps) {
  const plans = [
    {
      name: "Free",
      price: 0,
      features: ["1 Resume", "PDF Download"],
      currentPlan: userSubscriptionLevel === "free",
    },
    {
      name: "Premium",
      price: 4.99,
      features: [
        "3 Resumes",
        "No AI Support",
        "No Customization",
        "PDF Download",
      ],
      buttonText: userSubscriptionLevel !== "premium" && "Upgrade Now",
      buttonVariant: userSubscriptionLevel !== "premium" && "default",
      currentPlan: userSubscriptionLevel === "premium",
      priceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY,
    },
    {
      name: "Premium Plus",
      price: 14.99,
      features: [
        "Unlimited Resumes",
        "AI Support",
        "Customizations",
        "PDF Download",
      ],
      buttonText: userSubscriptionLevel !== "premium_plus" && "Upgrade Now",
      buttonVariant: userSubscriptionLevel !== "premium_plus" && "default",
      currentPlan: userSubscriptionLevel === "premium_plus",
      popular: true,
      priceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PLUS_MONTHLY,
    },
  ];

  // Get the toast function
  const { toast } = useToast();

  // Create a state to manage the loading state of the modal
  const [loading, setLoading] = useState(false);

  async function handleCheckOut(priceId: string) {
    try {
      // Set the loading state to true
      setLoading(true);

      // Call the checkout server action from the usePremiumModal hook with the price ID
      const redirectUrl = await createCheckoutSession(priceId);

      // Redirect the user to the checkout URL
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      // Show an error toast if there is an error
      toast({
        title: "Error",
        description: "An error occurred while processing your payment",
        variant: "destructive",
      });
    } finally {
      // Set the loading state to false
      setLoading(false);
    }
  }

  return (
    <section id="pricing" className="bg-neutral-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400">
            Choose the perfect plan for your career needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`transform rounded-2xl bg-neutral-800 p-8 transition-all duration-300 hover:-translate-y-2 ${
                index === 1
                  ? "animate__delay-1s"
                  : index === 2
                    ? "animate__delay-2s"
                    : ""
              } relative`}
            >
              {plan.popular && (
                <div className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-sm text-white">
                  Popular
                </div>
              )}
              <div className="mb-8 text-center">
                <h3 className="mb-4 text-xl text-white">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="ml-2 text-gray-400">/month</span>
                </div>
              </div>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="mr-3 h-5 w-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.currentPlan ? (
                <p className="text-md flex items-center justify-center rounded-md font-semibold text-green-500">
                  <Check className="mr-2 h-5 w-5" />
                  Current Plan
                </p>
              ) : (
                plan.buttonText && (
                  <Button
                    variant={plan?.buttonVariant as "outline" | "default"}
                    className="w-full py-3 transition-all duration-300 hover:scale-105"
                    onClick={() => handleCheckOut(plan.priceId)}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      plan.buttonText
                    )}
                  </Button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
