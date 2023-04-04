export type SignInType = {
    email: string,
    password: string,
    type: 'patient' | 'doctor'
}

export interface CreateLoginType extends SignInType {
    name: string
}

export interface SignUpDefault extends SignInType {
    name?: string,
    specialityName?: string,
    crm?: string, 
    crmOptionals?: string | null | undefined,
    cpf?: string,
}

export interface SignUpPatientType extends SignInType {
    name: string,
    cpf: string,
}

export interface SignUpDoctorType extends SignInType {
    name: string,
    specialityName: string,
    crm: string, 
    crmOptionals: string | null | undefined,
}