import { Router } from "express";

import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

import doctorsControllers from "../controllers/doctorsControllers.js";

const doctorsRoutes = Router();

doctorsRoutes.get(
    '/',
    validateTokenMiddleware,
    doctorsControllers.selectAll
);

export default doctorsRoutes;