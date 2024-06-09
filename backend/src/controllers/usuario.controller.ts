import * as usuarioService from "@/services/usuario.service";
import {Request, Response} from "express";

// Add Sessions For Production

export const login = async (req: Request, res: Response) => {
	try {
		const email = req.body.email as string;
		const password = req.body.password as string;
		if (!email) return res.status(400).json({message: "email is required"});
		if (!password) return res.status(400).json({message: "password is required"});
		let user = await usuarioService.login(email, password);
		if (user === null || user.length === 0) return res.status(404).json({message: "user not found"});
		return res.status(200).json(user[0]);
	} catch (error) {
		return res.status(500).json({message: error});
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const email = req.body.email as string;
		const password = req.body.password as string;
		if (!email) return res.status(400).json({message: "email is required"});
		if (!password) return res.status(400).json({message: "password is required"});
		let user = await usuarioService.register(email, password);
		if (user === null || user.length === 0) return res.status(404).json({message: "failed to register"});
		return res.status(200).json(user[0]);
	} catch (error) {
		return res.status(500).json({message: error});
	}
};
