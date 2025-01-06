"use client";
import { ResumeDataSelectServer } from "@/helpers/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import ResumePreview from "../editor/ResumePreview";
import mapToResumeValues from "@/helpers/mapToResumeValues";
import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, Trash2 } from "lucide-react";
import deleteResume from "./actions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingBtn from "../LoadingBtn";

// intreface SingleResumeItemProps
interface SingleResumeItemProps {
  resume: ResumeDataSelectServer; // Resume Data
}

// Single Resume Item Component
export default function SingleResumeItem({ resume }: SingleResumeItemProps) {
  // Check if the resume was updated
  const wasUpdated = resume.updatedAt !== resume.createdAt;

  // Return the Single Resume Item
  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`/resume-editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "Untitled Resume"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {resume.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM dd, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/resume-editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          {/* Resume Preivew wrapped in maptoResumevalues because the ResumePreview component expects the data in a different format
          but the data is stored in a different format in the database so we need to convert it to the format that the ResumePreview component expects
        */}
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden rounded-lg shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <SingleResumeItemMoreMenu resumeId={resume.id} />
    </div>
  );
}

// interface for SingleResumeItemMoreMenuProps
interface SingleResumeItemMoreMenuProps {
  resumeId: string; // Resume ID
}

// Single Resume Item More Menu Component
function SingleResumeItemMoreMenu({ resumeId }: SingleResumeItemMoreMenuProps) {
  // Show Delete Dialog State
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false); // Show Delete Dialog State

  // Return the Single Resume Item More Menu
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button //
            variant={"ghost"}
            size={"icon"}
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVerticalIcon size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive"
            onClick={() => setShowDeleteConfirmationDialog(true)}
          >
            <Trash2 size={24} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteResumeConfirmationDialog // Delete Resume Confirmation Dialog
        resumeId={resumeId}
        open={showDeleteConfirmationDialog}
        onOpenChange={setShowDeleteConfirmationDialog}
      />
    </>
  );
}

// interface for DeleteResumeConfirmationDialogProps
interface DeleteResumeConfirmationDialogProps {
  resumeId: string; // Resume ID
  open: boolean; // Open State
  onOpenChange: (open: boolean) => void; // On Open Change Function
}

// Delete Resume Confirmation Dialog Component
function DeleteResumeConfirmationDialog({
  open,
  resumeId,
  onOpenChange,
}: DeleteResumeConfirmationDialogProps) {
  // Toast hook
  const { toast } = useToast();

  // Use Transition Hook
  const [isPending, startTransition] = useTransition();

  // Handle Delete Function
  async function handleDelete() {
    // Start Transition and try to delete the resume
    startTransition(async () => {
      try {
        await deleteResume(resumeId); // Delete the resume by calling the deleteResume server action
        onOpenChange(false); // Close the dialog
      } catch (error) {
        console.error(error);
        toast({
          // Show a toast message if there is an error
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  // Return the Delete Resume Confirmation Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingBtn
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingBtn>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
