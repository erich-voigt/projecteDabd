import {ejercicio} from "@/models/ejercicio.model";
import {relations} from "drizzle-orm";
import {boolean, pgTable, uuid} from "drizzle-orm/pg-core";

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
