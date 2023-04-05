import { Router } from "express";

import loginControllers from "../controllers/loginsControllers.js";

import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

import loginsSchemas from "../schemas/loginsSchemas.js";

const loginsRoutes = Router();

loginsRoutes
    .post('/sign-in', validateSchemaMiddleware(loginsSchemas.signIn), loginControllers.signIn)

    .post('/sign-up', validateSchemaMiddleware(loginsSchemas.signUp), loginControllers.signUp)

export default loginsRoutes;