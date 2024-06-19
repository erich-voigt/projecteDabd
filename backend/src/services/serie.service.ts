import connection from "@/config/database";
import {ejercicio} from "@/models/ejercicio.model";
import {plantilla} from "@/models/plantilla.model";
import {cardio, cronometrado, repeticiones, serie} from "@/models/serie.model";
import {eq} from "drizzle-orm";

export const getSeries = async (ejercicioId: string) => {
	const db = await connection;
	//return await db.select().from(serie).where(eq(serie.ejercicio, ejercicioId));
	//now detect wich specialitzation is this serie using
	const specialitzation = await db.select({tipo: plantilla.tipo}).from(plantilla).leftJoin(ejercicio, eq(plantilla.id, ejercicio.plantilla)).where(eq(ejercicio.id, ejercicioId));

	let data: any;
	if (specialitzation[0].tipo == "repeticiones") {
		data = await db.select({serieID: serie.id, fin: serie.finalizada, peso: repeticiones.peso, repeticiones: repeticiones.repeticiones}).from(repeticiones).leftJoin(serie, eq(repeticiones.serie, serie.id)).leftJoin(ejercicio, eq(serie.ejercicio, ejercicio.id)).where(eq(ejercicio.id, ejercicioId));
	} else if (specialitzation[0].tipo == "cronometrado") {
		data = await db.select({serieID: serie.id, fin: serie.finalizada, peso: cronometrado.peso, repeticiones: cronometrado.tiempo}).from(cronometrado).leftJoin(serie, eq(cronometrado.serie, serie.id)).leftJoin(ejercicio, eq(serie.ejercicio, ejercicio.id)).where(eq(ejercicio.id, ejercicioId));
	} else {
		data = await db.select({serieID: serie.id, fin: serie.finalizada, repeticiones: cardio.distancia, peso: cardio.tiempo}).from(cardio).leftJoin(serie, eq(cardio.serie, serie.id)).leftJoin(ejercicio, eq(serie.ejercicio, ejercicio.id)).where(eq(ejercicio.id, ejercicioId));
	}
	return data;
};

export const getSerie = async (id: string) => {
	const db = await connection;
	const result = await db.select().from(serie).where(eq(serie.id, id));

	//now detect wich specialitzation is this serie using
	const specialitzation = await db.select({tipo: plantilla.tipo}).from(plantilla).leftJoin(ejercicio, eq(plantilla.id, ejercicio.plantilla)).leftJoin(serie, eq(ejercicio.id, serie.ejercicio)).where(eq(serie.id, id));

	//now select the data from the correct specialized table
	let data: any;
	if (specialitzation[0].tipo == "repeticiones") {
		data = await db.select().from(repeticiones).where(eq(repeticiones.serie, id));
	} else if (specialitzation[0].tipo == "cronometrado") {
		data = await db.select().from(cronometrado).where(eq(cronometrado.serie, id));
	} else {
		data = await db.select().from(cardio).where(eq(cardio.serie, id));
	}
	return {serie: result, especializacion: data};
};

export const createSerie = async (ejercicioId: string, value1: number, value2: number) => {
	const db = await connection;
	const result = await db.insert(serie).values({id: crypto.randomUUID(), finalizada: false, ejercicio: ejercicioId}).returning({serieID: serie.id});

	//now detect wich specialitzation is this serie using
	const specialitzation = await db.select({tipo: plantilla.tipo}).from(plantilla).leftJoin(ejercicio, eq(plantilla.id, ejercicio.plantilla)).where(eq(ejercicio.id, ejercicioId));

	//now insert into data into that specialitzation table
	let data: any;
	if (specialitzation[0].tipo == "repeticiones") {
		data = await db.insert(repeticiones).values({serie: result[0].serieID, peso: value1, repeticiones: value2});
	} else if (specialitzation[0].tipo == "cronometrado") {
		data = await db.insert(cronometrado).values({serie: result[0].serieID, peso: value1, tiempo: value2});
	} else {
		data = await db.insert(cardio).values({serie: result[0].serieID, distancia: value1, tiempo: value2});
	}

	return data;
};

export const updateSerie = async (id: string, finalizada: boolean) => {
	const db = await connection;
	return await db.update(serie).set({finalizada}).where(eq(serie.id, id));
};

export const deleteSerie = async (id: string) => {
	const db = await connection;
	return await db.delete(serie).where(eq(serie.id, id));
};
