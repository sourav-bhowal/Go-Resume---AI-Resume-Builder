"use client";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "../editor/parts/BreadCrumbs";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./parts/ResumePreviewSection";
import { FileUserIcon, Loader2, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import useUnloadWarning from "@/hooks/use-unloadWarning";
import useAutoSave from "./autoSave";
import { ResumeDataSelect } from "@/helpers/types";
import mapToResumeValues from "@/helpers/mapToResumeValues";

// New Resume Editor Props
interface NewResumeEditorProps {
  resumeToEdit: ResumeDataSelect | null; // Resume to edit data
}

// New Resume Editor Component
export default function NewResumeEditor({
  resumeToEdit,
}: NewResumeEditorProps) {
  // Get the search params
  const searchParams = useSearchParams();

  // State for Resume Data
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {}, // If resumeToEdit is provided, map it to ResumeValues else empty object
  );

  // State to show resume preview in small screens
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  // Hook to show a warning when the user tries to leave the page with unsaved changes
  const { isSaving, hasUnsavedChanges } = useAutoSave(resumeData);

  // Show a warning when the user tries to leave the page with unsaved changes
  useUnloadWarning(hasUnsavedChanges);

  // Get current step
  const currentStep = searchParams.get("step") || steps[0].key;

  // Set the current step in the URL along with the search params
  function setStep(key: string) {
    // Create a new URLSearchParams object
    const newSearchParams = new URLSearchParams(searchParams);
    // Set the step key in the search params
    newSearchParams.set("step", key);
    // Push the new search params to the URL
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  // Get the current Form Component
  const CurrentFormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  // Return the component
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-2 text-center">
        <h1 className="text-2xl font-bold">Create a new resume</h1>
        <p className="text-sm text-muted-foreground">
          Start with a blank canvas and follow the steps to create your resume.
        </p>
      </header>
      {/* EDITOR */}
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          {/* LEFT PANEL */}
          <div
            className={cn(
              "w-full space-y-5 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {CurrentFormComponent && (
              <CurrentFormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          {/* RIGHT PANEL */}
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      {/* FOOTER */}
      <footer className="w-full border-t px-3 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                // Get the index of the current step
                const currentIndex = steps.findIndex(
                  (step) => step.key === currentStep,
                );
                // Get the previous step
                const previousStep = steps[currentIndex - 1];
                // If there is a previous step, set the step to the previous step
                if (previousStep) {
                  setStep(previousStep.key);
                }
              }}
              disabled={steps[0].key === currentStep}
            >
              Prev
            </Button>
            <Button
              onClick={() => {
                // Get the index of the current step
                const currentIndex = steps.findIndex(
                  (step) => step.key === currentStep,
                );
                // Get the next step
                const nextStep = steps[currentIndex + 1];
                // If there is a next step, set the step to the next step
                if (nextStep) {
                  setStep(nextStep.key);
                }
              }}
              disabled={steps[steps.length - 1].key === currentStep}
            >
              Next
            </Button>
          </div>
          <div className="flex items-center gap-3">
            {/* Button to show or hide resume preview in small screens */}
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => setShowSmResumePreview(!showSmResumePreview)}
              className="md:hidden"
              title={
                showSmResumePreview ? "Show Resume Form" : "Show Resume Preview"
              }
            >
              {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
            </Button>
            <Button variant={"secondary"} asChild>
              <Link href="/my-resumes">Close</Link>
            </Button>
            <div className="text-muted-foreground">
              {isSaving ? ( // Show saving status if saving
                <p className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Saving...
                </p>
              ) : hasUnsavedChanges ? ( // Show unsaved changes if there are unsaved changes
                "Unsaved changes"
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
