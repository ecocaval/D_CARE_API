import httpStatus from "http-status";

import doctorsServices from "../services/doctorsServices.js";
import patientsServices from "../services/patientsServices.js";

async function signIn(req, res, next) {
    try {
        const { email, password, type } = req.body;

        let token;

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

async function signUp(req, res, next) {
    try {
        const { name, email, password, type, specialityName, crm, crmOptionals, cpf } = req.body;

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