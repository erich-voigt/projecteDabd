import {useEffect, useState} from "react";
import useStore from "../store/useStore";

interface ExerciseProps {
	exercise: ReceivedExercise;
	refetch: boolean;
	setRefetch: (a: boolean) => void;
	handleRemoveExercise: (exercise: ReceivedExercise) => void;
}

export default function Exercise({exercise, refetch, setRefetch, handleRemoveExercise}: ExerciseProps) {
	const {email} = useStore();

	const [sets, setSets] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/serie?id=${exercise.ejercicio_en_curso.id}`, {
				headers: {
					"Content-Type": "application/json",
					"user": email!
				}
			});
			if (!res.ok) return;
			let data = await res.json();
			setSets(data.data);
			console.log(data);
		};

		fetchData();
		setRefetch(false);
	}, []);

	useEffect(() => {
		if (!refetch) return;
		const fetchData = async () => {
			const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/serie?id=${exercise.ejercicio_en_curso.id}`, {
				headers: {
					"Content-Type": "application/json",
					"user": email!
				}
			});
			if (!res.ok) return;
			let data = await res.json();
			setSets(data.data);
			console.log(data);
		};

		fetchData();
		setRefetch(false);
	}, [refetch]);

	const handleAddSet = async (exercise: ReceivedExercise) => {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/serie`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"user": email!
			},
			body: JSON.stringify({ejercicio: exercise.ejercicio_en_curso.id, value1: 0, value2: 0})
		});
		let data = await res.json();

		console.log(data);
		setRefetch(true);
	};

	const handleRemoveSet = async (set: any) => {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/serie/${set["serieID"]}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"user": email!
			}
		});
		let data = await res.json();

		console.log(data);
		setRefetch(true);
	};

	const handleSerieChange = async (e: React.ChangeEvent<HTMLInputElement>, type: string, set: any) => {
		setSets(prev => prev.map(s => (s["serieID"] === set["serieID"] ? {...s, [type]: e.target.value} : s)));
		// const value = e.target.value;
		// const body: any = {};
		// if (type === "repeticiones") body.value2 = value;
		// else if (type == "peso") body.value1 = value;
		// else if (type == "tiempo") body.value2 = value;
		// else if (type == "distancia") body.value1 = value;

		// const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/serie/${set["serieID"]}`, {
		// 	method: "PUT",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		"user": email!
		// 	},
		// 	body: JSON.stringify(body)
		// });
		// let data = await res.json();

		// console.log(data);
		// setRefetch(true);
	};

	return (
		<div className="flex flex-col gap-2 p-4 bg-zinc-800 rounded-xl">
			<div className="flex justify-between items-center gap-2">
				<h2 className="text-zinc-200 text-lg font-medium">{exercise.plantilla_ejercicio.nombre}</h2>
				<button onClick={() => handleRemoveExercise(exercise)} className="flex items-center gap-2 uppercase font-semibold px-4 py-2 rounded-lg bg-red-400 bg-opacity-15 text-red-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
					<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M18 6l-12 12" />
						<path d="M6 6l12 12" />
					</svg>
					Remove
				</button>
			</div>
			<hr className="border-zinc-600 my-2" />
			<div className="flex flex-col gap-4">
				<h2 className="text-zinc-200 text-lg font-medium">Sets</h2>
				{sets.map((set, index) => {
					const type = exercise.plantilla_ejercicio.tipo;
					return (
						<div key={index} className="flex items-center gap-4">
							<button onClick={() => handleRemoveSet(set)} className="flex justify-center items-center size-7 rounded-full bg-red-400 bg-opacity-15 text-red-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
								<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M18 6l-12 12" />
									<path d="M6 6l12 12" />
								</svg>
							</button>
							<label className="flex gap-2 items-center">
								{({repeticiones: "Repetitions", cronometrado: "Time", cardio: "Time"} as any)[type]}
								<input onChange={e => handleSerieChange(e, {repeticiones: "repeticiones", cronometrado: "tiempo", cardio: "tiempo"}[type] as string, set)} value={set[{repeticiones: "repeticiones", cronometrado: "tiempo", cardio: "tiempo"}[type] as string]} className="max-w-16 font-normal bg-zinc-800 border-b-[2px] border-zinc-200" type="number" />
							</label>
							<label className="flex gap-2 items-center">
								{({repeticiones: "Weight", cronometrado: "Weight", cardio: "Distance"} as any)[type]}
								<input onChange={e => handleSerieChange(e, {repeticiones: "peso", cronometrado: "peso", cardio: "distancia"}[type] as string, set)} value={set[{repeticiones: "peso", cronometrado: "peso", cardio: "distancia"}[type] as string]} className="max-w-16 font-normal bg-zinc-800 border-b-[2px] border-zinc-200" type="number" />
							</label>
						</div>
					);
				})}
				<button onClick={() => handleAddSet(exercise)} className="flex justify-center items-center size-7 rounded-full bg-green-400 bg-opacity-15 text-green-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
					<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 5l0 14" />
						<path d="M5 12l14 0" />
					</svg>
				</button>
			</div>
		</div>
	);
}
