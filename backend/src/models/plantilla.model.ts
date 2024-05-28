import connection from "@/config/database";
import { eq } from 'drizzle-orm';
import { pgTable, varchar } from "drizzle-orm/pg-core";

const doSomething = async () => {
	const db = await connection;
	console.log(await db.select({mail: usuario.contrasenya}).from(usuario).where(eq(usuario.email, "brosado@example.org")));
};

doSomething();

export const usuario = pgTable("usuario", {
	email: varchar("email", { length: 255 }).primaryKey().notNull(),
	contrasenya: varchar("contrasenya", { length: 255 }).notNull(),
});
