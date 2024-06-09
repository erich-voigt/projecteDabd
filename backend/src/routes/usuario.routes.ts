import {Router} from "express";

import * as usuarioController from "@/controllers/usuario.controller";

const router = Router();

router.post("/login", usuarioController.login);

router.post("/register", usuarioController.register);

export default router;
