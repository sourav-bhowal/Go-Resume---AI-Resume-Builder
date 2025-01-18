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
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GripHorizontal, Plus, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { projectSchema, ProjectValues } from "@/lib/validation";

export default function ProjectForm({
  resumeData,
  setResumeData,
}: ResumeEditorFormProps) {
  // Form for projects which takes the resumeData as default values
  const form = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects: resumeData.projects || [],
    },
  });

  // Handle form submission event using the "useEffect" hook for automatic form submission
  useEffect(() => {
        // Watch the form values for changes and update the resume data
    const { unsubscribe } = form.watch(async (values) => {
      // Trigger the form validation
      const isValidInput = await form.trigger();
      // Check if the form is valid
      if (!isValidInput) return;
      // Update the resume data with the new values
      setResumeData({
        ...resumeData,
        projects:
          values.projects?.filter(
            (project) => project !== undefined,
          ) || [],
      });
    });

    // Cleanup the subscription when the component is unmounted
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  // Get the field array for projects from the form to add new projects dynamically
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  // Get the sensors for drag and drop functionality from the DnD Kit
  const sensors = useSensors(
    useSensor(PointerSensor), // Pointer sensor for mouse events (drag and drop)
    useSensor(KeyboardSensor, {
      // Keyboard sensor for keyboard events (drag and drop)
      coordinateGetter: sortableKeyboardCoordinates, // Get the coordinates for keyboard events
    }),
  );

  // Handle the drag and drop functionality for work experiences
  function handleDragAndDrop(event: DragEndEvent) {
    // Get the old and new index from the event
    const { active, over } = event;
    // Check if over is not null and active id is not equal to over id
    if (over && active.id !== over?.id) {
      // Get the old and new index from the active and over elements respectively in the fields array
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      // Call the move function from the "usefieldarray hook" to move the work experience from old index to new index
      move(oldIndex, newIndex);
      // Return the new fields array with the moved work experience
      return arrayMove(fields, oldIndex, newIndex);
    }
  }
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Add your projects here to complete your profile
        </p>
      </div>
      <Form {...form}>
        <form className="mt-3 space-y-3">
          {/* DnD Context for drag and drop functionality */}
          <DndContext
            sensors={sensors} // Add the sensors for drag and drop
            onDragEnd={handleDragAndDrop} // Handle the drag and drop event
            collisionDetection={closestCenter} // Detect the closest center for collision
            modifiers={[restrictToVerticalAxis]} // Restrict the drag and drop to vertical axis only
          >
            {/* Sortable context for the work experiences */}
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <ProjectItem
                  id={field.id}
                  key={field.id}
                  form={form}
                  index={index}
                  remove={remove}
                /> // Render the ProjectItem component with the form, index, and remove function
              ))}
            </SortableContext>
          </DndContext>
          {/* Add new project button */}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  startDate: "",
                  endDate: "",
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

// Interface for the ProjectItem component
interface ProjectItemProps {
  id: string;
  form: UseFormReturn<ProjectValues>;
  index: number;
  remove: (index: number) => void;
}

// ProjectItem component
function ProjectItem({ id, form, index, remove }: ProjectItemProps) {
 // Destructure the values from the useSortable hook
 const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // Return the work experience form fields
  return (
    <div
      className={cn(
        "space-y-3 rounded-md border-2 bg-background p-3",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
      ref={setNodeRef} // Set the node reference for the work experience item
      style={{
        transform: CSS.Transform.toString(transform), // Transform the work experience item
        transition, // Transition the work experience item
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Project {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground outline-none"
          {...attributes} // Add the attributes for the sortable context
          {...listeners} // Add the listeners for the sortable context
        />
      </div>
      <FormField
        control={form.control}
        name={`projects.${index}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Software Engineer" autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`projects.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Description</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Describe your project" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`projects.${index}.startDate`}
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
          name={`projects.${index}.endDate`}
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
        Ignore the end date if you are currently working on this project
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
