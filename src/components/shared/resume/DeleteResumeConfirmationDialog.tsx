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
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

// interface for DeleteResumeConfirmationDialogProps
interface DeleteResumeConfirmationDialogProps {
  resumeId: string; // Resume ID
  open: boolean; // Open State
  onOpenChange: (open: boolean) => void; // On Open Change Function
}

// Delete Resume Confirmation Dialog Component
export default function DeleteResumeConfirmationDialog({
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
