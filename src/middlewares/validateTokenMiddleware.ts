import jwt, { GetPublicKeyOrSecret, Jwt, Secret } from "jsonwebtoken";

import doctorsRepositories from "../repositories/doctorsRepositories/index.js";
import patientsRepositories from "../repositories/patientsRepositories/index.js";

import errors from "../errors/index.js";
import { NextFunction, Request, Response } from "express";

interface newJwt extends Jwt {
    userId: String,
    type: 'doctor' | 'patient'
}

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
            process.env.JWT_PRIVATE_KEY as Secret | GetPublicKeyOrSecret
        ) as unknown as newJwt;

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
        next(error);
    }
}

export default validateTokenMiddleware;