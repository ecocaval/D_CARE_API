import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";

import appointmentsServices from "../services/appointmentsServices.js";

async function selectAll(req: Request, res: Response, next: NextFunction) {
    const { doctorName, date, hour, status, specialityName } = req.query
    try {
        const appointments = await appointmentsServices.selectAll(
            { doctorName, date, hour, status, specialityName }
        )

        return res.status(httpStatus.OK).json({
            data: appointments
        })
    } catch (error) {

        next(error);
    }
}

async function selectPatientAppointments(req: Request, res: Response, next: NextFunction) {
    const { id: patientId } = res?.locals?.user
    const { status } = req.query
    try {
        const appointments = await appointmentsServices.selectPatientAppointments({ patientId, status })

        return res.status(httpStatus.OK).json({
            data: appointments
        })
    } catch (error) {

        next(error);
    }
}

async function selectDoctorAppointments(req: Request, res: Response, next: NextFunction) {
    const { id: doctorId } = res?.locals?.user
    const { status } = req.query
    try {
        const appointments = await appointmentsServices.selectDoctorAppointments({ doctorId, status })

        return res.status(httpStatus.OK).json({
            data: appointments
        })
    } catch (error) {

        next(error);
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
    const { date, hour } = req.body;
    const { id: doctorId } = res?.locals?.user
    try {
        await appointmentsServices.create({ date, hour, doctorId })

        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {

        next(error);
    }
}

async function book(req: Request, res: Response, next: NextFunction) {
    const { id: patientId } = res?.locals?.user
    const { appointmentId } = req?.params
    try {
        await appointmentsServices.book({ patientId, appointmentId })

        return res.sendStatus(httpStatus.OK);
    } catch (error) {

        next(error);
    }
}

async function confirm(req: Request, res: Response, next: NextFunction) {
    const { appointmentId } = req?.params
    const { id: doctorId } = res?.locals?.user
    try {
        await appointmentsServices.confirm({ appointmentId, doctorId })

        return res.sendStatus(httpStatus.OK);
    } catch (error) {

        next(error);
    }
}

async function cancel(req: Request, res: Response, next: NextFunction) {
    const { appointmentId } = req?.params
    const { id: doctorId } = res?.locals?.user
    try {
        await appointmentsServices.cancel({ appointmentId, doctorId })

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