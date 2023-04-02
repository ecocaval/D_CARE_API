import dataBase from "../configs/dataBase.js";

async function selectByCrm(crm) {
    return dataBase.query(`
        SELECT crm 
        FROM doctors
        WHERE crm = $1; 
    `, [crm]);
}

async function create({ specialityName, crm, crmOptionals, loginId }) {
    return dataBase.query(`
        INSERT INTO doctors ("specialityName", crm, "crmOptionals", "loginId")
        VALUES ($1, $2, $3, $4);
    `, [specialityName, crm, crmOptionals, loginId]);
}

export default {
    selectByCrm,
    create
}