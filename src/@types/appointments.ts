import { QueryType } from "./query";

export type AppointmentType = {
    id: number;
    date: string;
    doctorId: number;
    patientId: number | null;
    hour: string;
    status: "free" | "booked" | "confirmed" | "canceled";
    doctorName: string;
    speciality: string;
}

export type SelectAllAppointmentsType = {
    doctorName?: QueryType;
    date?: QueryType;
    hour?: QueryType;
    status?: QueryType;
    specialityName?: QueryType;
};

export type SelectPatientAppointmentsType = {
    patientId: string;
    status?: QueryType;
};

export type SelectDoctorAppointmentsType = {
    doctorId: string;
    status?: QueryType;
};

export type CreateAppointmentType = {
    date: string;
    hour: string;
    doctorId: string;
};

export type BookAppointmentType = {
    patientId: string;
    appointmentId: string;
};

export type SelectAppointmentByIdType = {
    appointmentId: string
}

export interface SelectAppointmentType extends CreateAppointmentType { }

export interface ConfirmAppointmentType extends SelectAppointmentByIdType {
    doctorId: string;
}

export interface CancelAppointmentType extends ConfirmAppointmentType { }