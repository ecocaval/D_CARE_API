import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import err from "../errors/index.js";

function validateSchemaMiddleware(schema: ObjectSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            
            throw err.unprocessableEntityError(errors.join(', ').replaceAll('\"', ''));
        }

        next();
    };
}

export default validateSchemaMiddleware;
