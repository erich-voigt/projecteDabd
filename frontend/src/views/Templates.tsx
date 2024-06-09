import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import TemplateCard from "../components/TemplateCard";
import useStore from "../store/useStore";

export default function Templates() {
	const {email} = useStore();

	const [plantillas, setPlantillas] = useState<Plantilla[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("http://localhost:3000/api/plantilla", {
				headers: {
					"Content-Type": "application/json",
					"user": email!
				}
			});
			const data = await res.json();
			setPlantillas(data);
			console.log(data);
		};

		fetchData();
	}, []);

	const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
		event.preventDefault();
		const res = await fetch(`http://localhost:3000/api/plantilla/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"user": email!
			}
		});
		if (!res.ok) return;
		const data = res.json();
		console.log(data);
		window.location.reload();
	};

	return (
		<section className="max-w-[1800px] w-full mx-auto px-8 md:px-16 py-4">
			<div className="relative flex flex-col md:flex-row gap-2">
				<div className="md:sticky md:top-28 flex flex-col justify-between min-w-[300px] md:max-w-[500px] w-full h-full gap-2">
					<div className="flex-1 bg-zinc-800 p-8 rounded-xl">
						<p className="text-lime-400 mb-2">Templates</p>
						<h1 className="uppercase text-4xl font-semibold">List of all your templates</h1>
					</div>
					<Link to="/template/new" className="uppercase text-xl font-semibold p-4 rounded-xl bg-lime-400 bg-opacity-15 text-lime-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
						<span className="flex justify-between items-center px-4">
							New Template
							<svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M12 5l0 14" />
								<path d="M5 12l14 0" />
							</svg>
						</span>
					</Link>
				</div>
				<div className="w-full h-full mx-auto grid place-content-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
					{plantillas.map(plantilla => {
						const {id, instrucciones, nombre, tipo, usuario} = plantilla.plantilla_ejercicio;
						return <TemplateCard key={id} id={id} instrucciones={instrucciones} nombre={nombre} tipo={tipo} usuario={usuario} handleDelete={handleDelete} />;
					})}
				</div>
			</div>
		</section>
	);
}
