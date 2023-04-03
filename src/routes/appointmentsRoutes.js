import { Router } from "express";

import appointmentsController from "../controllers/appointmentsController.js";

import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

import appointmentsSchemas from "../schemas/appointmentsSchemas.js";

const appointmentsRoutes = Router();

appointmentsRoutes.get(
    '/',
    (req, res, next) => {
        validateTokenMiddleware(req, res, next, 'patient')
    },
    appointmentsController.selectAll
);

appointmentsRoutes.post(
    '/',
    (req, res, next) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    },
    validateSchemaMiddleware(appointmentsSchemas.create),
    appointmentsController.create
);

export default appointmentsRoutes;