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
import { educationSchema, EducationValues } from "@/helpers/validation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GripHorizontal, Plus, Trash } from "lucide-react";

//
export default function EducationForm({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) {
  // Form for work experineces which takes the resumeData as default values
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
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
        educations:
          values.educations?.filter((education) => education !== undefined) ||
          [],
      });
    });

    // Cleanup the subscription
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  // Get the field array for work experiences from the form to add new work experiences dynamically
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  // Render the form
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add your educations here to complete your profile
        </p>
      </div>
      <Form {...form}>
        <form className="mt-3 space-y-3">
          {fields.map((field, index) => (
            <EducationItem
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
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              <Plus className="size-4" />
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// Interface for the WorkExperienceItem component
interface EducationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

// WorkExperienceItem component
function EducationItem({ form, index, remove }: EducationItemProps) {
  return (
    <div className="space-y-3 rounded-md border-2 bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education {index + 1}</span>
        <GripHorizontal className="size-5 cursor-grab text-muted-foreground" />
      </div>
      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Btech CSE" autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institution</FormLabel>
            <FormControl>
              <Input {...field} placeholder="MIT" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
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
          name={`educations.${index}.endDate`}
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
      {/* Remove the work exp button */}
      <Button
        type="button"
        variant="destructive"
        onClick={() => remove(index)}
        className="text-sm"
      >
        <Trash className="mr-1 size-4" />
        Remove
      </Button>
    </div>
  );
}
