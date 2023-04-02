import loginsRepositories from "../repositories/loginsRepositories.js";
import patientsRepositories from "../repositories/patientsRepositories.js";

import errors from "../errors/index.js";

async function signUp({ name, email, password, type, cpf }) {

    const { rowCount: emailInUse } = await loginsRepositories.selectByEmail(email);
    if (!!emailInUse) throw new errors.duplicatedEmailError();

    const { rowCount: cpfInUse } = await patientsRepositories.selectByCpf(cpf);
    if (!!cpfInUse) throw new errors.duplicatedCpfError();

    const { rows: [{ id: loginId }] } = await loginsRepositories.create({
        name, email, password, type
    });

    await patientsRepositories.create({
        cpf, loginId
    });

    return;
}

export default {
    signUp
}