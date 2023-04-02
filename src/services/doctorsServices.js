import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import loginsRepositories from "../repositories/loginsRepositories.js";
import doctorsRepositories from "../repositories/doctorsRepositories.js";
import specialitiesRepositories from "../repositories/specialitiesRepositories.js";

import errors from "../errors/index.js";

async function selectAll({ name, specialityName }) {

    const { rows: [doctors] } = await doctorsRepositories.selectAll({ name, specialityName });

    return doctors;
}

async function signIn({ email, password, type }) {

    const { rowCount: doctorExists, rows: [doctor] } = await loginsRepositories.selectByEmail(email);
    if (!doctorExists || (type !== doctor.type)) throw new errors.unauthorizedError();

    const passwordIsCorrect = bcrypt.compareSync(password, doctor.password);
    if (!passwordIsCorrect) throw new errors.unauthorizedError();

    const token = jwt.sign({ userId: doctor.id, type }, process.env.JWT_PRIVATE_KEY, { expiresIn: 86400 });

    return token;
}

async function signUp({ name, email, password, type, specialityName, crm, crmOptionals }) {

    const { rowCount: emailInUse } = await loginsRepositories.selectByEmail(email);
    if (!!emailInUse) throw new errors.duplicatedEmailError();

    const { rowCount: crmInUse } = await doctorsRepositories.selectByCrm(crm);
    if (!!crmInUse) throw new errors.duplicatedCrmError();

    const { rows: [{ id: loginId }] } = await loginsRepositories.create({
        name, email, password: bcrypt.hashSync(password, 10), type
    });

    const { rowCount: specialityExists } = await specialitiesRepositories.selectByName(specialityName);

    if (!!specialityExists) {
        await doctorsRepositories.create({
            specialityName, crm, crmOptionals, loginId
        });
    } else {
        await specialitiesRepositories.create(specialityName);
        await doctorsRepositories.create({
            specialityName, crm, crmOptionals, loginId
        });
    }
    return;
}

export default {
    selectAll,
    signIn,
    signUp
}