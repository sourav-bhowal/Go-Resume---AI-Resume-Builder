"use server";
import { resumeSchema, ResumeValues } from "@/helpers/validation";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

// Save Resume function to save the resume data to the server
export async function saveResume(values: ResumeValues) {
  // Extract the resume id from the values
  const { id } = values;

  console.log("Saving resume", values);

  // Validate the resume data before saving it
  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);

  // Get the logged in user
  const { userId } = await auth();

  // If no user id is found, throw an error
  if (!userId) {
    throw new Error("Unauthorized. Please log in to save your resume.");
  }

  // Check if the resume already exists in the database
  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  // If no resume is found throw an error
  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  // New photo url to store the photo
  let newPhotoUrl: string | null | undefined = undefined;

  // If a photo is provided, upload it to the "Vercel Blob Storage"
  if (photo instanceof File) {
    // If the resume already has a photo, delete it from the Blob storage before uploading the new one
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    // Upload the new photo to the Blob storage
    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });

    // Get the new photo url from the Blob storage
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    // If the photo is null, delete the existing photo from the Blob storage
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    // Set the new photo url to null
    newPhotoUrl = null;
  }

  // If the resume already exists, update it
  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {}, // Delete all existing work experiences
          create: workExperiences?.map((workExperience) => ({
            // Create new work experiences from the provided data
            ...workExperience,
            startDate: workExperience.startDate
              ? new Date(workExperience.startDate) // Convert the date string to a Date object
              : undefined,
            endDate: workExperience.endDate
              ? new Date(workExperience.endDate)
              : undefined,
          })),
        },
        educations: {
          deleteMany: {}, // Delete all existing educations
          create: educations?.map((education) => ({
            // Create new educations from the provided data
            ...education,
            startDate: education.startDate
              ? new Date(education.startDate)
              : undefined,
            endDate: education.endDate
              ? new Date(education.endDate)
              : undefined,
          })),
        },
        updatedAt: new Date(), // Update the updated at date
      },
    });
  }
  // If the resume does not exist, create a new one
  else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((workExperience) => ({
            ...workExperience,
            startDate: workExperience.startDate
              ? new Date(workExperience.startDate)
              : undefined,
            endDate: workExperience.endDate
              ? new Date(workExperience.endDate)
              : undefined,
          })),
        },
        educations: {
          create: educations?.map((education) => ({
            ...education,
            startDate: education.startDate
              ? new Date(education.startDate)
              : undefined,
            endDate: education.endDate
              ? new Date(education.endDate)
              : undefined,
          })),
        },
      },
    });
  }
}
