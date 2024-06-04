import {useEffect, useState} from "react";
import PlantillaCard from "./components/PlantillaCard";

export default function App() {
	const [loading, setLoading] = useState(true);
	const [plantillas, setPlantillas] = useState<Plantilla[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("http://localhost:3000/api/plantilla?email=demo@test.com");
			const data = await res.json();
			setPlantillas(data);
			console.log(data);
			setLoading(false);
		};

		fetchData();
	}, []);

	if (loading) return <h1>Loading...</h1>;

	return (
		<div className="min-h-dvh px-10 pt-8 bg-stone-50">
			<h1 className="text-4xl font-semibold mb-6">Plantillas</h1>
			<div className="mx-auto grid place-content-center grid-cols-[repeat(auto-fit,minmax(300px,600px))] gap-6">
				{plantillas.map(plantilla => {
					const {id, instrucciones, nombre, tipo, usuario} = plantilla.plantilla_ejercicio;
					return <PlantillaCard key={id} id={id} instrucciones={instrucciones} nombre={nombre} tipo={tipo} usuario={usuario} />;
				})}
			</div>
		</div>
	);
}
