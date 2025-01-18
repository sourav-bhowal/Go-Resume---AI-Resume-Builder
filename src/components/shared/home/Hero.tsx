import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// HERO SECTION OF THE HOME PAGE
export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center transition-colors duration-300">
      {/* Light mode gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 transition-opacity duration-300 dark:opacity-0" />

      {/* Dark mode gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-gray-900 to-pink-950 opacity-0 transition-opacity duration-300 dark:opacity-100" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

      {/* Content */}
      <div className="relative">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center space-y-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-950/10 px-4 py-2 text-purple-700 backdrop-blur-sm hover:bg-purple-950/20 dark:bg-purple-300/10 dark:text-purple-300 dark:hover:bg-purple-300/20">
              <div className="h-2 w-2 rounded-full bg-pink-600" />
              New Features Released
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl">
              Create Your Perfect Resume using AI with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                Go Resume
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-gray-400 md:text-xl">
              Go Resume is the best way to create a professional resume that
              will help you land your dream job. Get started for free today!
            </p>

            <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
              <Link href="/my-resumes">
                <Button className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-600 px-8 py-6 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a061d]">
                  Get Started
                  <ArrowRight className="inline-block h-6 w-6" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  variant={"ghost"}
                  className="rounded-full w-full border border-gray-700 px-8 py-6 font-medium text-black transition-colors duration-200 hover:bg-gray-800 hover:text-gray-300 dark:text-gray-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}
