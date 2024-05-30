import * as ejercicio from "@/models/ejercicio.model";
import * as entrenamiento from "@/models/entrenamiento.model";
import * as plantilla from "@/models/plantilla.model";
import * as serie from "@/models/serie.model";
import * as usuario from "@/models/usuario.model";
import {drizzle} from "drizzle-orm/node-postgres";
import {Client} from "pg";

const schema = {
	...ejercicio,
	...entrenamiento,
	...plantilla,
	...serie,
	...usuario
};

const connectDB = async () => {
	const client = new Client({
		connectionString: "postgresql://est_e9977173:dB.e9977173@ubiwan.epsevg.upc.edu:5432/est_e9977173"
	});
	await client.connect();
	await client.query("SET search_path TO practica");
	const db = drizzle(client, {schema});
	return db;
};

export default connectDB();
