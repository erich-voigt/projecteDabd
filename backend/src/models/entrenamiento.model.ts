import {ejercicio} from "@/models/ejercicio.model";
import {usuario} from "@/models/usuario.model";
import {relations} from "drizzle-orm";
import {date, pgTable, uuid, varchar} from "drizzle-orm/pg-core";

export const entrenamiento = pgTable("entrenamiento", {
	id: uuid("id").primaryKey().notNull(),
	fecha_inicio: date("fecha_inicio"),
	fecha_fin: date("fecha_fin"),
	usuario: varchar("usuario", {length: 255})
		.notNull()
		.references(() => usuario.email, {onDelete: "cascade", onUpdate: "cascade"})
});

export const entrenamientoRelations = relations(entrenamiento, ({one, many}) => ({
	usuario: one(usuario, {
		fields: [entrenamiento.usuario],
		references: [usuario.email]
	}),
	ejercicios: many(ejercicio)
}));
