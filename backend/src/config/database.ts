import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const connectDB = async () => {
	const client = new Client({
		connectionString: "postgresql://est_e9977173:dB.e9977173@ubiwan.epsevg.upc.edu:5432/est_e9977173",
	});
	await client.connect();
	await client.query("SET search_path TO practica");
	const db = drizzle(client);
	return db;
};

export default connectDB();
