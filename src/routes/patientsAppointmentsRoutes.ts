import { NextFunction, Request, Response, Router } from "express";

import appointmentsController from "../controllers/appointmentsController.js";

import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const patientsAppointmentsRoutes = Router();

patientsAppointmentsRoutes
    .use('/patient', (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'patient')
    })

    .get('/patient/all', appointmentsController.selectAll)

    .get('/patient/my', appointmentsController.selectPatientAppointments)

    .put('/patient/:appointmentId/book', appointmentsController.book);

export default patientsAppointmentsRoutes;