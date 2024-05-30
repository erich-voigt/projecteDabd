import connection from "@/config/database";
import {plantilla} from "@/models/plantilla.model";
import {usuario} from "@/models/usuario.model";
import {and, eq} from "drizzle-orm";

export const getPlantillas = async (email: string) => {
	const db = await connection;
	return await db.select().from(plantilla).leftJoin(usuario, eq(plantilla.usuario, usuario.email)).where(eq(usuario.email, email));
};

export const getPlantilla = async (id: string, email: string) => {
	const db = await connection;
	return await db
		.select()
		.from(plantilla)
		.leftJoin(usuario, eq(plantilla.usuario, usuario.email))
		.where(and(eq(plantilla.id, id), eq(usuario.email, email)))
		.limit(1);
};

export const createPlantilla = async (nombre: string, instrucciones: string, tipo: tipoEjercicio, email: string) => {
	const db = await connection;
	return await db.insert(plantilla).values({id: crypto.randomUUID(), nombre, instrucciones, tipo, usuario: email});
};

export const updatePlantilla = async (id: string, data: {nombre?: string; instrucciones?: string; tipo?: tipoEjercicio}, email: string) => {
	const db = await connection;
	return await db
		.update(plantilla)
		.set(data)
		.where(and(eq(plantilla.id, id), eq(plantilla.usuario, email)));
};

export const deletePlantilla = async (id: string, email: string) => {
	const db = await connection;
	return await db.delete(plantilla).where(and(eq(plantilla.id, id), eq(plantilla.usuario, email)));
};
