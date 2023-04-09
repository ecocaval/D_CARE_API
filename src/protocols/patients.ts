import { QueryResult } from "pg";

type PatientType = {
    id: number;
    cpf: string;
    loginId: number;
};

export type PatientsPromiseType = Promise<QueryResult<PatientType>>;

export type CreatePatientType = {
    cpf: string, 
    loginId: string
}