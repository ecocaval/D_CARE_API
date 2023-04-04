import { QueryResult } from "pg";

type SpecialityType = {
    id: number;
    name: string;
};

export type SpecialitiesPromiseType = Promise<QueryResult<SpecialityType>>;