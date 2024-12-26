"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ThemeToggler from "./ThemeToogler";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

// Navbar component
export default function Navbar() {
  const { theme } = useTheme();
  return (
    <nav className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href={"/my-resumes"} className="flex items-center gap-2">
          <Image
            src={logo}
            width={40}
            height={40}
            alt="logo"
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight text-pink-700">
            Go Resume
          </span>
        </Link>
        <div className="flex items-center justify-center gap-4">
          <ThemeToggler />
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
                href="/subscription"
                label="Subscriptions"
                labelIcon={<CreditCard />}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </nav>
  );
}
