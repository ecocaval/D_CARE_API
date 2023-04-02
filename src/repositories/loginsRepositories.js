import dataBase from "../configs/dataBase.js";

async function selectByEmail(email) {
    return dataBase.query(`
        SELECT email 
        FROM logins
        WHERE email = $1; 
    `, [email]);
}

async function create({ name, email, password, type }) {
    return dataBase.query(`
        INSERT INTO logins (name, email, password, type)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `, [name, email, password, type]);
}

export default {
    selectByEmail,
    create
}