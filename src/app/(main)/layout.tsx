import Navbar from "@/components/shared/Navbar";
import React from "react";

// This is the main layout for the application. It includes the Navbar component and the children components.
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
