import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import doctorsRepositories from "../repositories/doctorsRepositories.js";
import patientsRepositories from "../repositories/patientsRepositories.js";

import errors from "../errors/index.js";

async function validateTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
    optionalTypeRestriction: 'doctor' | 'patient' | null | undefined
) {

    const { authorization } = req.headers;

    try {
        if (!authorization) {
            throw errors.unauthorizedError();
        }

        const [bearer, token] = authorization.split(' ');

        if (!bearer || (bearer !== 'Bearer') || !token) {
            throw errors.unauthorizedError();
        }

        const { userId: id, type } = jwt.verify(
            token,
            process.env.JWT_PRIVATE_KEY as jwt.Secret | jwt.GetPublicKeyOrSecret
        ) as unknown as jwt.JwtPayload;

        if (optionalTypeRestriction && (optionalTypeRestriction !== type)) {
            throw errors.unauthorizedError();
        }

        const { rows: [user] } = (type === 'doctor'
            ? await doctorsRepositories.selectByLoginId(String(id))
            : await patientsRepositories.selectByLoginId(String(id))
        )
        if (!user) {
            throw errors.unauthorizedError();
        }

        res.locals.user = user;

        next();
    } catch (error) {
        next(errors.unauthorizedError());
    }
}

export default validateTokenMiddleware;