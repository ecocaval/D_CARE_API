import dataBase from "../configs/dataBase.js";

async function selectByCpf(cpf) {
    return await dataBase.query(`
        SELECT * 
        FROM patients
        WHERE cpf = $1; 
    `, [cpf]);
}

async function create({ cpf, loginId }) {
    return await dataBase.query(`
        INSERT INTO patients (cpf, "loginId")
        VALUES ($1, $2);
    `, [cpf, loginId]);
}

export default {
    selectByCpf,
    create
}