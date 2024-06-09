import connection from "@/config/database";
import {serie} from "@/models/serie.model";
import {eq} from "drizzle-orm";

export const getSeries = async (ejercicioId: string) => {
	const db = await connection;
	return await db.select().from(serie).where(eq(serie.ejercicio, ejercicioId));
};

export const getSerie = async (id: string) => {
	const db = await connection;
	return await db.select().from(serie).where(eq(serie.id, id));
};

export const createSerie = async (ejercicio: string) => {
	const db = await connection;
	return await db.insert(serie).values({id: crypto.randomUUID(), finalizada: false, ejercicio});
};

export const updateSerie = async (id: string, finalizada: boolean) => {
	const db = await connection;
	return await db.update(serie).set({finalizada}).where(eq(serie.id, id));
};

export const deleteSerie = async (id: string) => {
	const db = await connection;
	return await db.delete(serie).where(eq(serie.id, id));
};
