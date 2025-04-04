import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/shared/Navbar";
import { dark } from "@clerk/themes";

// Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

// metadata of the website
export const metadata: Metadata = {
  title: {
    template: "%s - Go Resume",
    absolute: "Go Resume - AI Resume Builder",
  },
  description:
    "Go Resume uses AI to generate a resume for you. Just fill in your details and get a resume in seconds.",
};

// RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ClerkProvider for authentication and user management
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning className="scroll-smooth">
        <body className={inter.className}>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster /> {/* Toaster for notifications */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
