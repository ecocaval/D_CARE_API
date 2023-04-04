import dataBase from "../../configs/dataBase.js";

import { CreateType } from "./@types/index.js";

async function selectByLoginId(id: string) {
    return await dataBase.query(`
        SELECT * 
        FROM patients
        WHERE "loginId" = $1; 
    `, [id]);
}

async function selectByCpf(cpf: string) {
    return await dataBase.query(`
        SELECT * 
        FROM patients
        WHERE cpf = $1; 
    `, [cpf]);
}

async function create({ cpf, loginId }: CreateType) {
    return await dataBase.query(`
        INSERT INTO patients (cpf, "loginId")
        VALUES ($1, $2);
    `, [cpf, loginId]);
}

export default {
    selectByLoginId,
    selectByCpf,
    create
}