import { SignInType, SignUpPatientType } from './@types/index.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import loginsRepositories from "../repositories/loginsRepositories/index.js";
import patientsRepositories from "../repositories/patientsRepositories/index.js";

import errors from "../errors/index.js";

async function signIn({ email, password, type }: SignInType) {

    const { rowCount: patientExists, rows: [patient] } = await loginsRepositories.selectByEmail(email);
    if (!patientExists || (type !== patient.type)) throw errors.unauthorizedError();

    const passwordIsCorrect = bcrypt.compareSync(password, patient.password);
    if (!passwordIsCorrect) throw errors.unauthorizedError();

    const token = jwt.sign(
        { userId: patient.id, type },
        String(process.env.JWT_PRIVATE_KEY),
        { expiresIn: 86400 }
    );

    return token;
}

async function signUp({ name, email, password, type, cpf }: SignUpPatientType) {

    const { rowCount: emailInUse } = await loginsRepositories.selectByEmail(email);
    if (!!emailInUse) throw errors.duplicatedEmailError();

    const { rowCount: cpfInUse } = await patientsRepositories.selectByCpf(cpf);
    if (!!cpfInUse) throw errors.duplicatedCpfError();

    const { rows: [{ id: loginId }] } = await loginsRepositories.create({
        name, email, password: bcrypt.hashSync(password, 10), type
    });

    await patientsRepositories.create({
        cpf, loginId
    });

    return;
}

export default {
    signIn,
    signUp
}