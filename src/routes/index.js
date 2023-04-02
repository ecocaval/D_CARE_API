import { Router } from "express";

import sanitizeBodyMiddleware from "../middlewares/sanitizeBodyMiddleware.js";

const routes = Router();

routes.use(sanitizeBodyMiddleware);

export default routes;