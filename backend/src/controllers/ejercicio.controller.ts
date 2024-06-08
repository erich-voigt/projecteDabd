import * as ejercicioService from "@/services/ejercicio.service";
import {Request, Response} from "express";

export const getEjercicios = async (req: Request, res: Response) => {
	try {
		const entrenamiento = req.query.entrenamiento as string;
		if (!entrenamiento) return res.status(400).json({message: "entrenamiento is required"});
		return res.status(200).json(await ejercicioService.getEjercicios(entrenamiento));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const getEjercicio = async (req: Request, res: Response) => {
	try {
		const id = req.query.entrenamiento as string;
		if (!id) return res.status(400).json({message: "id is required"});
		return res.status(200).json(await ejercicioService.getEjercicio(id));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const createEjercicio = async (req: Request, res: Response) => {
	try {
		const plantilla = req.query.plantilla as string;
		const entrenamiento = req.query.entrenamiento as string;
		if (!plantilla) return res.status(400).json({message: "plantilla is rquired"});
		else if (!entrenamiento) return res.status(400).json({message: "entrenamiento id is rquired"});
		return res.status(200).json(await ejercicioService.createEjercicio(plantilla, entrenamiento));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const updateEjercicio = async (req: Request, res: Response) => {
	try {
		const id = req.query.id as string;
		const finalizado = req.query.finalizado === "true";
		if (!id) return res.status(400).json({message: "id is required"});
		else if (!finalizado) return res.status(400).json({message: "finalizado boolead is required"});
		return res.status(200).json(await ejercicioService.updateEjercicio(id, {finalizado}));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const deleteEjercicio = async (req: Request, res: Response) => {
	try {
		const id = req.query.id as string;
		if (!id) return res.status(400).json({message: "id is required"});
		return res.status(400).json(await ejercicioService.deleteEjercicio(id));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};
