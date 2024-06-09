import connection from "@/config/database";
import {usuario} from "@/models/usuario.model";
import {and, eq} from "drizzle-orm";

export const login = async (email: string, contrasenya: string) => {
	const db = await connection;
	return await db
		.select({email: usuario.email})
		.from(usuario)
		.where(and(eq(usuario.email, email), eq(usuario.contrasenya, contrasenya)))
		.limit(1);
};

export const register = async (email: string, contrasenya: string) => {
	const db = await connection;
	if (await login(email, contrasenya).then(res => res.length > 0)) throw new Error("email already in use");
	return await db.insert(usuario).values({email, contrasenya}).returning({email: usuario.email});
};
