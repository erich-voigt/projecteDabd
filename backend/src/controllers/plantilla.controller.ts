import * as plantillaService from "@/services/plantilla.service";
import {Request, Response} from "express";

export const getPlantillas = async (req: Request, res: Response) => {
	try {
		const email = req.headers.user as string;
		if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json(await plantillaService.getPlantillas(email));
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const getPlantilla = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const email = req.headers.user as string;
		if (!email) return res.status(400).json({message: "email is required"});
		else if (!id) return res.status(400).json({message: "id is required"});
		let plantilla = await plantillaService.getPlantilla(id, email);
		if (plantilla === null || plantilla.length === 0) return res.status(404).json({message: "template not found"});
		return res.status(200).json(plantilla[0]);
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const createPlantilla = async (req: Request, res: Response) => {
	try {
		const nombre = req.body.nombre as string;
		const instrucciones = req.body.instrucciones as string;
		const tipo = req.body.tipo as tipoEjercicio;
		const email = req.headers.user as string;
		if (!nombre) return res.status(400).json({message: "nombre is required"});
		else if (!instrucciones) return res.status(400).json({message: "instrucciones is required"});
		else if (!tipo) return res.status(400).json({message: "tipo is required"});
		else if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json((await plantillaService.createPlantilla(nombre, instrucciones, tipo, email))[0]);
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const updatePlantilla = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const nombre = req.body.nombre as string;
		const instrucciones = req.body.instrucciones as string;
		const tipo = req.body.tipo as tipoEjercicio;
		const email = req.headers.user as string;
		if (!id) return res.status(400).json({message: "id is required"});
		else if (!nombre && !instrucciones && !tipo) return res.status(400).json({message: "at least one field is required"});
		else if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json((await plantillaService.updatePlantilla(id, {nombre, instrucciones, tipo}, email))[0]);
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const deletePlantilla = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const email = req.headers.user as string;
		if (!id) return res.status(400).json({message: "id is required"});
		else if (!email) return res.status(400).json({message: "email is required"});
		return res.status(200).json((await plantillaService.deletePlantilla(id, email))[0]);
	} catch (error) {
		return res.status(500).json({message: error});
	}
};
