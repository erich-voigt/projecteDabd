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
		const ejercicioId = req.body.ejercicio as string;
		const value1 = req.body.value1 as number;
		const value2 = req.body.value2 as number;
		if (!ejercicioId) return res.status(400).json({message: "ejercicio is required"});
		else if (value1 ?? false) return res.status(400).json({message: "value1 is required"});
		else if (value2 ?? false) return res.status(400).json({message: "value2 is required"});
		return res.status(200).json(await serieService.createSerie(ejercicioId, value1, value2));
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const updateSerie = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		let finalizada = req.body.finalizada;
		if (finalizada !== null || finalizada !== undefined) finalizada = finalizada === "true";
		let value1 = req.body.value1;
		if (value1 !== null || value1 !== undefined) value1 = parseInt(value1);
		let value2 = req.body.value2;
		if (value2 !== null || value2 !== undefined) value2 = parseInt(value2);
		if (!id) return res.status(400).json({message: "id is required"});
		return res.status(200).json(await serieService.updateSerie(id, {value1, value2}, finalizada));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const deleteSerie = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		if (!id) return res.status(400).json({message: "id is required"});
		return res.status(200).json((await serieService.deleteSerie(id))[0]);
	} catch (error) {
		return res.status(500).json({message: error});
	}
};
