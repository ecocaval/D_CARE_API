import { NextFunction, Request, Response, Router } from "express";

import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

import appointmentsController from "../controllers/appointmentsController.js";

import appointmentsSchemas from "../schemas/appointmentsSchemas.js";

const doctorsRoutes = Router();

doctorsRoutes
    .use('/:loginId', (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'doctor')
    })

    .get('/:loginId/appointments/my', appointmentsController.selectDoctorAppointments)

    .post('/:loginId/appointments', validateSchemaMiddleware(appointmentsSchemas.create), appointmentsController.create)

    .put('/:loginId/appointments/:appointmentId/confirm', appointmentsController.confirm)

    .put('/:loginId/appointments/:appointmentId/cancel', appointmentsController.cancel);

export default doctorsRoutes;