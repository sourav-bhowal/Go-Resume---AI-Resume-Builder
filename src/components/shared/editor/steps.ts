import { ResumeEditorFormProps } from "@/helpers/types";
import GeneralInfoForm from "./GeneralInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";

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
];
