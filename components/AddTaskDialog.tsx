"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { addTask } from "@/src/server/actions";


const formSchema = z.object({
  id: z.string(),
  title: z.string().min(5).max(200),
  description: z.string().min(5).max(150),
  status: z.string(),
});

const AddTaskDialog = () => {
  const { toast } = useToast();
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      title: '',
      description: '',
      status: '',
    },
  });
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addTask(values); // Call the server action
      form.reset();
      setIsFileDialogOpen(false);
      toast({
        variant: "default",
        title: "Task added successfully",
        description: "Your task has been added.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error adding task",
        description: "There was an error adding your task. Please try again.",
      });
    }
		form.reset();
    setIsFileDialogOpen(false);
  }

  return (
    <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsFileDialogOpen(false)}>
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Add your task</DialogTitle>
          <DialogDescription>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  placeholder="Add your title"
                  {...form.register("title")}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <Input
                  id="description"
                  placeholder="Add your description"
                  {...form.register("description") }
                />
              </div>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-2"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
