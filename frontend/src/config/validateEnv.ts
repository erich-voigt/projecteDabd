import {z} from "zod";

const envVars = z.object({
	VITE_BASE_URL: z.string().url(),
	VITE_API_PATH: z.string().startsWith("/")
});

envVars.parse(import.meta.env);
