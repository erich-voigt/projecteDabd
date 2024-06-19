interface ReceivedExercise {
	ejercicio_en_curso: {
		id: string;
		plantilla: string;
		entrenamiento: string;
		finalizado: boolean;
	};
	plantilla_ejercicio: {
		id: string;
		instrucciones: string;
		nombre: string;
		tipo: string;
		usuario: string;
	};
}
