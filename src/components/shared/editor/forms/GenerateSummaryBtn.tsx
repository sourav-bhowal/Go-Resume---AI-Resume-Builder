import { ResumeValues } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import LoadingBtn from "../../LoadingBtn";
import { WandSparklesIcon } from "lucide-react";
import { generateSummary } from "./actions";
import { useSubscriptionLevel } from "@/context/SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/use-premiumModal";
import { canUseAITools } from "@/lib/permissions";

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

  // Get the user's subscription level
  const subscriptionLevel = useSubscriptionLevel();

  // Custom hook to show premium modal component
  const premiumModal = usePremiumModal();

  // generateSummary function to generate summary
  async function handleClick() {
    // If the user can't use AI tools, show the premium modal
    if (!canUseAITools(subscriptionLevel)) {
      premiumModal.onOpenChange(true); // Open the premium modal
      return; // Return to prevent generating summary
    }

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
      disabled={!canUseAITools(subscriptionLevel)} // disabled if user can't use AI tools
    >
      <WandSparklesIcon size={24} />
      Generate Summary (AI)
    </LoadingBtn>
  );
}
