interface PlantillaCardProps {
	id: string;
	instrucciones: string;
	nombre: string;
	tipo: string;
	usuario: string;
}

export default function PlantillaCard({instrucciones, nombre, tipo, usuario}: PlantillaCardProps) {
	return (
		<div className="bg-white flex flex-col justify-center items-start gap-4 p-6 rounded-md shadow-md">
			<div className="flex justify-between items-center flex-wrap w-full">
				<h1 className="text-xl font-semibold">{nombre}</h1>
				<p className={`${{repeticiones: "bg-emerald-200", cronometrado: "bg-purple-200", cardio: "bg-amber-200"}[tipo]} text-neutral-800 px-5 py-2 rounded-full`}>{`${tipo[0].toUpperCase()}${tipo.slice(1)}`}</p>
			</div>
			<div className="flex-1">
				<p>{instrucciones}</p>
			</div>
			<div className="flex justify-between items-center w-full gap-4">
				<p className="flex-1 text-stone-600">Creado por {usuario}</p>
				<button className="px-4 py-2 rounded-md bg-stone-200 text-black hover:bg-black hover:text-white transition-all font-semibold">Añadir</button>
			</div>
		</div>
	);
}
