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

appointmentsRoutes.get(
    '/patient',
    (req, res, next) => {
        validateTokenMiddleware(req, res, next, 'patient')
    },
    appointmentsController.selectPatientAppointments
);

appointmentsRoutes.get(
    '/doctor',
    (req, res, next) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    },
    appointmentsController.selectDoctorAppointments
);

appointmentsRoutes.post(
    '/',
    (req, res, next) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    },
    validateSchemaMiddleware(appointmentsSchemas.create),
    appointmentsController.create
);

appointmentsRoutes.put(
    '/:appointmentId/book',
    (req, res, next) => {
        validateTokenMiddleware(req, res, next, 'patient')
    },
    appointmentsController.book
);

appointmentsRoutes.put(
    '/:appointmentId/confirm',
    (req, res, next) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    },
    appointmentsController.confirm
);

export default appointmentsRoutes;