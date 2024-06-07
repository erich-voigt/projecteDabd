import * as entrenamientoService from "@/services/entrenamiento.service";
import {Request, Response} from "express";

export const getEntrenamientos = async (req: Request, res: Response) => {
	try {
		const email = req.query.email as string;
		if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json(await entrenamientoService.getEntrenamientos(email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const getEntrenamiento = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const email = req.params.email as string;
		if (!email) return res.status(400).json({message: "email is required"});
		else if (!id) return res.status(400).json({message: "id is required"});
		return res.status(200).json(await entrenamientoService.getEntrenamiento(id, email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const createEntrenamiento = async (req: Request, res: Response) => {
	try {
		const email = req.query.email as string;
		if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json(await entrenamientoService.createEntrenamiento(email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const updateEntrenamiento = async (req: Request, res: Response) => {
	try {
		const email = req.query.email as string;
		const id = req.query.id as string;
		if (!email) return res.status(400).json({message: "email is required"});
		else if (!id) return res.status(400).json({message: "id is required"});
		return res.status(200).json(await entrenamientoService.updateEntrenamiento(id, email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const deleteEntrenamiento = async (req: Request, res: Response) => {
	try {
		const email = req.query.email as string;
		const id = req.query.id as string;
		if (!email) return res.status(400).json({message: "email is required"});
		else if (!id) return res.status(400).json({message: "id is required"});
		return res.status(200).json(await entrenamientoService.deleteEntrenamiento(id, email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};
