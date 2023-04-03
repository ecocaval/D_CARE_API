import dataBase from "../configs/dataBase.js";

async function select({ date, hour, doctorId }) {
    return await dataBase.query(`
        SELECT *
        FROM appointments 
        WHERE date = $1 AND hour = $2 AND "doctorId" = $3;
    `, [date, hour, doctorId]);
}

async function create({ date, hour, doctorId }) {
    return await dataBase.query(`
        INSERT INTO appointments (date, hour, "doctorId")
        VALUES ($1, $2, $3);
    `, [date, hour, doctorId]);
}

export default {
    select,
    create
}