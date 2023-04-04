import {
    BookAppointmentType,
    CancelAppointmentType,
    ConfirmAppointmentType,
    CreateAppointmentType,
    SelectAllAppointmentsType,
    SelectAppointmentByIdType,
    SelectAppointmentType,
    SelectDoctorAppointmentsType,
    SelectPatientAppointmentsType
} from "../@types/appointments.js";

import dataBase from "../configs/dataBase.js";

async function selectAll(
    { doctorName, date, hour, status, specialityName }: SelectAllAppointmentsType
) {
    return await dataBase.query(`
        SELECT 
            a.*,    
            l.name as "doctorName",
            d."specialityName" as speciality
        FROM appointments a
        JOIN doctors d
            ON a."doctorId" = d.id
        JOIN logins l
            ON d."loginId" = l.id            
        WHERE 
            status = 'free' AND
            (l.name = $1 OR $1 IS NULL) AND 
            (a.date = $2 OR $2 IS NULL) AND
            (a.hour = $3 OR $3 IS NULL) AND
            (a.status = $4 OR $4 IS NULL) AND
            (d."specialityName" = $5 OR $5 IS NULL) 
        ORDER BY a.id DESC;
    `, [doctorName, date, hour, status, specialityName]);
}

async function selectPatientAppointments(
    { patientId, status }: SelectPatientAppointmentsType
) {
    return await dataBase.query(`
        SELECT 
            a.*,    
            l.name as "doctorName",
            d."specialityName" as speciality
        FROM appointments a
        JOIN doctors d
            ON a."doctorId" = d.id
        JOIN logins l
            ON d."loginId" = l.id            
        WHERE 
            a."patientId" = $1 AND
            (status = $2 OR $2 IS NULL)
        ORDER BY a.id DESC;
    `, [patientId, status]);
}

async function selectDoctorAppointments(
    { doctorId, status }: SelectDoctorAppointmentsType
) {
    return await dataBase.query(`
        SELECT 
            a.*,    
            l.name as "doctorName",
            d."specialityName" as speciality
        FROM appointments a
        JOIN doctors d
            ON a."doctorId" = d.id
        JOIN logins l
            ON d."loginId" = l.id            
        WHERE 
            a."doctorId" = $1 AND
            (status = $2 OR $2 IS NULL)
        ORDER BY a.id DESC;
    `, [doctorId, status]);
}

async function select(
    { date, hour, doctorId }: SelectAppointmentType
) {
    return await dataBase.query(`
        SELECT *
        FROM appointments 
        WHERE date = $1 AND hour = $2 AND "doctorId" = $3 AND status <> 'canceled';
    `, [date, hour, doctorId]);
}

async function selectById(
    { appointmentId }: SelectAppointmentByIdType
) {
    return await dataBase.query(`
        SELECT *
        FROM appointments 
        WHERE id = $1;
    `, [appointmentId]);
}

async function create(
    { date, hour, doctorId }: CreateAppointmentType
) {
    return await dataBase.query(`
        INSERT INTO appointments (date, hour, "doctorId")
        VALUES ($1, $2, $3);
    `, [date, hour, doctorId]);
}

async function book(
    { patientId, appointmentId }: BookAppointmentType
) {
    return await dataBase.query(`
        UPDATE appointments
        SET "patientId" = $1, status = 'booked'
        WHERE id = $2;
`, [patientId, appointmentId]);
}

async function confirm(
    { appointmentId }: ConfirmAppointmentType
) {
    return await dataBase.query(`
        UPDATE appointments
        SET status = 'confirmed'
        WHERE id = $1;
`, [appointmentId]);
}

async function cancel(
    { appointmentId }: CancelAppointmentType
) {
    return await dataBase.query(`
        UPDATE appointments
        SET status = 'canceled'
        WHERE id = $1;
`, [appointmentId]);
}

export default {
    selectAll,
    selectPatientAppointments,
    selectDoctorAppointments,
    select,
    selectById,
    create,
    book,
    confirm,
    cancel
}