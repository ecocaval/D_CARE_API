import dataBase from "../configs/dataBase.js";

async function selectByName(specialityName: string) {
    return dataBase.query(`
        SELECT *
        FROM specialities
        WHERE name = $1;
    `, [specialityName]);
}

async function create(specialityName: string) {
    return dataBase.query(`
        INSERT INTO specialities (name)
        VALUES ($1);
    `, [specialityName]);
}

export default {
    selectByName,
    create
}