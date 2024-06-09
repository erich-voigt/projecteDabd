import {Link} from "react-router-dom";

interface TemplateCardProps {
	id: string;
	instrucciones: string;
	nombre: string;
	tipo: string;
	usuario?: string;
	handleDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void;
}

const types = {
	repeticiones: "Repetitions",
	cronometrado: "Timed",
	cardio: "Cardio"
};

export default function TemplateCard({id, instrucciones, nombre, tipo, handleDelete}: TemplateCardProps) {
	return (
		<div className="bg-zinc-200 flex flex-col justify-center items-start min-h-32 gap-4 p-5 rounded-xl">
			<div className="flex justify-between items-center flex-wrap w-full gap-2">
				<h1 className="text-zinc-900 text-xl font-semibold">{nombre}</h1>
				<p className={`${{repeticiones: "bg-emerald-300", cronometrado: "bg-purple-300", cardio: "bg-blue-300"}[tipo]} text-zinc-900 font-medium text-sm px-3 py-1 rounded-full`}>{types[tipo as keyof typeof types]}</p>
			</div>
			<div className="flex-1">
				<p className="text-zinc-900">{instrucciones}</p>
			</div>
			<div className="flex justify-end items-center w-full gap-2">
				<Link to={`/template/edit/${id}`} className="flex-1 flex items-center gap-1 px-4 py-2 rounded-md uppercase font-medium bg-green-400 bg-opacity-20 text-green-500 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
					<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
						<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
						<path d="M16 5l3 3" />
					</svg>
					Edit
				</Link>
				<button onClick={event => handleDelete(event, id)} className="flex items-center gap-1 px-4 py-2 rounded-md uppercase font-medium bg-red-400 bg-opacity-20 text-red-500 hover:bg-opacity-100 hover:text-zinc-900 transition-all">
					<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M4 7l16 0" />
						<path d="M10 11l0 6" />
						<path d="M14 11l0 6" />
						<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
						<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
					</svg>
					Delete
				</button>
			</div>
		</div>
	);
}
