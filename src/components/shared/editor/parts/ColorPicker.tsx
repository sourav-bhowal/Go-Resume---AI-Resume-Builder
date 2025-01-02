import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
          onClick={() => setShowPopOver(true)}
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
