import { ParsedQs } from 'qs';

export type QueryType = string | ParsedQs | string[] | ParsedQs[] | null | undefined ;

export type SelectAllType = {
    doctorName: QueryType;
    date: QueryType;
    hour: QueryType;
    status: QueryType;
    specialityName: QueryType;
};

export type SelectPatientAppointmentsType = {
    patientId: string;
    status: QueryType;
};

export type SelectDoctorAppointmentsType = {
    doctorId: string;
    status: QueryType;
};

export type AppointmentIdType = {
    appointmentId: string;
};

export type ConfirmType = {
    appointmentId: string;
    doctorId: string;
};

export type SelectType = {
    date: string;
    hour: string;
    doctorId: string;
};

export type BookType = {
    patientId: string;
    appointmentId: string;
};