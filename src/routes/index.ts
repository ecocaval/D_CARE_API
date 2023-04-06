import { Router } from "express";

import sanitizeBodyMiddleware from "../middlewares/sanitizeBodyMiddleware.js";

import loginsRoutes from "./loginsRoutes.js";
import doctorsRoutes from "./doctorsRoutes.js";
import patientsRoutes from "./patientsRoutes.js";

const routes = Router();

routes
    .use(sanitizeBodyMiddleware)

    .use('/login', loginsRoutes)

    .use('/doctors', doctorsRoutes)

    .use('/patients', patientsRoutes);

export default routes;