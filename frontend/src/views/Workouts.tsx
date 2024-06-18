import {Link} from "react-router-dom";
import WorkoutsGraph from "../components/WorkoutsGraph";

export default function Workouts() {
	let data = {
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	};

	return (
		<section className="max-w-[1800px] w-full mx-auto px-8 md:px-16 py-4">
			<div className="relative flex flex-col md:flex-row gap-2">
				<div className="flex flex-col justify-between min-w-[300px] md:max-w-[500px] w-full gap-2">
					<div className="flex-1 bg-zinc-800 p-8 rounded-xl">
						<p className="text-lime-400 mb-2">Workouts</p>
						<h1 className="uppercase text-4xl font-semibold">List of all your workouts</h1>
					</div>
					<Link to="/workout/new" className="uppercase text-xl font-semibold p-4 rounded-xl bg-lime-400 bg-opacity-15 text-lime-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
						<span className="flex justify-between items-center px-4">
							New Workout
							<svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M12 5l0 14" />
								<path d="M5 12l14 0" />
							</svg>
						</span>
					</Link>
				</div>
				<div className="w-full bg-zinc-800 rounded-xl">
					<h1 className="mt-8 ml-8 uppercase text-3xl font-semibold">Workouts by month</h1>
					<WorkoutsGraph data={data} />
				</div>
			</div>
		</section>
	);
}
