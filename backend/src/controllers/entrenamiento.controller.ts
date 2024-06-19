import * as entrenamientoService from "@/services/entrenamiento.service";
import {Request, Response} from "express";

export const getGraph = async (req: Request, res: Response) => {
	try {
		const email = req.headers.user as string;
		if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json(await entrenamientoService.getGraph(email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const getEntrenamientos = async (req: Request, res: Response) => {
	try {
		const email = req.headers.user as string;
		if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json(await entrenamientoService.getEntrenamientos(email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const getEntrenamiento = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const email = req.headers.user as string;
		if (!email) return res.status(400).json({message: "email is required"});
		let entrenamiento = await entrenamientoService.getEntrenamiento(id, email);
		if (entrenamiento === null || entrenamiento.length === 0) return res.status(404).json({message: "workout not found"});
		return res.status(200).json(entrenamiento[0]);
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const createEntrenamiento = async (req: Request, res: Response) => {
	try {
		const email = req.headers.user as string;
		if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json((await entrenamientoService.createEntrenamiento(email))[0]);
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const updateEntrenamiento = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const email = req.headers.user as string;
		if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json(await entrenamientoService.updateEntrenamiento(id, email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const deleteEntrenamiento = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const email = req.headers.user as string;
		if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json(await entrenamientoService.deleteEntrenamiento(id, email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const graphEntrenamiento = async (req: Request, res: Response) => {
	try {
		return res.status(200).json(await entrenamientoService.graphEntrenamiento());
	} catch (error) {
		return res.status(500).json({message: error});
	}
};
