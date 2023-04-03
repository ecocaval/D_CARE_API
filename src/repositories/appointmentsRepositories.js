import dataBase from "../configs/dataBase.js";

async function selectAll({ doctorName, date, hour, status }) {
    return await dataBase.query(`
        SELECT 
            a.*,    
            ( 
                SELECT name as "patientName"
                FROM patients
                WHERE id = a."patientId"
            ),
            l.name as "doctorName"
        FROM appointments a
        JOIN doctors d
            ON a."doctorId" = d.id
        JOIN logins l
            ON d."loginId" = l.id            
        WHERE 
            (l.name = $1 OR $1 IS NULL) AND 
            (a.date = $2 OR $2 IS NULL) AND
            (a.hour = $3 OR $3 IS NULL) AND
            (a.status = $4 OR $4 IS NULL)
        ORDER BY a.id DESC;
    `, [doctorName, date, hour, status]);
}

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
    selectAll,
    select,
    create
}