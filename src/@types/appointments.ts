import { QueryType } from "./query";

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

export interface ConfirmAppointmentType extends SelectAppointmentByIdType { }
export interface CancelAppointmentType extends SelectAppointmentByIdType { }