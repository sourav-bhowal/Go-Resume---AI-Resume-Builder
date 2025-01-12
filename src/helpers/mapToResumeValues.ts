import { ResumeDataSelectServer } from "./types";
import { ResumeValues } from "../lib/validation";

// Map Resume Data to Resume Values for validation so that the server generated resume data can be validated against the schema
export default function mapToResumeValues(
  data: ResumeDataSelectServer,
): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined, // "undefined" is used to remove the value from the object if it's empty
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    email: data.email || undefined,
    phone: data.phone || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    state: data.state || undefined,
    workExperiences: data.workExperiences.map((workExperience) => ({
      position: workExperience.position || undefined,
      company: workExperience.company || undefined,
      location: workExperience.location || undefined,
      startDate:
        workExperience.startDate?.toISOString().split("T")[0] || undefined, // Convert date to string and remove time from it
      endDate: workExperience.endDate?.toISOString().split("T")[0] || undefined, // Convert date to string and remove time from it
      description: workExperience.description || undefined,
    })),
    educations: data.educations.map((education) => ({
      school: education.school || undefined,
      degree: education.degree || undefined,
      startDate: education.startDate?.toISOString().split("T")[0] || undefined, // Convert date to string and remove time from it
      endDate: education.endDate?.toISOString().split("T")[0] || undefined, // Convert date to string and remove time from it
      description: education.description || undefined,
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined, 
  };
}
