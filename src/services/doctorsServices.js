import bcrypt from 'bcrypt';

import loginsRepositories from "../repositories/loginsRepositories.js";
import doctorsRepositories from "../repositories/doctorsRepositories.js";
import specialitiesRepositories from "../repositories/specialitiesRepositories.js";

import errors from "../errors/index.js";

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
    signUp
}