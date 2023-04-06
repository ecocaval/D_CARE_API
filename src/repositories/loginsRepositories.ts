import { CreateLoginType, LoginsPromiseType } from "../@types/logins.js";

import dataBase from "../configs/dataBase.js";

async function selectByEmail(email: string) {

    return dataBase.query(`
        SELECT * 
        FROM logins
        WHERE email = $1; 
    `, [email]) as LoginsPromiseType;
}

async function create({ name, email, password, type }: CreateLoginType) {
    
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