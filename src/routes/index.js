import { Router } from "express";

import sanitizeBodyMiddleware from "../middlewares/sanitizeBodyMiddleware.js";
import loginsRoutes from "./loginsRoutes.js";

const routes = Router();

routes.use(sanitizeBodyMiddleware);

routes.use('/login', loginsRoutes);

export default routes;