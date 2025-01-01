import { ResumeValues } from "@/helpers/validation";
import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      // If the photo is null, set the photo source to an empty string
      if (photo === null) {
        setPhotoSrc("");
      }
      // Clean up fn to Revoke the object URL when the component is unmounted or the photo changes to prevent memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    }
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
        />
      )}
      <div className="space-y-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">
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
