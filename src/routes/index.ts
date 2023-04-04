import { Router } from "express";

import sanitizeBodyMiddleware from "../middlewares/sanitizeBodyMiddleware.js";

import loginsRoutes from "./loginsRoutes.js";
import doctorsRoutes from "./doctorsRoutes.js";
import appointmentsRoutes from "./appointmentsRoutes.js";

const routes = Router();

routes.use(sanitizeBodyMiddleware);

routes.use('/login', loginsRoutes);
routes.use('/doctors', doctorsRoutes);
routes.use('/appointments', appointmentsRoutes);

export default routes;