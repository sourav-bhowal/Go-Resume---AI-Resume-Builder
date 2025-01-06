"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

// Delete resume server action
export default async function deleteResume(resumeId: string) {
  // Get the logged in user id
  const { userId } = await auth();

  // If no user id is found, throw an error
  if (!userId) {
    throw new Error("Unauthorized. Please log in to save your resume.");
  }

  // Find the resume by id
  const resume = await prisma.resume.findUnique({
    where: {
      id: resumeId,
      userId,
    },
  });

  // If no resume is found, throw an error
  if (!resume) {
    throw new Error("Resume not found.");
  }

  // Delete the resume from the database
  const deletedResume = await prisma.resume.delete({
    where: {
      id: resumeId,
    },
  });

  // Delete the resume photos from the Blob if it has photos
  if (deletedResume && deletedResume.photoUrl) {
    await del(deletedResume.photoUrl);
  }

  // Revalidate the cache
  revalidatePath("/my-resumes");
}
