import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
