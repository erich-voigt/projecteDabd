interface ReceivedWorkout {
	entrenamiento: {
		id: string;
		usuario: string;
		fecha_inicio?: string;
		fecha_fin?: string;
	};
	usuario: {
		email: string;
		contrasenya: string;
	};
}
