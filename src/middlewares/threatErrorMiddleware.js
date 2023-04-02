import httpStatus from 'http-status';

function threatErrorMiddleware(err, req, res, next) {
    if (err?.name === 'unauthorizedError' || err?.name === 'invalidLoginError') {
        return res.status(httpStatus.UNAUTHORIZED).send(err?.message);
    }

    if (['conflictError', 'duplicatedEmailError', 'duplicatedCrmError', 'duplicatedCpfError'].includes(err?.name)) {
        return res.status(httpStatus.CONFLICT).send(err?.message);
    }

    if (err?.name === 'unprocessableEntityError') {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err?.message);
    }

    if (err?.name === 'notFoundError') {
        return res.status(httpStatus.NOT_FOUND).send(err?.message);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
}

export default threatErrorMiddleware;