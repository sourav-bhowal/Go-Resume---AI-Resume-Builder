import { ResumeValues } from "@/helpers/validation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import LoadingBtn from "../../LoadingBtn";
import { WandSparklesIcon } from "lucide-react";
import { generateSummary } from "./actions";

// GenerateSummaryBtnProps
interface GenerateSummaryBtnProps {
  resumeData: ResumeValues;
  onAISummaryGenerated: (summary: string) => void; // onSummaryGenerated function prop
}
// GenerateSummaryBtn component
export default function GenerateSummaryBtn({
  resumeData,
  onAISummaryGenerated,
}: GenerateSummaryBtnProps) {
  // useToast hook
  const { toast } = useToast();

  // useState hooks for loading state
  const [loading, setLoading] = useState(false);

  // generateSummary function to generate summary
  async function handleClick() {
    //TODO: subscription

    // try block to handle error
    try {
      // set loading state to true
      setLoading(true);

      // Call the server sction to generate summary
      const aiResponse = await generateSummary(resumeData);

      // onAISummaryGenerated function to pass the summary to the parent component
      onAISummaryGenerated(aiResponse);
    } catch (error) {
      // catch block to handle error
      console.error(error);
      // toast notification
      toast({
        title: "An error occurred",
        description: "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      // finally block to set loading state to false
      setLoading(false);
    }
  }

  // LoadingBtn with WandSparklesIcon and Generate Summary text
  return (
    <LoadingBtn
      variant={"outline"}
      type="button"
      onClick={handleClick} // onClick event handler
      loading={loading}
    >
      <WandSparklesIcon size={24} />
      Generate Summary
    </LoadingBtn>
  );
}
