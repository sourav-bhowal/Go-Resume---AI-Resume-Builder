import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ResumeEditorFormProps } from "@/helpers/types";
import { summarySchema, SummaryValues } from "@/helpers/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// Summary form is a placeholder for the summary step in the editor
export default function SummaryForm({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) {
  // Form for the summary step
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
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
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Summary</h2>
        <p className="text-sm text-muted-foreground">
          Add a summary to complete your profile or use AI to generate one
        </p>
      </div>
      <Form {...form}>
        <form className="mt-3 space-y-3">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write a summary about yourself"
                    rows={7}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
