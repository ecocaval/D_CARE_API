import { QueryResult } from "pg";
import { QueryType } from "./query";

type AppointmentType = {
    id: number;
    doctorId: number;
    patientId: number | null;
    doctorName: string;
    date: string;
    hour: string;
    status: "free" | "booked" | "confirmed" | "canceled";
    specialityName: string;
}

export type AppointmentsPromiseType = Promise<QueryResult<AppointmentType>>;

export type SelectAllAppointmentsType = Partial<Record<keyof Omit<AppointmentType, "id" | "doctorId" | "patientId">, QueryType>>;

export type SelectPatientAppointmentsType = Pick<SelectAllAppointmentsType, "status"> & { patientId: string; };

export type SelectDoctorAppointmentsType = Pick<SelectAllAppointmentsType, "status"> & { doctorId: string; };

export type SelectAndCreateAppointmentType = Pick<AppointmentType, "date" | "hour"> & { doctorId: string; };

export type SelectAppointmentByIdType = { appointmentId: string; };

export type BookAppointmentType = SelectAppointmentByIdType & { patientId: string; };

export type ConfirmAndCancelAppointmentType = SelectAppointmentByIdType & { doctorId: string; };

