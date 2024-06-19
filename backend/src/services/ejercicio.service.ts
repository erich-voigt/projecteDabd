import connection from "@/config/database";
import {ejercicio} from "@/models/ejercicio.model";
import {plantilla} from "@/models/plantilla.model";
import {eq} from "drizzle-orm";

export const getEjercicios = async (entrenamientoId: string) => {
	const db = await connection;
	return await db.select().from(ejercicio).leftJoin(plantilla, eq(plantilla.id, ejercicio.plantilla)).where(eq(ejercicio.entrenamiento, entrenamientoId));
};

export const getEjercicio = async (id: string) => {
	const db = await connection;
	return await db.select().from(ejercicio).leftJoin(plantilla, eq(plantilla.id, ejercicio.plantilla)).where(eq(ejercicio.id, id));
};

export const createEjercicio = async (plantilla: string, entrenamiento: string) => {
	const db = await connection;
	return await db.insert(ejercicio).values({id: crypto.randomUUID(), finalizado: false, entrenamiento, plantilla}).returning();
};

export const updateEjercicio = async (id: string, data: {finalizado?: boolean}) => {
	const db = await connection;
	return await db.update(ejercicio).set(data).where(eq(ejercicio.id, id)).returning();
};

export const deleteEjercicio = async (id: string) => {
	const db = await connection;
	return await db.delete(ejercicio).where(eq(ejercicio.id, id)).returning();
};
