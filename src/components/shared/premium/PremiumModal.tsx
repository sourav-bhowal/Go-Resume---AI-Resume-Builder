"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePremiumModal from "@/hooks/use-premiumModal";
import { useToast } from "@/hooks/use-toast";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { createCheckoutSession } from "./actions";
import { env } from "@/env";

// Features to display in the modal
const freeFeatures = ["1 resume"];
const premiumFeatures = ["AI Tools", "Up to 3 resumes"];
const premiumPlusFeatures = [
  "AI Tools",
  "Design Customizations",
  "Unlimited resumes",
];

// PremiumModal.tsx
export default function PremiumModal() {
  // Get the open state and onOpenChange function from the hook usePremiumModal that we created using Zustand
  const { open, onOpenChange } = usePremiumModal();

  // Get the toast function
  const { toast } = useToast();

  // Create a state to manage the loading state of the modal
  const [loading, setLoading] = useState(false);

  // Handle the checkout process
  async function handlePremiumCheckout(priceId: string) {
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

  // Render the modal
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        // Define an onOpenChange function that takes the open state as an argument
        if (!loading) {
          // Check if the loading state is false before calling the onOpenChange function
          onOpenChange(open); // Call the onOpenChange function with the open state
        }
      }}
    >
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-3xl text-primary">
            Go Resume AI Premium
          </DialogTitle>
          <p className="text-muted-foreground">
            Get a premium subscription to unlock more features.
          </p>
        </DialogHeader>
        <div className="mt-10 space-y-6">
          <div className="flex gap-10">
            <div className="flex w-1/3 flex-col space-y-5 p-7 font-semibold">
              <h3 className="text-3xl font-semibold">Free</h3>
              <ul className="list-inside space-y-2">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex w-1/3 scale-110 flex-col space-y-3 rounded-lg bg-gradient-to-b from-pink-800 to-pink-600 p-7 text-lg font-bold shadow-lg">
              <p className="absolute -top-4 left-20 rounded-full bg-white px-3 py-1 text-center font-semibold text-black">
                Most Popular
              </p>
              <h3 className="text-3xl">Premium</h3>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={"secondary"}
                className="absolute bottom-9 w-[80%] font-bold tracking-wide"
                onClick={() =>
                  // Call the handlePremiumCheckout function with the price ID of the premium monthly plan
                  handlePremiumCheckout(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY,
                  )
                }
                disabled={loading} // Disable the button if the loading state is true
              >
                Get Premium
              </Button>
            </div>
            <div className="flex w-1/3 flex-col space-y-5 rounded-lg bg-gradient-to-b from-gray-400 to-white p-7 font-semibold text-black">
              <h3 className="text-3xl">Premium Plus</h3>
              <ul className="list-inside space-y-2">
                {premiumPlusFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="font-semibold tracking-wide"
                onClick={() =>
                  // Call the handlePremiumCheckout function with the price ID of the premium plus monthly plan
                  handlePremiumCheckout(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PLUS_MONTHLY,
                  )
                }
                disabled={loading} // Disable the button if the loading state is true
              >
                Get Premium Plus
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
