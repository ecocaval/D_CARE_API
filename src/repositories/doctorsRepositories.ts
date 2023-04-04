import { CreateDoctorType, DoctorsPromiseType, DoctorsWithLoginPromiseType, SelectAllDoctorsType } from "../@types/doctors";

import dataBase from "../configs/dataBase.js";

async function selectAll(
    { name, specialityName }: SelectAllDoctorsType
) {
    return dataBase.query(`
        SELECT 
            l.name, l.email, l.type,  
            d."specialityName", d.crm, d."crmOptionals" 
        FROM doctors d
        JOIN logins l
            ON d."loginId" = l.id
        WHERE 
            (l.name = $1 OR $1 IS NULL) AND 
            (d."specialityName" = $2 OR $2 IS NULL)
        ORDER BY d.id DESC;
    `, [name, specialityName]) as DoctorsWithLoginPromiseType;
}



async function selectByLoginId(id: string) {
    return dataBase.query(`
        SELECT * 
        FROM doctors
        WHERE "loginId" = $1; 
    `, [id]) as DoctorsPromiseType;
}

async function selectByCrm(crm: string) {
    return dataBase.query(`
        SELECT * 
        FROM doctors
        WHERE crm = $1; 
    `, [crm]) as DoctorsPromiseType;
}

async function create(
    { specialityName, crm, crmOptionals, loginId }: CreateDoctorType
) {
    return dataBase.query(`
        INSERT INTO doctors ("specialityName", crm, "crmOptionals", "loginId")
        VALUES ($1, $2, $3, $4);
    `, [specialityName, crm, crmOptionals, loginId]);
}

export default {
    selectAll,
    selectByLoginId,
    selectByCrm,
    create
}