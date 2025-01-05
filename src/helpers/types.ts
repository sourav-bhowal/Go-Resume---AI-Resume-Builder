import { Prisma } from "@prisma/client";
import { ResumeValues } from "../lib/validation";

// Resume Editor Form Props
export interface ResumeEditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

// Resume Data Include Object
export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

// Type for Resume Data Select which includes Work Experiences and Educations
export type ResumeDataSelect = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;
