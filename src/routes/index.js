import { Router } from "express";

import sanitizeBodyMiddleware from "../middlewares/sanitizeBodyMiddleware.js";

import loginsRoutes from "./loginsRoutes.js";
import doctorsRoutes from "./doctorsRoutes.js";

const routes = Router();

routes.use(sanitizeBodyMiddleware);

routes.use('/login', loginsRoutes);
routes.use('/doctors', doctorsRoutes);

export default routes;