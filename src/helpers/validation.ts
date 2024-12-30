import { z } from "zod";

// Optional string that can be empty
const optionalString = z.string().trim().optional().or(z.literal(""));

// Define the schema for the info object
export const generateInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

// Define the type for the info object
export type GenerateInfoValues = z.infer<typeof generateInfoSchema>;

// Define the schema for the personal info object
export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Please upload an image file",
    )
    .refine(
      (file) => !file || file.size <= 4 * 1024 * 1024,
      "File size too large. Max 4MB",
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  email: optionalString,
  phone: optionalString,
  country: optionalString,
  city: optionalString,
  state: optionalString,
});

// Define the type for the personal info object
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

// Define the schema for the work experience object which is an array of objects
export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        location: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

// Define the type for the work experience object
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

// Define the schema for the education object which is an array of objects
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        school: optionalString,
        degree: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

// Define the type for the education object
export type EducationValues = z.infer<typeof educationSchema>;

// Define the schema for the skills object which is an array of strings
export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

// Define the type for the skills object
export type SkillsValues = z.infer<typeof skillsSchema>;

// Define the schema for the summary object
export const summarySchema = z.object({
  summary: optionalString,
});

// Define the type for the summary object
export type SummaryValues = z.infer<typeof summarySchema>;

// Define the schema for the resume object which is a combination of the above schemas
export const resumeSchema = z.object({
  ...generateInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
});

// Define the type for the resume object
export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
