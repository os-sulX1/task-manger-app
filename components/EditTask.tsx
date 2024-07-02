"use client";
import React, { useState, useEffect } from "react";
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
import { editTask, getTaskById } from "@/src/server/actions";
import type { Item } from "@/src/db/schema";

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(5).max(200),
  description: z.string().min(5).max(150),
  status: z.string(),
});



const EditTaskDialog =  ({ taskId }: {taskId :string}) => {
  const { toast } = useToast();
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      title:'' ,
      description: '',
      status: '',
    },
  });

  useEffect(() => {
    if (isFileDialogOpen && taskId) {
      setIsLoading(true);
      getTaskById({taskId:taskId}).then((task) => {
        console.log("Fetched task:", task);
        setIsLoading(false);
      }).catch((error) => {
        console.error("Error fetching task:", error);
        setIsLoading(false);
      });
    }
    
  }, [isFileDialogOpen, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editTask(values,taskId); // Call the server action
      form.reset();
      setIsFileDialogOpen(false);
      toast({
        variant: "default",
        title: "Task updated successfully",
        description: "Your task has been updated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error updating task",
        description: "There was an error updating your task. Please try again.",
      });
    }
  }

  return (
    <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} onClick={() => setIsFileDialogOpen(true)}>
          Edit Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Edit your task</DialogTitle>
          <DialogDescription>
            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    placeholder="Edit your title"
                    {...form.register("title")}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <Input
                    id="description"
                    placeholder="Edit your description"
                    {...form.register("description")}
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
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
