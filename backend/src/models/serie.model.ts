import {ejercicio} from "@/models/ejercicio.model";
import {relations} from "drizzle-orm";
import {boolean, integer, pgTable, uuid} from "drizzle-orm/pg-core";

export const serie = pgTable("serie", {
	id: uuid("id").primaryKey().notNull(),
	finalizada: boolean("finalizada").notNull(),
	ejercicio: uuid("ejercicio")
		.notNull()
		.references(() => ejercicio.id)
});

export const serieRelations = relations(serie, ({one}) => ({
	ejercicio: one(ejercicio, {
		fields: [serie.ejercicio],
		references: [ejercicio.id]
	})
}));

export const repeticiones = pgTable("repeticiones", {
	serie: uuid("serie")
		.primaryKey()
		.notNull()
		.references(() => serie.id),
	peso: integer("peso").notNull(),
	repeticiones: integer("repeticiones").notNull()
});

export const repeticionesRelations = relations(repeticiones, ({one}) => ({
	serie: one(serie, {
		fields: [repeticiones.serie],
		references: [serie.id]
	})
}));

export const cronometrado = pgTable("cronometrado", {
	serie: uuid("serie")
		.primaryKey()
		.notNull()
		.references(() => serie.id),
	peso: integer("peso").notNull(),
	tiempo: integer("tiempo").notNull()
});

export const cronometradoRelations = relations(cronometrado, ({one}) => ({
	serie: one(serie, {
		fields: [cronometrado.serie],
		references: [serie.id]
	})
}));

export const cardio = pgTable("cardio", {
	serie: uuid("serie")
		.primaryKey()
		.notNull()
		.references(() => serie.id),
	distancia: integer("distancia").notNull(),
	tiempo: integer("tiempo").notNull()
});

export const cardioRelations = relations(cardio, ({one}) => ({
	serie: one(serie, {
		fields: [cardio.serie],
		references: [serie.id]
	})
}));
