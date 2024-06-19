import {entrenamiento} from "@/models/entrenamiento.model";
import {plantilla} from "@/models/plantilla.model";
import {serie} from "@/models/serie.model";
import {relations} from "drizzle-orm";
import {boolean, pgTable, primaryKey, uuid} from "drizzle-orm/pg-core";

export const ejercicio = pgTable(
	"ejercicio_en_curso",
	{
		id: uuid("id").unique().notNull(),
		finalizado: boolean("finalizado").notNull(),
		entrenamiento: uuid("entrenamiento")
			.notNull()
			.references(() => entrenamiento.id),
		plantilla: uuid("plantilla")
			.notNull()
			.references(() => plantilla.id)
	},
	table => {
		return {
			pk: primaryKey({columns: [table.entrenamiento, table.plantilla]}),
			pkWithCustomName: primaryKey({name: "custom_name", columns: [table.entrenamiento, table.plantilla]})
		};
	}
);

export const ejercicioRelations = relations(ejercicio, ({one, many}) => ({
	entrenamiento: one(entrenamiento, {
		fields: [ejercicio.entrenamiento],
		references: [entrenamiento.id]
	}),
	plantilla: one(plantilla, {
		fields: [ejercicio.plantilla],
		references: [plantilla.id]
	}),
	series: many(serie)
}));
