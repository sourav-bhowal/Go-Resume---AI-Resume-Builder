import { ResumeValues } from "@/lib/validation";
import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { borderStyles } from "./parts/BorderStyleSwitch";

// Interface for Resume Preview
interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

// Resume Preview Component
export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the width of the container element using the useDimensions hook
  const { width } = useDimensions(containerRef);

  // Render the Resume Preview component
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef} // Assign the containerRef to the div element
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width, // Adjust the zoom level based on the width of the container element
        }}
      >
        <MyResumePersonalInfo resumeData={resumeData} />
        <MyResumeSummary resumeData={resumeData} />
        <MyResumeWorkExperience resumeData={resumeData} />
        <MyResumeEducation resumeData={resumeData} />
        <MyResumeSkills resumeData={resumeData} />
      </div>
    </div>
  );
}

// Interface for My Resume component
interface MyResumeProps {
  resumeData: ResumeValues;
}

// My Resume Personal Info Component
function MyResumePersonalInfo({ resumeData }: MyResumeProps) {
  // Destructure the resumeData object to get the required fields
  const {
    photo,
    firstName,
    lastName,
    city,
    state,
    country,
    email,
    phone,
    jobTitle,
    colorHex,
    borderStyle,
  } = resumeData;

  // State to store the photo source
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  // Use the useEffect hook to create a URL for the photo
  useEffect(() => {
    // Check if the photo is a File object or a URL string
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";

    // Set the photo source to the object URL
    if (objectUrl) {
      setPhotoSrc(objectUrl);
    } else if (photo === null) {
      // If the photo is null, set the photo source to an empty string
      setPhotoSrc("");
    }

    // Clean up function to revoke the object URL when the component is unmounted or the photo changes to prevent memory leaks
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [photo]);

  // Render the My Resume Personal Info component
  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          alt={`${firstName} ${lastName}`}
          width={100}
          height={100}
          className="aspect-square object-cover"
          style={{
            borderColor: colorHex, // Set the border color based on the colorHex
            // Set the border radius based on the borderStyle
            borderRadius:
              borderStyle === borderStyles.SQUARE
                ? "0px"
                : borderStyle === borderStyles.ROUNDED
                  ? "9999px"
                  : "20%",
          }}
        />
      )}
      <div className="space-y-2">
        <div className="space-y-1">
          <h2
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </h2>
          <p className="font-medium">{jobTitle}</p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && state && ", "}
          {state}
          {(city || state) && country && ", "}
          {country}
          {email || phone ? " | " : ""}
          {email}
          {email && phone ? " | " : ""}
          {phone}
        </p>
      </div>
    </div>
  );
}

// My Resume Summary Component
function MyResumeSummary({ resumeData }: MyResumeProps) {
  // Destructure the resumeData object to get the summary field
  const { summary, colorHex } = resumeData;

  // Return null if the summary field is empty
  if (!summary) return null;

  // Render the My Resume Summary component
  return (
    <div>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <h3 className="text-lg font-bold">Summary</h3>
        <p className="whitespace-pre-line text-sm">{summary}</p>
      </div>
    </div>
  );
}

// My Resume Work Experience Component
function MyResumeWorkExperience({ resumeData }: MyResumeProps) {
  // Destructure the resumeData object to get the workExperience field
  const { workExperiences, colorHex } = resumeData;

  // Return null if the workExperience field is empty
  if (!workExperiences?.length) return null;

  // Render the My Resume Work Experience component
  return (
    <div>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <h3 className="text-lg font-bold">Work Experience</h3>
        {workExperiences.map((work, index) => (
          <div key={index} className="space-y-1">
            <h4
              className="text-base font-bold"
              style={{
                color: colorHex,
              }}
            >
              {work.position}
            </h4>
            <p className="flex items-center justify-between text-sm font-semibold">
              <span>
                {work.company}
                {work.company && work.location && ", "}
                {work.location}
              </span>
              {work.startDate && (
                <span
                  style={{
                    color: colorHex,
                  }}
                >
                  {formatDate(work.startDate, "MMM yyyy")}
                  {work.endDate
                    ? ` - ${formatDate(work.endDate, "MMM yyyy")}`
                    : "  - Present"}
                </span>
              )}
            </p>
            <p className="whitespace-pre-line text-sm">{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// My Resume Education Component
function MyResumeEducation({ resumeData }: MyResumeProps) {
  // Destructure the resumeData object to get the education field
  const { educations, colorHex } = resumeData;

  // Return null if the education field is empty
  if (!educations?.length) return null;

  // Render the My Resume Education component
  return (
    <div>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <h3 className="text-lg font-bold">Education</h3>
        {educations.map((education, index) => (
          <div key={index} className="space-y-1">
            <h4
              className="text-base font-bold"
              style={{
                color: colorHex,
              }}
            >
              {education.degree}
            </h4>
            <div className="flex items-center justify-between text-sm font-semibold">
              <p>{education.school}</p>
              {education.startDate && (
                <span
                  style={{
                    color: colorHex,
                  }}
                >
                  {formatDate(education.startDate, "MMM yyyy")}
                  {education.endDate
                    ? ` - ${formatDate(education.endDate, "MMM yyyy")}`
                    : "  - Present"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// My Resume Skills Component
function MyResumeSkills({ resumeData }: MyResumeProps) {
  // Destructure the resumeData object to get the skills field
  const { skills, colorHex } = resumeData;

  // Return null if the skills field is empty
  if (!skills?.length) return null;

  // Determine the number of columns needed
  const columns = Math.ceil(skills.length / 5);

  // Split the skills into columns
  const skillsColumns = Array.from({ length: columns }, (_, i) =>
    skills.slice(i * 5, i * 5 + 5),
  );

  // Render the My Resume Skills component
  return (
    <div>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <h3 className="text-lg font-bold">Skills</h3>
        <div className="flex space-x-6">
          {skillsColumns.map((column, columnIndex) => (
            <ul key={columnIndex} className="list-inside list-disc space-y-1">
              {column.map((skill, skillIndex) => (
                <li key={skillIndex} className="text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
