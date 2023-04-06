import { NextFunction, Request, Response, Router } from "express";

import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

import appointmentsController from "../controllers/appointmentsController.js";
import doctorsControllers from "../controllers/doctorsControllers.js";

const patientsRoutes = Router();

patientsRoutes
    .use('/', (req: Request, res: Response, next: NextFunction) => {
        validateTokenMiddleware(req, res, next, 'patient')
    })
    
    .get('/:loginId/doctors', doctorsControllers.selectAll)

    .get('/:loginId/appointments', appointmentsController.selectAll)

    .get('/:loginId/appointments/my', appointmentsController.selectPatientAppointments)

    .put('/:loginId/appointments/:appointmentId/book', appointmentsController.book);

export default patientsRoutes;