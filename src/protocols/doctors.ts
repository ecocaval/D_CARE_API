import { QueryType } from "./query";

import { QueryResult } from "pg";

type DoctorType = {
    id: number;
    specialityName: string;
    crm: string;
    crmOptionals: string | null;
    createdAt: string;
    loginId: number;
};

export type DoctorWithLoginType = {
    name: string;
    email: string;
    type: string;
    specialityName: string;
    crm: string;
    crmOptionals: string | null;
};

export type DoctorsPromiseType = Promise<QueryResult<DoctorType>>;

export type DoctorsWithLoginPromiseType = Promise<QueryResult<DoctorWithLoginType>>;

export type SelectAllDoctorsType = Partial<Record<keyof Pick<DoctorWithLoginType, "name" | "specialityName">, QueryType>>;

export type CreateDoctorType = Partial<Record<keyof Omit<DoctorType, "id" | "createdAt" | "crmOptionals">, QueryType>> & {
    crmOptionals: string | null | undefined;
};