import { NextFunction, Request, Response, Router } from "express";

import appointmentsController from "../controllers/appointmentsController.js";

import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

import appointmentsSchemas from "../schemas/appointmentsSchemas.js";

const appointmentsRoutes = Router();

appointmentsRoutes.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'patient')
    },
    appointmentsController.selectAll
);

appointmentsRoutes.get(
    '/patient',
    (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'patient')
    },
    appointmentsController.selectPatientAppointments
);

appointmentsRoutes.get(
    '/doctor',
    (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    },
    appointmentsController.selectDoctorAppointments
);

appointmentsRoutes.post(
    '/',
    (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    },
    validateSchemaMiddleware(appointmentsSchemas.create),
    appointmentsController.create
);

appointmentsRoutes.put(
    '/:appointmentId/book',
    (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'patient')
    },
    appointmentsController.book
);

appointmentsRoutes.put(
    '/:appointmentId/confirm',
    (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    },
    appointmentsController.confirm
);

appointmentsRoutes.put(
    '/:appointmentId/cancel',
    (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    },
    appointmentsController.cancel
);

export default appointmentsRoutes;