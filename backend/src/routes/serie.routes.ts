import {Router} from "express";

import * as serieController from "@/controllers/serie.controller";

const router = Router();

router.get("/", serieController.getSeries);

router.get("/:id", serieController.getSerie);

router.post("/", serieController.createSerie);

router.put("/:id", serieController.updateSerie);

router.delete("/:id", serieController.deleteSerie);

export default router;
