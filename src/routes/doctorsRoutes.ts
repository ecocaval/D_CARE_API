import { NextFunction, Request, Response, Router } from "express";

import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

import doctorsControllers from "../controllers/doctorsControllers.js";

const doctorsRoutes = Router();

doctorsRoutes
    .use('/', (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'patient')
    })
    
    .get('/', doctorsControllers.selectAll)

export default doctorsRoutes;