import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";

// Border styles for the BorderStyleSwitch component
export const borderStyles = {
  SQUARE: "square",
  ROUNDED: "rounded",
  SQUIRCLE: "squircle",
};

// Array of border styles for the BorderStyleSwitch component
const borderStyleIcons = Object.values(borderStyles);

// Interface for BorderStyleSwitch component
interface BorderStyleSwitchProps {
  borderStyle: string | undefined; // Border style
  setBorderStyle: (borderStyle: string) => void; // Function to set the border style
}
// This component is used to switch between different border styles
export default function BorderStyleSwitch({
  borderStyle,
  setBorderStyle,
}: BorderStyleSwitchProps) {
  // function to set the border style when the user changes the border style
  function handleBorderStyleChange() {
    // Get the current border style index from the borderStyleIcons array if the border style is present else set it to 0
    const currentIndex = borderStyle
      ? borderStyleIcons.indexOf(borderStyle)
      : 0;
    // Get the next border style index by incrementing the current index by 1 and taking the remainder when divided by the length of the borderStyleIcons array to loop back to the start
    const nextIndex = (currentIndex + 1) % borderStyleIcons.length;
    // Set the next border style in the state
    setBorderStyle(borderStyleIcons[nextIndex]);
  }

  // Get the icon based on the current border style
  const Icon =
    borderStyle === borderStyles.SQUARE
      ? "Square"
      : borderStyle === borderStyles.ROUNDED
        ? "Rounded"
        : "Squircle";

  // Return the BorderStyleSwitch component
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      title="Change border style"
      onClick={handleBorderStyleChange}
    >
      {Icon === "Squircle" ? (
        <Squircle size={24} />  // Squircle icon
      ) : Icon === "Rounded" ? (
        <Circle size={24} />  // Circle icon
      ) : (
        <Square size={24} />  // Square icon
      )}
    </Button>
  );
}
