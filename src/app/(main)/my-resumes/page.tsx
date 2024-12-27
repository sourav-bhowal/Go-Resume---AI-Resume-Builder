import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

// Metadata
export const metadata: Metadata = {
  title: "My Resumes",
  description: "My Resumes Page",
};

// My Resumes Page
export default function MyResumesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/new-resume">
          <Plus className="h-6 w-6" />
          Create New Resume
        </Link>
      </Button>
    </main>
  );
}
