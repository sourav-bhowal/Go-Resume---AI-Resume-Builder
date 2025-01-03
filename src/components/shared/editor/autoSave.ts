import { ResumeValues } from "@/helpers/validation";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

// Hook to save the resume data automatically
export default function useAutoSave(resumeData: ResumeValues) {
  // Debounce the resume data
  const debouncedResumeData = useDebounce(resumeData, 1000); // Debounce for 1 second

  // State to store the last saved resume data
  const [lastSavedResumeData, setLastSavedResumeData] = useState(
    structuredClone(resumeData), // Clone the resume data to prevent reference equality
  );

  // State to store the saving status
  const [isSaving, setIsSaving] = useState(false);

  // Save the resume data when the debounced resume data changes and is not currently saving the data and has unsaved changes is available 
  useEffect(() => {
    // Function to save the resume data automatically when the debounced resume data changes
    async function saveResumeData() {
      // Set the saving status to true
      setIsSaving(true);

      // Save the resume data
      try {
        // Simulate saving the resume data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update the last saved resume data
        setLastSavedResumeData(structuredClone(debouncedResumeData));
      } catch (error) {
        console.error("Failed to save the resume data", error);
      }

      // Set the saving status to false
      setIsSaving(false);
    }

    // Check for unsaved changes between the debounced resume data and the last saved resume data
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !==
      JSON.stringify(lastSavedResumeData);

    // Check if the resume data has changed and is not currently saving the data and has unsaved chnages is available
    if (debouncedResumeData && hasUnsavedChanges && !isSaving) {
      saveResumeData();
    }
  }, [debouncedResumeData, isSaving, lastSavedResumeData]);

  // Return the saving status and the unsaved changes status of the resume data
  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(debouncedResumeData) !==
      JSON.stringify(lastSavedResumeData),
  };
}
