import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSubscriptionLevel } from "@/context/SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/use-premiumModal";
import { canUseCustomizationTools } from "@/lib/permissions";
import { Palette } from "lucide-react";
import { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";

// Interface for color picker
interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

// Color picker component
export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  // Get the user's subscription level
  const subscriptionLevel = useSubscriptionLevel();

  // Custom hook to show premium modal component
  const premiumModal = usePremiumModal();

  // State for showing popover
  const [showPopOver, setShowPopOver] = useState(false);

  // Color picker component
  return (
    // Popover component for color picker
    <Popover open={showPopOver} onOpenChange={setShowPopOver}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Change resume color"
          onClick={() => {
            // If the user can't use customization tools, show the premium modal
            if (!canUseCustomizationTools(subscriptionLevel)) {
              premiumModal.onOpenChange(true); // Open the premium modal
              return; // Return to prevent showing the color picker popover
            }
            // Show the color picker popover if the user can use customization tools
            setShowPopOver(true);
          }}
        >
          <Palette size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker color={color} onChange={onChange} triangle="top-right" />
      </PopoverContent>
    </Popover>
  );
}
