import {Router} from "express";

import * as entrenamientoController from "@/controllers/entrenamiento.controller";

const router = Router();

router.get("/graph", entrenamientoController.getGraph);

router.get("/", entrenamientoController.getEntrenamientos);

router.get("/:id", entrenamientoController.getEntrenamiento);

router.post("/", entrenamientoController.createEntrenamiento);

router.put("/:id", entrenamientoController.updateEntrenamiento);

router.delete("/:id", entrenamientoController.deleteEntrenamiento);

export default router;
