import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ResumeEditorFormProps } from "@/helpers/types";
import { skillsSchema, SkillsValues } from "@/helpers/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SkillsForm({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) {
  // Form to add skills to the resume
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
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
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined) // Filter out undefined values
            .map((skill) => skill.trim()) // Trim the skill values
            .filter((skill) => skill !== "") || [], // Filter out empty strings
      });
    });

    // Cleanup the subscription
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  // Render the form
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-sm text-muted-foreground">
          Add your skills here to complete your profile
        </p>
      </div>
      <Form {...form}>
        <form className="mt-3 space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Type your skills here... (e.g., JavaScript, React, Node.js)"
                    rows={7}
                    autoFocus
                    onChange={(e) => {
                      const skills = e.target.value.split(","); // Split the input by comma
                      field.onChange(skills); // Update the field value
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate your skills by commas (e.g., JavaScript, React,
                  Node.js)
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
