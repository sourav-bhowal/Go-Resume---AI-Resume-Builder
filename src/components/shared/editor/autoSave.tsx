import { ResumeValues } from "@/lib/validation";
import useDebounce from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResumeServerAction } from "./actions";
import { Button } from "@/components/ui/button";
import fileReplacer from "@/helpers/fileReplacer";

// Hook to save the resume data automatically
export default function useAutoSave(resumeData: ResumeValues) {
  // Get the search params from the URL
  const searchParams = useSearchParams();
  // Get the toast function from the useToast hook
  const { toast } = useToast();
  // State to store the saving status
  const [isSaving, setIsSaving] = useState(false);
  // State to store the error status
  const [isError, setIsError] = useState(false);
  // State to store the resume ID
  const [resumeId, setResumeId] = useState(resumeData.id);

  // Debounce the resume data for 1 second
  const debouncedResumeData = useDebounce(resumeData, 1000);

  // State to store the last saved resume data
  const [lastSavedResumeData, setLastSavedResumeData] = useState(
    structuredClone(resumeData), // Clone the resume data to prevent reference equality
  );

  // UseEffect to update the resume ID when the search params change
  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  // Save the resume data when the debounced resume data changes and is not currently saving the data and has unsaved changes is available
  useEffect(() => {
    // Function to save the resume data automatically when the debounced resume data changes
    async function saveResumeData() {
      // Save the resume data
      try {
        // Set the saving status to true
        setIsSaving(true);
        // Set the error status to false
        setIsError(false);

        // Create a new resume data by cloning the debounced resume data
        const newResumeData = structuredClone(debouncedResumeData);

        // Save the updated resume data to the server using the saveResume server function
        const updatedResumeData = await saveResumeServerAction({
          id: resumeId,
          ...newResumeData,
          // If the photo is the same as the last saved photo, set the photo to undefined by checking the JSON.stringify of the last saved photo and the new photo using the fileReplacer function
          ...(JSON.stringify(lastSavedResumeData.photo, fileReplacer) ===
            JSON.stringify(newResumeData.photo, fileReplacer) && {
            photo: undefined,
          }),
        });

        // Set the resume ID to the updated resume data ID
        setResumeId(updatedResumeData.id);
        // Update the last saved resume data with the updated resume data
        setLastSavedResumeData(newResumeData);

        // If the resume ID in the search params is not the same as the updated resume data ID
        if (searchParams.get("resumeId") !== updatedResumeData.id) {
          // Push the updated resume data ID to existing search params
          const newSearchParams = new URLSearchParams(searchParams);
          // Set the resume ID to the updated resume data ID
          newSearchParams.set("resumeId", updatedResumeData.id);
          // Replace the search params in the URL with the updated search params
          window.history.replaceState({}, "", `?${newSearchParams.toString()}`);
        }
      } catch (error) {
        // Display an error toast message if the resume data fails to save
        setIsError(true);

        // Dismiss the toast message after 5 seconds
        const { dismiss } = toast({
          description: (
            <div className="space-y-3">
              <p>
                An error occurred while saving the resume data. Please try
                again.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss(); // Dismiss the toast message
                  saveResumeData(); // Retry saving the resume data
                }}
              >
                Retry
              </Button>
            </div>
          ),
          variant: "destructive",
        });
        console.error("Failed to save the resume data", error);
      } finally {
        // Set the saving status to false
        setIsSaving(false);
      }
    }

    // Check for unsaved changes between the debounced resume data and the last saved resume data using JSON.stringify and the fileReplacer function
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedResumeData, fileReplacer);

    // Check if the resume data has changed and is not currently saving the data and has unsaved chnages is available
    if (debouncedResumeData && hasUnsavedChanges && !isSaving && !isError) {
      saveResumeData(); // Save the resume data
    }
  }, [
    debouncedResumeData,
    isError,
    isSaving,
    lastSavedResumeData,
    resumeId,
    searchParams,
    toast,
  ]);

  // Return the saving status and the unsaved changes status of the resume data
  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(debouncedResumeData) !==
      JSON.stringify(lastSavedResumeData),
  };
}
