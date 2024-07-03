import HeaderCard from "@/components/HeaderCard";
import SelectTask from "./SelectTask";
import GridCard from "./GridCard";


const TaskBox =  ({
	title,
	status,
	setStatus,
	refresh,
	setRefresh,
}: {
	title: string;
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	refresh: string;
	setRefresh: React.Dispatch<React.SetStateAction<string>>;
}) => {


	return (
		<section className="relative  bg-slate-600 w-full p-4 sm:min-h-screen pb-20">
			<div className="flex items-center justify-between mb-4">
				
				<HeaderCard title={title} />
			</div>
			
			<div className="mx-auto flex flex-col gap-3">

				{title === "All Task"  && (
					<div className="flex justify-end mr-9">
						<SelectTask status={status} setStatus={setStatus} />
					</div>
				)}

				<div className="flex flex-wrap justify-between items-center w-full">
					<GridCard refresh={refresh} status={status} title={title}  />
				</div>
			</div>
		</section>
	);
};

export default TaskBox;
