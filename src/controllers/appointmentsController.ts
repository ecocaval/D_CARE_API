import {
    SelectAndCreateAppointmentType,
    SelectAllAppointmentsType,
    SelectDoctorAppointmentsType,
    SelectPatientAppointmentsType
} from "../protocols/appointments.js";

import {
    NextFunction,
    Request,
    Response
} from "express";

import httpStatus from "http-status";

import appointmentsServices from "../services/appointmentsServices.js";

type ResponseLocalsType = { 
    id: string 
};

async function selectAll(req: Request, res: Response, next: NextFunction) {
    const { doctorName, date, hour, status, specialityName } = req.query as SelectAllAppointmentsType;

    try {
        const appointments = await appointmentsServices.selectAll(
            { doctorName, date, hour, status, specialityName }
        );

        return res.status(httpStatus.OK).json({
            data: appointments
        });

    } catch (error) {
        next(error);
    }
}

async function selectPatientAppointments(req: Request, res: Response, next: NextFunction) {
    const { id: patientId } = res?.locals?.user as ResponseLocalsType;

    const { status } = req.query as SelectPatientAppointmentsType;

    try {
        const appointments = await appointmentsServices.selectPatientAppointments({ patientId, status });

        return res.status(httpStatus.OK).json({
            data: appointments
        });

    } catch (error) {
        next(error);
    }
}

async function selectDoctorAppointments(req: Request, res: Response, next: NextFunction) {
    const { id: doctorId } = res?.locals?.user as ResponseLocalsType;

    const { status } = req.query as SelectDoctorAppointmentsType;

    try {
        const appointments = await appointmentsServices.selectDoctorAppointments({ doctorId, status });
        
        return res.status(httpStatus.OK).json({
            data: appointments
        });

    } catch (error) {
        next(error);
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
    const { id: doctorId } = res?.locals?.user as ResponseLocalsType;

    const { date, hour } = req.body as SelectAndCreateAppointmentType;

    try {
        await appointmentsServices.create({ date, hour, doctorId });

        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

async function book(req: Request, res: Response, next: NextFunction) {
    const { id: patientId } = res?.locals?.user as ResponseLocalsType;

    const { appointmentId } = req?.params;

    try {
        await appointmentsServices.book({ patientId, appointmentId });

        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

async function confirm(req: Request, res: Response, next: NextFunction) {
    const { id: doctorId } = res?.locals.user as ResponseLocalsType;

    const { appointmentId } = req?.params;

    try {
        await appointmentsServices.confirm({ appointmentId, doctorId });

        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

async function cancel(req: Request, res: Response, next: NextFunction) {
    const { id: doctorId } = res?.locals?.user as ResponseLocalsType;

    const { appointmentId } = req?.params;

    try {
        await appointmentsServices.cancel({ appointmentId, doctorId });
        
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

export default {
    selectAll,
    selectPatientAppointments,
    selectDoctorAppointments,
    create,
    book,
    confirm,
    cancel
}