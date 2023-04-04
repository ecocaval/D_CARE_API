import { QueryType } from "./query";

import { QueryResult } from "pg";

type DoctorType = {
    id: number;
    name: string;
    email: string;
    password: string;
    type: string;
    createdAt: string;
};

type DoctorWithLoginType = {
    name: string;
    email: string;
    type: string;
    specialityName: string;
    crm: string;
    crmOptionals: string | null;
};

export type DoctorsPromiseType = Promise<QueryResult<DoctorType>>;

export type DoctorsWithLoginPromiseType = Promise<QueryResult<DoctorWithLoginType>>;

export type SelectAllDoctorsType = {
    name?: QueryType;
    specialityName?: QueryType;
};

export type CreateDoctorType = {
    specialityName?: QueryType;
    crm?: QueryType;
    crmOptionals?: QueryType | null;
    loginId?: QueryType;
};