import NewResumeEditor from "@/components/shared/editor/NewResumeEditor";
import { resumeDataInclude } from "@/helpers/types";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

// New Resume Page Props Type
interface NewResumePageProps {
  searchParams: Promise<{ resumeId: string }>; // Search Params
}

// Metadata
export const metadata: Metadata = {
  title: "New Resume",
  description: "New Resume Page",
};

// New Resume Page
export default async function NewResumePage({
  searchParams,
}: NewResumePageProps) {
  // Get Resume ID from Search Params
  const { resumeId } = await searchParams;

  // Get User ID from Clerk
  const { userId } = await auth();

  // If No User ID, Redirect to Login
  if (!userId) {
    return { redirect: "/sign-in" };
  }

  // Get Resume to Edit
  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  // Return New Resume Editor
  return <NewResumeEditor resumeToEdit={resumeToEdit} />;
}
