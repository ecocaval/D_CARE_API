import { SignInType, SignUpDefault, SignUpDoctorType, SignUpPatientType } from "../protocols/logins.js";

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import doctorsServices from "../services/doctorsServices.js";
import patientsServices from "../services/patientsServices.js";

async function signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password, type } = req.body as SignInType;

    let token: string | undefined;

    try {
        if (type === 'doctor')
            token = await doctorsServices.signIn({ email, password, type });

        if (type === 'patient')
            token = await patientsServices.signIn({ email, password, type });

        return res.status(httpStatus.OK).json({
            data: token
        });

    } catch (error) {
        next(error);
    }
}

async function signUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, type, specialityName, crm, crmOptionals, cpf } = req.body as SignUpDefault;
    
    try {
        if (type === 'doctor')
            await doctorsServices.signUp(
                { name, email, password, type, specialityName, crm, crmOptionals } as SignUpDoctorType
            );

        if (type === 'patient')
            await patientsServices.signUp(
                { name, email, password, type, cpf } as SignUpPatientType
            );

        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

export default {
    signIn,
    signUp
}