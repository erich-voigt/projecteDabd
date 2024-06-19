import * as serieService from "@/services/serie.service";
import {Request, Response} from "express";

export const getSeries = async (req: Request, res: Response) => {
	try {
		const ejercicioId = req.query.id as string;
		if (!ejercicioId) return res.status(400).json({message: "ejercicio is required"});
		return res.status(200).json(await serieService.getSeries(ejercicioId));
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const getSerie = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		if (!id) return res.status(400).json({message: "id is required"});
		return res.status(200).json(await serieService.getSerie(id));
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const createSerie = async (req: Request, res: Response) => {
	try {
		const ejercicioId = req.query.ejercicio as string;
		const value1 = req.query.value1 as string;
		const value2 = req.query.value2 as string;
		if (!ejercicioId) return res.status(400).json({message: "ejercicio is required"});
		if (!value1) return res.status(400).json({message: "value1 is required"});
		if (!value2) return res.status(400).json({message: "value2 is required"});
		return res.status(200).json(await serieService.createSerie(ejercicioId, Number(value1), Number(value2)));
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const updateSerie = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const finalizada = req.query.finalizada === "true";
		if (!id) return res.status(400).json({message: "id is required"});
		else if (!finalizada) return res.status(400).json({message: "finalizada is required"});
		return res.status(200).json(await serieService.updateSerie(id, finalizada));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const deleteSerie = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		if (!id) return res.status(400).json({message: "id is required"});
		return res.status(400).json(await serieService.deleteSerie(id));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};
