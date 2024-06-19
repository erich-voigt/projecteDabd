import {Router} from "express";

import * as ejercicioController from "@/controllers/ejercicio.controller";

const router = Router();

router.get("/", ejercicioController.getEjercicios);

router.get("/:id", ejercicioController.getEjercicio);

router.post("/", ejercicioController.createEjercicio);

router.put("/:id", ejercicioController.updateEjercicio);

router.delete("/:id", ejercicioController.deleteEjercicio);

export default router;
