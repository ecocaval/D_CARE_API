import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import loginsRepositories from "../repositories/loginsRepositories.js";
import patientsRepositories from "../repositories/patientsRepositories.js";

import errors from "../errors/index.js";

async function signIn({ email, password, type }) {
    
    const { rowCount: patientExists, rows: [patient] } = await loginsRepositories.selectByEmail(email);
    if (!patientExists || (type !== patient.type)) throw new errors.unauthorizedError();

    const passwordIsCorrect = bcrypt.compareSync(password, patient.password);
    if(!passwordIsCorrect) throw new errors.unauthorizedError();

    const token = jwt.sign({ userId: patient.id, type }, process.env.JWT_PRIVATE_KEY, { expiresIn: 86400 });

    return token;
}

async function signUp({ name, email, password, type, cpf }) {

    const { rowCount: emailInUse } = await loginsRepositories.selectByEmail(email);
    if (!!emailInUse) throw new errors.duplicatedEmailError();

    const { rowCount: cpfInUse } = await patientsRepositories.selectByCpf(cpf);
    if (!!cpfInUse) throw new errors.duplicatedCpfError();

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