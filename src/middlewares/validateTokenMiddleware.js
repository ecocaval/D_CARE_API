import jwt from "jsonwebtoken";

import errors from "../errors/index.js";

export async function validateTokenMiddleware(req, res, next) {

    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (!bearer || !token) {
        throw new errors.unauthorizedError();
    }

    try {
        const { userId } = jwt.verify(token, process.env.SECRET_JWT);
        const { rows: [user] } = await userRepositories.findById(userId);

        if (!user) {
            throw errors.unauthorizedError();
        }

        res.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
}