import { Router } from "express";

import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

import doctorsControllers from "../controllers/doctorsControllers.js";

const doctorsRoutes = Router();

doctorsRoutes.get(
    '/',
    (req, res, next) => {
        validateTokenMiddleware(req, res, next, 'patient')
    },
    doctorsControllers.selectAll
);

export default doctorsRoutes;