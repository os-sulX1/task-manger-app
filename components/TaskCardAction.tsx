'use client'
import React, { useState } from "react";
import { Button } from "./ui/button";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, EllipsisVertical, TrashIcon, X } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { deleteTask, updateStatus } from "@/src/server/actions";

const TaskCardAction = ({
	isFavorite,
	headerTitle,
	taskId,
	status,
	setIsFavored,
}) => {
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const { toast } = useToast();

	return (
		<>
			<AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							task and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								await deleteTask(taskId);
								toast({
									variant: "default",
									title: "Task successfully deleted from the system",
								});
							}}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<EllipsisVertical />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					{headerTitle === "All Task" && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="flex gap-2 text-black items-center cursor-pointer">
								{status ==='Complete' ? (
									<Button
										variant={"outline"}
										onClick={async () => {
											await updateStatus(taskId, status);
											setIsFavored(false); // Example, update as needed
										}}
									>
										<X className="w-4 h-4" />
										<p>Incomplete</p>
									</Button>
								) : (
									<>
										<Button
											variant={"outline"}
											onClick={async () => {
												await updateStatus(taskId, status);
												setIsFavored(true); // Example, update as needed
											}}
										>
											<Check className="w-4 h-4" />
											<p>Complete</p>
										</Button>
									</>
								)}
							</DropdownMenuItem>
						</>
					)}

					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="flex gap-2 text-red-700 items-center cursor-pointer"
						onClick={() => {
							setIsConfirmOpen(true);
						}}
					>
						<TrashIcon className="w-4 h-4" />
						<p className="text-red-700">Delete</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default TaskCardAction;
