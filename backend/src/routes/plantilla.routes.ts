import {Router} from "express";

import * as plantillaController from "@/controllers/plantilla.controller";

const router = Router();

router.get("/", plantillaController.getPlantillas);

router.get("/:id", plantillaController.getPlantilla);

router.post("/", plantillaController.createPlantilla);

router.put("/", plantillaController.updatePlantilla);

router.delete("/", plantillaController.deletePlantilla);

export default router;
