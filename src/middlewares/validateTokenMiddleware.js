import jwt from "jsonwebtoken";

import doctorsRepositories from "../repositories/doctorsRepositories.js";
import patientsRepositories from "../repositories/patientsRepositories.js";

import errors from "../errors/index.js";

async function validateTokenMiddleware(req, res, next) {

    const { authorization } = req.headers;
    if (!authorization) {
        throw new errors.unauthorizedError();
    }

    const [bearer, token] = authorization.split(' ');

    if (!bearer || (bearer !== 'Bearer') || !token) {
        throw new errors.unauthorizedError();
    }

    try {
        const { userId: id, type } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        const { rows: [user] } = (type === 'doctor'
            ? await doctorsRepositories.selectByLoginId(id)
            : await patientsRepositories.selectByLoginId(id)
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