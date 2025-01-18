import PremiumModal from "@/components/shared/premium/PremiumModal";
import SubscriptionLevelProvider from "@/context/SubscriptionLevelProvider";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import { auth } from "@clerk/nextjs/server";

// This is the main layout for the application. It includes the Navbar component and the children components.
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the user ID from the session
  const { userId } = await auth();

  // If the user ID is not null, then the user is logged in
  if (!userId) return null;

  // Get the user's subscription level
  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);

  // Provide the user's subscription level to the SubscriptionLevelProvider
  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="flex min-h-screen flex-col">
        {children}
        <PremiumModal />
      </div>
    </SubscriptionLevelProvider>
  );
}
