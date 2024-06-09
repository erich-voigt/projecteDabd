import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useStore from "../store/useStore";

export default function EditTemplate() {
	const {email} = useStore();
	const navigate = useNavigate();
	const {id} = useParams();

	const [name, setName] = useState("");
	const [instructions, setInstructions] = useState("");
	const [type, setType] = useState("repeticiones");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTemplate = async () => {
			const res = await fetch(`http://localhost:3000/api/plantilla/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"user": email!
				}
			});
			if (!res.ok) return;
			const {plantilla_ejercicio: data} = await res.json();
			console.log(data);
			setName(data.nombre);
			setInstructions(data.instrucciones);
			setType(data.tipo);
			setLoading(false);
		};

		fetchTemplate();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!name || !instructions || !type) return;

		const body: any = {};

		if (name !== "") body["nombre"] = name;
		if (instructions !== "") body["instrucciones"] = instructions;
		if (type !== "") body["tipo"] = type;

		const res = await fetch(`http://localhost:3000/api/plantilla/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"user": email!
			},
			body: JSON.stringify(body)
		});
		if (!res.ok) return;
		const data = await res.json();
		console.log(data);
		navigate("/templates");
	};

	if (!loading) {
		return (
			<section className="max-w-[1800px] w-full mx-auto px-8 md:px-16 py-4">
				<form onSubmit={handleSubmit} className="flex flex-col justify-between rounded-3xl bg-zinc-200 w-full p-8 gap-8">
					<h1 className="uppercase text-4xl font-semibold text-zinc-900">Edit Template</h1>
					<div className="flex flex-col justify-between gap-4">
						<label className="flex flex-col text-zinc-900 w-full">
							<span className="font-semibold text-lg mb-2">Name</span>
							<input className="px-3 py-2 rounded-lg font-medium bg-zinc-200 border-[2px] border-zinc-900" placeholder="Push Ups" type="text" onChange={event => setName(event.target.value)} value={name} />
						</label>
						<label className="flex flex-col text-zinc-900 w-full">
							<span className="font-semibold text-lg mb-2">Type</span>
							<select className="px-3 py-2 rounded-lg font-medium bg-zinc-200 border-[2px] border-zinc-900" onChange={event => setType(event.target.value)} value={type}>
								<option value="repeticiones">Repetitions</option>
								<option value="cronometrado">Timed</option>
								<option value="cardio">Cardio</option>
							</select>
						</label>
						<label className="flex flex-col text-zinc-900 w-full">
							<span className="font-semibold text-lg mb-2">Instructions</span>
							<textarea className="px-3 py-2 rounded-lg font-medium bg-zinc-200 border-[2px] border-zinc-900" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente aliquid, id ipsum autem quo repellat temporibus perferendis vitae nobis voluptatem. Optio sed eligendi cupiditate sunt earum eaque deserunt molestiae quasi." onChange={event => setInstructions(event.target.value)} value={instructions} />
						</label>
					</div>
					<button className="w-fit self-end uppercase text-lg font-semibold px-5 py-3 rounded-lg bg-lime-400 text-zinc-900 hover:bg-zinc-900 hover:text-lime-400 transition-all" type="submit">
						Edit
					</button>
				</form>
			</section>
		);
	}
}
