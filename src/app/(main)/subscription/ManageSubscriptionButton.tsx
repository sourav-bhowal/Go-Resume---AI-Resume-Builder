"use client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCustomerPortalSession } from "./actions";
import LoadingBtn from "@/components/shared/LoadingBtn";

// This component is used to manage the subscription
export default function ManageSubscriptionButton() {
  // This is hook that returns the toast function
  const { toast } = useToast();

  // This is a state variable that is used to manage the loading state of the button
  const [loading, setLoading] = useState(false);

  // This function is called when the button is clicked
  async function handleClick() {
    // This sets the loading state to true
    try {
      // set loading to true
      setLoading(true);
      // This function creates a customer portal session and returns the redirect url
      const redirectUrl = await createCustomerPortalSession();
      // This redirects the user to the redirect url
      window.location.href = redirectUrl;
    } catch (error) {
        // This logs the error to the console
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally { // This sets the loading state to false
      setLoading(false);
    }
  }

  // This is the button that is displayed to the user
  return (
    <LoadingBtn onClick={handleClick} loading={loading}>
      Manage subscription
    </LoadingBtn>
  );
}
