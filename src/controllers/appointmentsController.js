import httpStatus from "http-status";

import appointmentsServices from "../services/appointmentsServices.js";

async function selectAll(req, res, next) {
    try {
        const { doctorName, date, hour, status, specialityName } = req.query

        const appointments = await appointmentsServices.selectAll({ doctorName, date, hour, status, specialityName })

        return res.status(httpStatus.OK).json({
            data: appointments
        })
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const { date, hour } = req.body;
        const { id: doctorId } = res?.locals?.user

        await appointmentsServices.create({ date, hour, doctorId })

        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

export default {
    selectAll,
    create
}