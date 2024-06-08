import connection from "@/config/database";
import {ejercicio} from "@/models/ejercicio.model";
import {eq} from "drizzle-orm";

export const getEjercicios = async (id: string) => {
	const db = await connection;
	return await db.select().from(ejercicio).where(eq(ejercicio.id, id));
};

export const getEjercicio = async (entrenamientoId: string) => {
	const db = await connection;
	return await db.select().from(ejercicio).where(eq(ejercicio.entrenamiento, entrenamientoId));
};

export const createEjercicio = async (plantilla: string, entrenamiento: string) => {
	const db = await connection;
	return await db.insert(ejercicio).values({id: crypto.randomUUID(), finalizado: false, entrenamiento, plantilla});
};

export const updateEjercicio = async (id: string, data: {finalizado?: boolean}) => {
	const db = await connection;
	return await db.update(ejercicio).set(data).where(eq(ejercicio.id, id));
};

export const deleteEjercicio = async (id: string) => {
	const db = await connection;
	return await db.delete(ejercicio).where(eq(ejercicio.id, id));
};
