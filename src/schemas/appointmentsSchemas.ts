import joi from 'joi';

const create = joi.object({
    date: joi.string().required(),
    hour: joi.string().required(),
});

export default { create }