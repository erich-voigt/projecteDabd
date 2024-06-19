import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "sonner";
// import Exercise from "../components/Exercise";
import useStore from "../store/useStore";
import {toTitleCase} from "../utils/utils";

export default function EditWorkout() {
	const {email} = useStore();
	const navigate = useNavigate();
	const {id} = useParams();

	const [workout, setWorkout] = useState<ReceivedWorkout>();
	const [exercises, setExercises] = useState<ReceivedExercise[]>([]);
	const [templates, setTemplates] = useState<ReceivedTemplate[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/entrenamiento/${id}`, {
				headers: {
					"Content-Type": "application/json",
					"user": email!
				}
			});
			let data = await res.json();
			setWorkout(data);
			console.log(data);

			res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/plantilla`, {
				headers: {
					"Content-Type": "application/json",
					"user": email!
				}
			});
			data = await res.json();
			setTemplates(data);
			console.log(data);
		};

		fetchData();
	}, []);

	const handleAddTemplate = (template: ReceivedTemplate) => {
		let exercise: ReceivedExercise = {
			name: template.plantilla_ejercicio.nombre,
			type: template.plantilla_ejercicio.tipo,
			sets: [],
			template: template
		};
		if (template.plantilla_ejercicio.tipo === "repeticiones") {
			exercise.sets.push({
				type: template.plantilla_ejercicio.tipo,
				finished: false,
				repetitions: 0,
				weight: 0
			});
		} else if (template.plantilla_ejercicio.tipo === "cronometrado") {
			exercise.sets.push({
				type: template.plantilla_ejercicio.tipo,
				finished: false,
				time: 0,
				weight: 0
			});
		} else if (template.plantilla_ejercicio.tipo === "cardio") {
			exercise.sets.push({
				type: template.plantilla_ejercicio.tipo,
				finished: false,
				time: 0,
				distance: 0
			});
		}
		setExercises(prevExercises => [...prevExercises, exercise]);
		setTemplates(prevTemplates => prevTemplates.filter(t => t.plantilla_ejercicio.id !== template.plantilla_ejercicio.id));
	};

	const handleRemoveExercise = (exercise: ReceivedExercise) => {
		setTemplates(prevTemplates => [...prevTemplates, exercise.template]);
		setExercises(prevExercises => prevExercises.filter(e => e.template.plantilla_ejercicio.id !== exercise.template.plantilla_ejercicio.id));
	};

	const handleFinishWorkout = async () => {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/entrenamiento/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"user": email!
			}
		});
		const data = await res.json();
		if (!res.ok) return toast.error(toTitleCase(data.message));

		console.log(data);
		navigate("/");
	};

	return (
		<section className="max-w-[1800px] w-full mx-auto px-8 md:px-16 py-4">
			<div className="flex flex-col gap-2">
				<div className="relative flex flex-col md:flex-row gap-2">
					<div className="md:sticky md:top-28 flex flex-col justify-between min-w-[300px] md:max-w-[500px] w-full h-full gap-2">
						<div className="flex-1 bg-zinc-800 p-8 rounded-xl">
							{!workout ? null : <p className="text-lime-400 mb-1">{new Intl.DateTimeFormat().format(new Date(workout?.entrenamiento.fecha_inicio!))}</p>}
							<h1 className="uppercase text-4xl font-semibold">Current Workout</h1>
						</div>
						<button onClick={handleFinishWorkout} className="uppercase text-xl font-semibold p-4 rounded-xl bg-lime-400 bg-opacity-15 text-lime-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
							<span className="flex justify-between items-center px-4">
								Finish Workout
								<svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M9 11l3 3l8 -8" />
									<path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
								</svg>
							</span>
						</button>
					</div>
					<div className="w-full">
						<h1 className="uppercase text-3xl font-semibold my-4 md:mt-0 md:text-right">Add Templates</h1>
						<div className="flex flex-col gap-2 overflow-y-auto max-h-[400px] md:max-h-[500px]">
							{templates.map(template => {
								const {id, nombre} = template.plantilla_ejercicio;
								return (
									<div key={id} className="flex justify-between items-center rounded-xl p-4 bg-zinc-200">
										<h2 className="text-zinc-900 text-lg font-medium">{nombre}</h2>
										<button onClick={() => handleAddTemplate(template)} className="flex items-center gap-2 uppercase font-semibold px-4 py-2 rounded-lg bg-lime-400 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-200 transition-all">
											<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M12 5l0 14" />
												<path d="M5 12l14 0" />
											</svg>
											Add
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<h1 className="uppercase text-3xl font-semibold my-4">Your Exercises</h1>
				<div className="grid place-content-center grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4">
					{/* {exercises.map((exercise, index) => (
						<Exercise key={index} exercise={exercise} handleRemoveExercise={handleRemoveExercise} />
					))} */}
				</div>
			</div>
		</section>
	);
}
