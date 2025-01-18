import FAQ from "@/components/shared/home/FAQ";
import Features from "@/components/shared/home/Features";
import Footer from "@/components/shared/home/Footer";
import Hero from "@/components/shared/home/Hero";
import PricingSection from "@/components/shared/home/Pricing";
import Working from "@/components/shared/home/Working";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId!);
  return (
    <main>
      <Hero />
      <Features />
      <Working />
      <PricingSection userSubscriptionLevel={userSubscriptionLevel} />
      <FAQ />
      <Footer />
    </main>
  );
}
