"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-premiumModal";

export default function GetSubscriptionButton() {
  const premiumModal = usePremiumModal();

  return (
    <Button onClick={() => premiumModal.onOpenChange(true)}>
      Get Premium Plus Subscription
    </Button>
  );
}
