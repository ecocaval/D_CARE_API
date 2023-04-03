import httpStatus from "http-status";

import appointmentsServices from "../services/appointmentsServices.js";

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
    create
}