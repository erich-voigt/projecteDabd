import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "sonner";
import WorkoutsGraph from "../components/WorkoutsGraph";
import useStore from "../store/useStore";
import {toTitleCase} from "../utils/utils";

export default function Workouts() {
	const navigate = useNavigate();
	const {email} = useStore();

	const [workouts, setWorkouts] = useState<ReceivedWorkout[]>([]);
	const [graphData, setGraphData] = useState<{months: string[]; values: number[]}>({months: [], values: []});

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/entrenamiento`, {
				headers: {
					"Content-Type": "application/json",
					"user": email!
				}
			});
			let data = await res.json();
			data.sort((a: ReceivedWorkout, b: ReceivedWorkout) => {
				if (a.entrenamiento.fecha_fin && !b.entrenamiento.fecha_fin) return 1;
				if (b.entrenamiento.fecha_fin && !a.entrenamiento.fecha_fin) return -1;
				return new Date(b.entrenamiento.fecha_inicio!).getTime() - new Date(a.entrenamiento.fecha_inicio!).getTime();
			});
			setWorkouts(data);
			console.log(data);

			res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/entrenamiento/graph`, {
				headers: {
					"Content-Type": "application/json",
					"user": email!
				}
			});
			data = await res.json();
			setGraphData(data);
			console.log(data);
		};

		fetchData();
	}, []);

	const handleCreateWorkout = async () => {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/entrenamiento`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"user": email!
			},
			body: JSON.stringify({email})
		});
		const data = await res.json();
		if (!res.ok) return toast.error(toTitleCase(data.message));

		console.log(data);
		navigate(`/workout/${data.id}`);
	};

	const handleDeleteWorkout = async (id: string) => {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/entrenamiento/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"user": email!
			}
		});
		const data = await res.json();
		if (!res.ok) return toast.error(toTitleCase(data.message));

		console.log(data);
		setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.entrenamiento.id !== id));
	};

	return (
		<section className="max-w-[1800px] w-full mx-auto px-8 md:px-16 py-4">
			<div className="relative flex flex-col md:flex-row gap-2 mb-2">
				<div className="flex flex-col justify-between min-w-[300px] md:max-w-[500px] w-full gap-2">
					<div className="flex-1 bg-zinc-800 p-8 rounded-xl">
						<p className="text-lime-400 mb-2">Workouts</p>
						<h1 className="uppercase text-4xl font-semibold">List of all your workouts</h1>
					</div>
					<button onClick={handleCreateWorkout} className="uppercase text-xl font-semibold p-4 rounded-xl bg-lime-400 bg-opacity-15 text-lime-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
						<span className="flex justify-between items-center px-4">
							New Workout
							<svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M12 5l0 14" />
								<path d="M5 12l14 0" />
							</svg>
						</span>
					</button>
				</div>
				<div className="w-full bg-zinc-800 rounded-xl">
					<h1 className="mt-8 ml-8 uppercase text-3xl font-semibold">Workouts by month</h1>
					<WorkoutsGraph data={graphData} />
				</div>
			</div>
			<div className="grid place-content-center grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-2">
				{workouts.map(workout => {
					const {id, fecha_inicio, fecha_fin} = workout.entrenamiento;
					const ended = !!fecha_fin;
					return (
						<div key={id} className="bg-zinc-800 p-6 rounded-xl">
							<p className="text-lime-400 mb-1">{ended ? "Completed" : "In progress"}</p>
							{ended ? (
								<h2 className="uppercase text-4xl font-semibold mb-4">
									{new Intl.DateTimeFormat().format(new Date(fecha_inicio!))} - {new Intl.DateTimeFormat().format(new Date(fecha_fin!))}
								</h2>
							) : (
								<h2 className="uppercase text-4xl font-semibold mb-4">{new Intl.DateTimeFormat().format(new Date(fecha_inicio!))}</h2>
							)}
							<div className="flex gap-2">
								{ended ? (
									<></>
								) : (
									<Link to={`/workout/${id}`} className="uppercase w-full flex justify-between items-center gap-2 px-4 text-lg font-medium p-3 rounded-xl bg-lime-400 bg-opacity-15 text-lime-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
										Continue
										<svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M5 12l14 0" />
											<path d="M13 18l6 -6" />
											<path d="M13 6l6 6" />
										</svg>
									</Link>
								)}
								<button onClick={() => handleDeleteWorkout(id)} className={`uppercase ${ended ? "w-full" : ""} flex justify-between items-center gap-2 px-4 text-lg font-medium p-3 rounded-xl bg-red-400 bg-opacity-15 text-red-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all`}>
									Delete
									<svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M4 7l16 0" />
										<path d="M10 11l0 6" />
										<path d="M14 11l0 6" />
										<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
										<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
									</svg>
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
