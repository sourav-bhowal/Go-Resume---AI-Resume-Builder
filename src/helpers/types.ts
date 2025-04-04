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
  certificates: true,
  projects: true,
} satisfies Prisma.ResumeInclude;

// Type for Resume Data Select which includes Work Experiences and Educations i.e Resume Data Select Server
export type ResumeDataSelectServer = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;
