export type CreateType = {
    name: string;
    email: string;
    password: string;
    type: 'patient' | 'doctor';
};