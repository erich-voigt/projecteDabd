import {Router} from "express";

import * as entrenamientoController from "@/controllers/entrenamiento.controller";

const router = Router();

router.get("/", entrenamientoController.getEntrenamientos);

router.get("/:id", entrenamientoController.getEntrenamiento);

router.post("/", entrenamientoController.createEntrenamiento);

router.put("/", entrenamientoController.updateEntrenamiento);

router.delete("/", entrenamientoController.deleteEntrenamiento);

export default router;
