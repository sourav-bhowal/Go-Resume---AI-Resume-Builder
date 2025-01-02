import { ResumeValues } from "@/helpers/validation";
import ResumePreview from "../ResumePreview";
import ColorPicker from "./ColorPicker";
import BorderStyleSwitch from "./BorderStyleSwitch";

// Interface for Resume Preview
interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

// Resume Preview Section Component
export default function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="group relative hidden w-1/2 md:flex">
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        <ColorPicker // Color picker component
          color={resumeData.colorHex} // Set the color hex in the color picker
          onChange={
            (color) => setResumeData({ ...resumeData, colorHex: color.hex }) // Set the color hex in the resume data
          }
        />
        <BorderStyleSwitch // Border style switch component
          borderStyle={resumeData.borderStyle} // Set the border style
          setBorderStyle={
            (borderStyle) => setResumeData({ ...resumeData, borderStyle }) // Set the border style in the resume data
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
