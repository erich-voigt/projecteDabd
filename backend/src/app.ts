import cors from "cors";
import express from "express";

import ejercicioRoutes from "@/routes/ejercicio.routes";
import entrenamientoRoutes from "@/routes/entrenamiento.routes";
import plantillaRoutes from "@/routes/plantilla.routes";
import serieRoutes from "@/routes/serie.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/plantilla", plantillaRoutes);
app.use("/api/entrenamiento", entrenamientoRoutes);
app.use("/api/ejercicio", ejercicioRoutes);
app.use("/api/serie", serieRoutes);

app.use((req, res) => {
	res.status(404).json({message: "path not found"});
});

export default app;
