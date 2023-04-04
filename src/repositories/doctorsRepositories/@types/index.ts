import { QueryType } from "../../appointmentsRepositories/@types";

export type SelectAllType = {
    name: QueryType;
    specialityName: QueryType;
};

export type CreateType = {
    specialityName: QueryType;
    crm: QueryType;
    crmOptionals: QueryType;
    loginId: QueryType;
};
