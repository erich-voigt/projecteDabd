import connection from "@/config/database";
import {entrenamiento} from "@/models/entrenamiento.model";
import {usuario} from "@/models/usuario.model";
import {and, eq, sql} from "drizzle-orm";

export const getGraph = async (email: string) => {
	const db = await connection;
	let res = await db.execute(sql`
		WITH months AS (
			SELECT
				generate_series(
					DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 year'),
					DATE_TRUNC('month', CURRENT_DATE),
					'1 month'::interval
				) AS month
		)
		SELECT
			months.month,
			COUNT(entrenamiento.fecha_inicio) AS count
		FROM
			months
		LEFT JOIN
			entrenamiento
		ON
			DATE_TRUNC('month', entrenamiento.fecha_inicio) = months.month AND entrenamiento.usuario = ${email}
		GROUP BY
			months.month
		ORDER BY
			months.month;
	`);
	if (res.rows.length !== 13) throw new Error("error getting data");
	const data = {
		months: [] as string[],
		values: [] as number[]
	};
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	for (let i = 1; i < res.rows.length; ++i) {
		data.months.push(months[new Date(res.rows[i].month as string).getMonth()]);
		data.values.push(parseInt(res.rows[i].count as string));
	}
	return data;
};

export const getEntrenamientos = async (email: string) => {
	const db = await connection;
	return await db.select().from(entrenamiento).leftJoin(usuario, eq(entrenamiento.usuario, usuario.email)).where(eq(usuario.email, email));
};

export const getEntrenamiento = async (id: string, email: string) => {
	const db = await connection;
	return await db
		.select()
		.from(entrenamiento)
		.leftJoin(usuario, eq(entrenamiento.usuario, usuario.email))
		.where(and(eq(entrenamiento.id, id), eq(usuario.email, email)))
		.limit(1);
};

export const createEntrenamiento = async (email: string) => {
	const db = await connection;
	const currentDate = new Date().toISOString().split("T")[0];
	return await db.insert(entrenamiento).values({id: crypto.randomUUID(), fecha_inicio: currentDate, fecha_fin: null, usuario: email}).returning();
};

export const updateEntrenamiento = async (id: string, email: string) => {
	const db = await connection;
	const currentDate = new Date().toISOString().split("T")[0];
	return await db
		.update(entrenamiento)
		.set({fecha_fin: currentDate})
		.where(and(eq(entrenamiento.id, id), eq(entrenamiento.usuario, email)));
};

export const deleteEntrenamiento = async (id: string, email: string) => {
	const db = await connection;
	return await db.delete(entrenamiento).where(and(eq(entrenamiento.id, id), eq(entrenamiento.usuario, email)));
};
