import joi from 'joi';

const signUp = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    type: joi.string().valid('doctor', 'patient').required(),
    crm: joi.when('type', {
        is: 'doctor',
        then: joi.string().required()
    }),
    specialityName: joi.when('type', {
        is: 'doctor',
        then: joi.string().required()
    }),
    crmOptionals: joi.string(),
    cpf: joi.when('type', {
        is: 'patient',
        then: joi.string().required()
    })
});

const signIn = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default { signUp, signIn }