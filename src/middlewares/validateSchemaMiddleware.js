import err from "../errors/index.js";

function validateSchemaMiddleware(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            throw err.unprocessableEntityError(errors.join(', ').replaceAll('\"', ''));
        }
        next();
    };
}

export default validateSchemaMiddleware;
