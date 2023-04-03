import jwt from "jsonwebtoken";

import doctorsRepositories from "../repositories/doctorsRepositories.js";
import patientsRepositories from "../repositories/patientsRepositories.js";

import errors from "../errors/index.js";

async function validateTokenMiddleware(req, res, next, optionalTypeRestricion) {

    const { authorization } = req.headers;

    try {
        if (!authorization) {
            throw new errors.unauthorizedError();
        }

        const [bearer, token] = authorization.split(' ');

        if (!bearer || (bearer !== 'Bearer') || !token) {
            throw new errors.unauthorizedError();
        }

        const { userId: id, type } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        if (optionalTypeRestricion && (optionalTypeRestricion !== type)) {
            throw new errors.unauthorizedError();
        }

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
        next(errors.unauthorizedError());
    }
}

export default validateTokenMiddleware;