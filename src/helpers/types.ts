import { ResumeValues } from "./validation";

// Resume Editor Form Props
export interface ResumeEditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}
