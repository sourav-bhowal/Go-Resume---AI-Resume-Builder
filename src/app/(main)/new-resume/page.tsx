import NewResumeEditor from "@/components/shared/editor/NewResumeEditor";
import { Metadata } from "next";

// Metadata
export const metadata: Metadata = {
  title: "New Resume",
  description: "New Resume Page",
};

// New Resume Page
export default function NewResumePage() {
  return <NewResumeEditor />;
}
