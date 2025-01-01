import { ResumeValues } from "@/helpers/validation";
import ResumePreview from "../ResumePreview";

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
    <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
      <ResumePreview resumeData={resumeData} className="max-w-2xl shadow-md" />
    </div>
  );
}
