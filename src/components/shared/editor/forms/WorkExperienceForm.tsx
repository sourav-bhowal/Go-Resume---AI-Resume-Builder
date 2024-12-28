import { ResumeEditorFormProps } from "@/helpers/types";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  workExperienceSchema,
  WorkExperienceValues,
} from "@/helpers/validation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GripHorizontal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Work Experience Form Component
export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) {
  // Form for work experineces which takes the resumeData as default values
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  // Handle form submission event using the "useEffect" hook for automatic form submission
  useEffect(() => {
    // Watch the form values for changes
    const { unsubscribe } = form.watch(async (values) => {
      // Trigger the form validation
      const isValidInput = await form.trigger();
      // Check if the form is valid
      if (!isValidInput) return;
      // Update the resume data with the new values
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter(
            (experience) => experience !== undefined,
          ) || [],
      });
    });

    // Cleanup the subscription
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  // Get the field array for work experiences from the form to add new work experiences dynamically
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  // Return the form component
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Work Experiences</h2>
        <p className="text-sm text-muted-foreground">
          Add your work experiences here to complete your profile
        </p>
      </div>
      <Form {...form}>
        <form className="mt-3 space-y-3">
          {fields.map((field, index) => (
            <WorkExperienceItem
              key={field.id}
              form={form}
              index={index}
              remove={remove}
            /> // Render the WorkExperienceItem component with the form, index, and remove function
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add Work Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// Interface for the WorkExperienceItem component
interface WorkExperienceItemProps {
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

// WorkExperienceItem component
function WorkExperienceItem({ form, index, remove }: WorkExperienceItemProps) {
  return (
    <div className="space-y-3 rounded-md border-2 bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work Experience {index + 1}</span>
        <GripHorizontal className="size-5 cursor-grab text-muted-foreground" />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Position</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Software Engineer" autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Google" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.location`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Mountain View, CA" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)} // Slice the date value to remove the time
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)} // Slice the date value to remove the time
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormDescription>
        Ignore the end date if you are currently working here
      </FormDescription>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your role and responsibilities"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Remove the work exp button */}
      <Button
        type="button"
        variant="destructive"
        onClick={() => remove(index)}
        className="text-sm"
      >
        Remove
      </Button>
    </div>
  );
}
