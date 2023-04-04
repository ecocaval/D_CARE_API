import { QueryType } from "./query";

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