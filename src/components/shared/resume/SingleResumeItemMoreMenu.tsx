import DeleteResumeConfirmationDialog from "./DeleteResumeConfirmationDialog";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, PrinterIcon, Trash2 } from "lucide-react";

// Interface for SingleResumeItemMoreMenuProps
interface SingleResumeItemMoreMenuProps {
  resumeId: string; // Resume ID
  onPrintClick: () => void; // On Print Click callback function
}

// Single Resume Item More Menu Component
export default function SingleResumeItemMoreMenu({
  resumeId,
  onPrintClick,
}: SingleResumeItemMoreMenuProps) {
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
          <DropdownMenuItem // Print Dropdown Menu Item
            className="flex items-center gap-2"
            onClick={onPrintClick} // On Print Click callback function
          >
            <PrinterIcon size={24} />
            Print
          </DropdownMenuItem>
          <DropdownMenuItem // Delete Dropdown Menu Item
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
