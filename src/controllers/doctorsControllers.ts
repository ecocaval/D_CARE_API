import { SelectAllDoctorsType } from "../@types/doctors.js";

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import doctorsServices from "../services/doctorsServices.js";

async function selectAll(req: Request, res: Response, next: NextFunction) {
    const { name, specialityName } = req.query as SelectAllDoctorsType;
    try {
        const doctors = await doctorsServices.selectAll({ name, specialityName })

        return res.status(httpStatus.OK).json({ data: doctors });
    } catch (error) {
        next(error);
    }
}

export default {
    selectAll
}