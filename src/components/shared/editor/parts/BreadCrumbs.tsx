import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { steps } from "../steps";
import React from "react";

// Interface 
interface BreadCrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

// This component is used to display the breadcrumbs in the editor. The breadcrumbs show the current step and allow the user to navigate between steps.
export default function BreadCrumbs({
  currentStep,
  setCurrentStep,
}: BreadCrumbsProps) {
  return (
    <div className="flex justify-center">
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((step) => (
            <React.Fragment key={step.key}>
              <BreadcrumbItem>
                {step.key === currentStep ? (
                  <BreadcrumbPage>{step.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button onClick={() => setCurrentStep(step.key)}>
                      {step.title}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="last:hidden"/>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
