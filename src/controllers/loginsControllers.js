import httpStatus from "http-status";

import doctorsServices from "../services/doctorsServices.js";
import patientsServices from "../services/patientsServices.js";

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
    signUp
}