import connection from "@/config/database";
import {entrenamiento} from "@/models/entrenamiento.model";
import {usuario} from "@/models/usuario.model";
import {and, eq} from "drizzle-orm";

export const getEntrenamientos = async (email: string) => {
	const db = await connection;
	return await db.select().from(entrenamiento).leftJoin(usuario, eq(entrenamiento.usuario, usuario.email));
};

export const getEntrenamiento = async (id: string, email: string) => {
	const db = await connection;
	return await db
		.select()
		.from(entrenamiento)
		.leftJoin(usuario, eq(entrenamiento.usuario, usuario.email))
		.where(and(eq(entrenamiento.id, id), eq(usuario.email, email)))
		.limit(1);
};

export const createEntrenamiento = async (email: string) => {
	const db = await connection;
	const currentDate = new Date().toISOString().split("T")[0];
	return await db.insert(entrenamiento).values({id: crypto.randomUUID(), fecha_inicio: currentDate, fecha_fin: null, usuario: email});
};

export const updateEntrenamiento = async (id: string, email: string) => {
	const db = await connection;
	const currentDate = new Date().toISOString().split("T")[0];
	return await db
		.update(entrenamiento)
		.set({fecha_fin: currentDate})
		.where(and(eq(entrenamiento.id, id), eq(entrenamiento.usuario, email)));
};

export const deleteEntrenamiento = async (id: string, email: string) => {
	const db = await connection;
	return await db.delete(entrenamiento).where(and(eq(entrenamiento.id, id), eq(entrenamiento.usuario, email)));
};
