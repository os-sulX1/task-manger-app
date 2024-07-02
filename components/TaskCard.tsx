'use client'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { type ReactNode, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
	EllipsisVertical,
	GanttChartIcon,
	ImageIcon,
	StarHalf,
	StarIcon,
	TextIcon,
	TrashIcon,
	Undo2Icon,
} from "lucide-react";
import { useToast } from "./ui/use-toast";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import TaskCardAction from "./TaskCardAction";
import EditTask from "./EditTask";



const TaskCard =  ({description, title ,headerTitle ,taskId ,status ,updateAt}:{title:string , description:string,headerTitle:string ,taskId:string ,status:string} ) => {
  const { toast } = useToast()
  const [isFavorite, setIsFavored] = useState(false)
	return (
    <Card className="bg-white shadow-md rounded-lg">
  <CardHeader className="relative p-4">
    <CardTitle className="flex gap-2 text-base font-normal">
      <p>{title}</p>
    </CardTitle>
    <div className="absolute top-1 right-1">
      <TaskCardAction isFavorite={isFavorite} setIsFavored={setIsFavored} headerTitle={headerTitle}  taskId={taskId} status={status} /> 
    </div>
  </CardHeader>
  <CardContent className="flex justify-start items-center p-4 overflow-hidden h-16">
    <p className="truncate">{description}</p>
  </CardContent>
  <CardFooter className="flex justify-center items-center ">
    <div className="flex flex-col gap-y-4 w-full px-4 py-2 ">
      <div className="flex w-full justify-between items-center">
        <div>
          <EditTask taskId={taskId}/>
        </div>
        <div className="">
        <p className="text-xs font-semibold">
            
            {formatRelative(new Date(updateAt), new Date())}
            
         </p>
        </div>
      </div>
    </div>
  </CardFooter>
    
</Card>
	);
};

export default TaskCard;
