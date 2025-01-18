import { ResumeEditorFormProps } from "@/helpers/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
// import CertificateForm from "./forms/CertificateForm";
import ProjectForm from "./forms/ProjectForm";

// This file is used to store the steps of the editor. Each step is an object with a title, a component and a key. The key is used to identify the step in the editor. The component is the actual content of the step. The title is the title of the step that is displayed in the editor.
export const steps: {
  title: string;
  component: React.ComponentType<ResumeEditorFormProps>;
  key: string;
}[] = [
  {
    title: "General Information",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personal Information",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Projects",
    component: ProjectForm,
    key: "projects",
  },
  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Skills",
    component: SkillsForm,
    key: "skills",
  },
  // {
  //   title: "Certificates",
  //   component: CertificateForm,
  //   key: "certificates",
  // },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  }
];
