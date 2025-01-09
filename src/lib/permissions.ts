import { SubscriptionLevel } from "./subscriptions";

// Function to check if a user can create a resume
export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
) {
  // Map of the maximum number of resumes a user can create based on their subscription level
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: 1,
    premium: 3,
    premium_plus: Infinity,
  };

  // Get the maximum number of resumes for the user's subscription level from the map
  const maxResumes = maxResumeMap[subscriptionLevel];

  // Check if the user has not reached the maximum number of resumes
  return currentResumeCount < maxResumes;
}

// Function to check if a user can use AI tools 
export function canUseAITools(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel !== "free"; // AI tools are available for all subscription levels except free
}

// Function to check if a user can use customization tools
export function canUseCustomizationTools(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel === "premium_plus"; // Customization tools are only available for premium plus users
}
