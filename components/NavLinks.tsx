'use client'
import clsx from "clsx";
import {  HomeIcon, MoveRight, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const  NavLinks = ()=> {
	const pathname = usePathname();
	return (
		<nav className=" w-full">
			<Link href={"/dashboard/all-tasks"}>
				<Button
					variant={"link"}
					className={clsx("flex gap-3 justify-start", {
						"text-blue-600": pathname.includes("/dashboard/files"),
					})}
				>
					<HomeIcon /> All Tasks {" "}
				</Button>
			</Link>

			<Link href={"/dashboard/completed"}>
				<Button
					variant={"link"}
					className={clsx("flex gap-3 justify-start", {
						"text-blue-600": pathname.includes("/dashboard/favorite"),
					})}
				>
					<MoveRight /> completed{" "}
				</Button>
			</Link>

			<Link href={"/dashboard/incompetent"}>
			
			</Link>
		</nav>
	);
}

export default NavLinks;
