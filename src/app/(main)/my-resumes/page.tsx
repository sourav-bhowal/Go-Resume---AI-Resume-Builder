import SingleResumeItem from "@/components/shared/resume/SingleResumeItem";
import { resumeDataInclude } from "@/helpers/types";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CreateResumeBtn from "./CreateResumeBtn";

// Metadata
export const metadata: Metadata = {
  title: "My Resumes",
  description: "My Resumes Page",
};

// My Resumes Page
export default async function MyResumesPage() {
  // Get the logged in user id
  const { userId } = await auth();

  // If no user id is found, throw an error
  if (!userId) {
    throw new Error("Unauthorized. Please log in to save your resume.");
  }

  // Fetch the resumes and count the resumes from the database in parallel using Promise.all
  const [myResumes, countMyResumes] = await Promise.all([
    // Fetch the resumes from the database
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    // Count the resumes from the database
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  // TODO

  // Render the My Resumes Page
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      {/* Create Resume Button Component */}
      <CreateResumeBtn canCreateNewResume={countMyResumes < 3} />
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">My Resumes</h1>
        <p className="text-muted-foreground">
          You have {countMyResumes} resumes saved.
        </p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {myResumes.map((resume) => (
          <SingleResumeItem key={resume.id} resume={resume} /> // Single Resume Item Component
        ))}
      </div>
    </main>
  );
}
