import { QueryResult } from "pg";

import { DoctorWithLoginType } from "./doctors";

type LoginType = {
    id: number;
    name: string;
    email: string;
    password: string;
    type: 'patient' | 'doctor';
    createdAt: string;
};

export type LoginsPromiseType = Promise<QueryResult<LoginType>>;

export type SignInType = Pick<LoginType, "email" | "password" | "type">;

export type CreateLoginType = Omit<LoginType, "id" | "createdAt">;

export type SignUpDefault = SignInType & Partial<Omit<DoctorWithLoginType, "email" | "type">> & { cpf?: string };

export type SignUpPatientType = SignInType & Pick<DoctorWithLoginType, "name"> & { cpf: string };

export type SignUpDoctorType = SignInType & Omit<DoctorWithLoginType, "email" | "type" | "crmOptionals"> & { crmOptionals: string | null | undefined };
