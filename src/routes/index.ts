import { Router } from "express";

import sanitizeBodyMiddleware from "../middlewares/sanitizeBodyMiddleware.js";

import loginsRoutes from "./loginsRoutes.js";
import doctorsRoutes from "./doctorsRoutes.js";
import patientsAppointmentsRoutes from "./patientsAppointmentsRoutes.js";
import doctorsAppointmentsRoutes from "./doctorsAppointmentsRoutes.js";

const routes = Router();

routes.use(sanitizeBodyMiddleware);

routes.use('/login', loginsRoutes);

routes.use('/doctors', doctorsRoutes);

routes.use('/appointments', patientsAppointmentsRoutes);

routes.use('/appointments', doctorsAppointmentsRoutes);

export default routes;