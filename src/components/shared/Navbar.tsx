"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { CreditCard, PenIcon } from "lucide-react";
import ThemeToggler from "./ThemeToogler";

// NavBar component
export default function NavBar() {
  // Get the user object from the useUser hook Clerk provides
  const { user, isLoaded } = useUser();
  const { theme } = useTheme();

  // Return the NavBar component
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-purple-500 md:text-2xl"
            >
              Go Resume
            </Link>
          </div>

          {/* CTA Button For large screens*/}
          <div className="flex items-center gap-5">
            <ThemeToggler />
            {isLoaded &&
              (user ? (
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: {
                        width: 40,
                        height: 40,
                      },
                    },
                    baseTheme: theme === "dark" ? dark : undefined,
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      href="/my-resumes"
                      label="My Resumes"
                      labelIcon={<PenIcon />}
                    />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      href="/subscription"
                      label="Subscriptions"
                      labelIcon={<CreditCard />}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <Link href="/my-resumes">
                  <Button className="bg-pink-600 text-white transition-colors duration-200 hover:bg-pink-700">
                    Get Started
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
