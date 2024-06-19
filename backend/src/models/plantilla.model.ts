import {ejercicio} from "@/models/ejercicio.model";
import {usuario} from "@/models/usuario.model";
import {relations} from "drizzle-orm";
import {pgEnum, pgTable, uuid, varchar} from "drizzle-orm/pg-core";

export const tipoEjercicioEnum = pgEnum("tipo_ejercicio", ["repeticiones", "cronometrado", "cardio"]);

export const plantilla = pgTable("plantilla_ejercicio", {
	id: uuid("id").primaryKey().notNull(),
	nombre: varchar("nombre", {length: 255}).notNull(),
	instrucciones: varchar("instrucciones", {length: 2048}).notNull(),
	tipo: tipoEjercicioEnum("tipo").notNull(),
	usuario: varchar("usuario", {length: 255})
		.notNull()
		.references(() => usuario.email, {onDelete: "cascade", onUpdate: "cascade"})
});

export const plantillaRelations = relations(plantilla, ({one, many}) => ({
	usuario: one(usuario, {
		fields: [plantilla.usuario],
		references: [usuario.email]
	}),
	ejercicios: many(ejercicio)
}));
