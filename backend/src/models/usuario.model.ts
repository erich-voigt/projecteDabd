import {pgTable, varchar} from "drizzle-orm/pg-core";

export const usuario = pgTable("usuario", {
	email: varchar("email", {length: 255}).primaryKey().notNull(),
	contrasenya: varchar("contrasenya", {length: 255}).notNull()
});
