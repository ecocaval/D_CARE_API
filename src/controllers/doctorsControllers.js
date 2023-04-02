import httpStatus from "http-status";

import doctorsServices from "../services/doctorsServices.js";

async function selectAll(req, res, next) {
    try {
        const { name, specialityName } = req.query;

        const doctors = await doctorsServices.selectAll({ name, specialityName })

        return res.status(httpStatus.OK).json({ data: doctors });
    } catch (error) {
        next(error);
    }
}

export default {
    selectAll
}