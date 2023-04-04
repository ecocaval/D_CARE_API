import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";

import doctorsServices from "../services/doctorsServices.js";
import patientsServices from "../services/patientsServices.js";

async function signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password, type } = req.body;
    let token;
    try {
        if (type === 'doctor') {
            token = await doctorsServices.signIn({
                email, password, type
            });
        }

        if (type === 'patient') {
            token = await patientsServices.signIn({
                email, password, type
            });
        }

        return res.status(httpStatus.OK).json({ data: token });
    } catch (error) {
        
        next(error);
    }
}

async function signUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, type, specialityName, crm, crmOptionals, cpf } = req.body;
    try {
        if (type === 'doctor')
            await doctorsServices.signUp({
                name, email, password, type, specialityName, crm, crmOptionals
            });

        if (type === 'patient')
            await patientsServices.signUp({
                name, email, password, type, cpf
            });

        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        
        next(error);
    }
}

export default {
    signIn,
    signUp
}