"use client";
import { SubscriptionLevel } from "@/lib/subscriptions";
import { createContext, ReactNode, useContext } from "react";

// Create a context to store the user's subscription level
const SubscriptionLevelContext = createContext<SubscriptionLevel | undefined>(
  undefined, // Initial value of the context
);

// Define the props for the SubscriptionLevelProvider component
interface SubscriptionLevelProviderProps {
  children: ReactNode;
  userSubscriptionLevel: SubscriptionLevel;
}

// Create the SubscriptionLevelProvider component
export default function SubscriptionLevelProvider({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProviderProps) {
  return (
    // Provide the user's subscription level to the context for all children
    <SubscriptionLevelContext.Provider value={userSubscriptionLevel}>
      {children}
    </SubscriptionLevelContext.Provider>
  );
}

// Custom hook to access the user's subscription level from the context
export function useSubscriptionLevel() {
  // Get the user's subscription level from the context
  const context = useContext(SubscriptionLevelContext);
  // Throw an error if the hook is used outside of the SubscriptionLevelProvider
  if (context === undefined) {
    throw new Error(
      "useSubscriptionLevel must be used within a SubscriptionLevelProvider",
    );
  }
  // Return the user's subscription level
  return context; // Now the context cannot be undefined
}
