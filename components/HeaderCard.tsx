import React, { type Dispatch, type SetStateAction, useState } from "react";
import AddTaskDialog from "./AddTaskDialog";


const HeaderCard =  ({ title  }: { title: string }) => {

	return (
		<div className="flex justify-between items-center mb-8 w-full p-8 border-b-4 mx-10">
			<div className="">
				<h1 className="text-4xl font-bold">{title}</h1>
			</div>
			<div className="">
			</div>
      {title === 'All Task' &&  <div className=""><AddTaskDialog /> </div> }

		</div>
	);
};

export default HeaderCard;
