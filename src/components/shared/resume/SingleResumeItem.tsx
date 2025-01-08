"use client";
import { ResumeDataSelectServer } from "@/helpers/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import ResumePreview from "../editor/ResumePreview";
import mapToResumeValues from "@/helpers/mapToResumeValues";
import SingleResumeItemMoreMenu from "./SingleResumeItemMoreMenu";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// Interface SingleResumeItemProps
interface SingleResumeItemProps {
  resume: ResumeDataSelectServer; // Resume Data Select Server
}

// Single Resume Item Component
export default function SingleResumeItem({ resume }: SingleResumeItemProps) {
  // Resume Ref
  const resumeRef = useRef<HTMLDivElement>(null);

  // Handle Resume Print
  const handleResumePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: resume.title || "Resume",
  });

  // Check if the resume was updated
  const wasUpdated = resume.updatedAt !== resume.createdAt;

  // Return the Single Resume Item
  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`/resume-editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "Untitled Resume"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {resume.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM dd, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/resume-editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          {/* Resume Preview */}
          <ResumePreview // Resume Preivew wrapped in "maptoResumevalues" because the ResumePreview component expects the data in a different format but the data is stored in a different format in the database so we need to convert it to the format that the ResumePreview component expects
            resumeData={mapToResumeValues(resume)}
            resumeRef={resumeRef} // Assign the resumeRef to the div element to allow printing
            className="overflow-hidden rounded-lg shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <SingleResumeItemMoreMenu
        resumeId={resume.id}
        onPrintClick={handleResumePrint} // Handle Resume Print
      />
    </div>
  );
}
