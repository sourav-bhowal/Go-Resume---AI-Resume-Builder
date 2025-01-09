import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  generateWorkExperienceDescriptionSchema,
  GenerateWorkExperienceDescriptionValues,
  WorkExperienceValue,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateWorkExperienceDescription } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LoadingBtn from "../../LoadingBtn";

// Define the props for the GenerateWorkExpBtn component
interface GenerateWorkExperienceBtnProps {
  onWorkExperienceGenerated: (workExperience: WorkExperienceValue) => void;
}

// Define the GenerateWorkExpBtn component
export default function GenerateWorkExperienceBtn({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceBtnProps) {
  // Define the state for the input dialog
  const [showInputDialog, setShowInputDialog] = useState(false);

  // Return the button component
  return (
    <>
      <Button
        variant={"outline"}
        type="button"
        // TODO
        onClick={() => setShowInputDialog(true)}
      >
        <WandSparklesIcon size={24} />
        Smart Fill (AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience); // Call the onWorkExperienceGenerated function with the generated work experience value
          setShowInputDialog(false); // Close the input dialog after the work experience value is generated
        }}
      />
    </>
  );
}

// Interface for the input dialog
interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void; //  Function to change the state of the dialog
  onWorkExperienceGenerated: (workExperience: WorkExperienceValue) => void; // Function to generate the work experience value from the input
}

// Function to render the input dialog component
function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  // Toast hook
  const { toast } = useToast();

  // Form hook to handle the input
  const form = useForm<GenerateWorkExperienceDescriptionValues>({
    resolver: zodResolver(generateWorkExperienceDescriptionSchema),
    defaultValues: {
      description: "",
    },
  });

  // Function to handle the submit of the form
  async function onSubmit(input: GenerateWorkExperienceDescriptionValues) {
    try {
      // Call the generateWorkExperienceDescription server action to generate the work experience value
      const response = await generateWorkExperienceDescription(input);

      // Send the generated work experience value to the parent component
      onWorkExperienceGenerated(response);
    } catch (error) {
      // Log the error and show a toast message
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  // Return the dialog component
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate work experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimized
            entry for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g. "from nov 2019 to dec 2020 I worked at google as a software engineer, my tasks were: ..."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingBtn type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingBtn>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
