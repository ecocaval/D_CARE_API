import { NextFunction, Request, Response, Router } from "express";

import appointmentsController from "../controllers/appointmentsController.js";

import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

import appointmentsSchemas from "../schemas/appointmentsSchemas.js";

const doctorsAppointmentsRoutes = Router();

doctorsAppointmentsRoutes
    .use('/doctor', (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    })

    .get('/doctor/all', appointmentsController.selectDoctorAppointments)

    .post('/doctor/new', validateSchemaMiddleware(appointmentsSchemas.create), appointmentsController.create)

    .put('/doctor/:appointmentId/confirm', appointmentsController.confirm)

    .put('/doctor/:appointmentId/cancel', appointmentsController.cancel);

export default doctorsAppointmentsRoutes;