import { NextFunction, Request, Response, Router } from "express";

import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

import doctorsControllers from "../controllers/doctorsControllers.js";

const doctorsRoutes = Router();

doctorsRoutes.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'patient')
    },
    doctorsControllers.selectAll
);

export default doctorsRoutes;