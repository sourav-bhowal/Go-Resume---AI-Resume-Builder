"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-premiumModal";
import { Plus } from "lucide-react";
import Link from "next/link";

// CreateResumeBtn.tsx
interface CreateResumeBtnProps {
  canCreateNewResume: boolean;
}

// Create the CreateResumeBtn component
export default function CreateResumeBtn({
  canCreateNewResume,
}: CreateResumeBtnProps) {
  // Use the usePremiumModal hook to get the state of the modal
  const premiumModal = usePremiumModal();

  // If the user can create a new resume, render the Create Resume Button
  if (canCreateNewResume) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/resume-editor">
          <Plus className="h-6 w-6" />
          Create New Resume
        </Link>
      </Button>
    );
  }

  // If the user cannot create a new resume, render the Premium Modal Button
  return (
    <Button
      onClick={() => premiumModal.onOpenChange(true)}
      className="mx-auto flex w-fit gap-2"
    >
      <Plus className="h-6 w-6" />
      Create New Resume
    </Button>
  );
}
