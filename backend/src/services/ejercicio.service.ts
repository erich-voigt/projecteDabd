import connection from "@/config/database";
import {ejercicio} from "@/models/ejercicio.model";
import {entrenamiento} from "@/models/entrenamiento.model";
import {eq} from "drizzle-orm";

export const getEjercicio = async (enternamiento: string) => {
	const db = await connection;
	return await db.select().from(ejercicio).leftJoin(entrenamiento, eq(ejercicio.entrenamiento, entrenamiento.id));
};

export const getEjercicios = async (id: string) => {
	const db = await connection;
	return await db.select().from(ejercicio).where(eq(ejercicio.id, id));
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
