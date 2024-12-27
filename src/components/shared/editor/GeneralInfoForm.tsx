import { generateInfoSchema, GenerateInfoValues } from "@/helpers/validation";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { ResumeEditorFormProps } from "@/helpers/types";

// GeneralInfoForm component
export default function GeneralInfoForm({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) {
  // Form for General Info
  const form = useForm<GenerateInfoValues>({
    resolver: zodResolver(generateInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
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
      setResumeData({ ...resumeData, ...values });
    });

    // Cleanup the subscription
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  // Render the form
  return (
    <div className="mx-auto max-w-xl space-x-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold">General Information</h2>
        <p className="text-sm text-muted-foreground">
          Provide general information about yourself
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter the name of the resume"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter a short description of the resume"
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription>
                  Describe the resume in a few words to help you identify it
                  later
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
