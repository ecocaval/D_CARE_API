import { Request, Response } from 'express';

import httpStatus from 'http-status';

function threatErrorMiddleware(err: Error, req: Request, res: Response) {

    const conflictErrors = [
        'conflictError',
        'duplicatedEmailError',
        'duplicatedCrmError',
        'duplicatedCpfError',
        'duplicatedAppointmentError',
        'bookedAppointmentError',
        'confirmedAppointmentError',
        'canceledAppointmentError',
        'freeAppointmentError'
    ];

    if (err?.name === 'unauthorizedError' || err?.name === 'invalidLoginError') {
        return res.status(httpStatus.UNAUTHORIZED).json({
            data: err?.message
        });
    }

    if (conflictErrors.includes(err?.name)) {
        return res.status(httpStatus.CONFLICT).json({
            data: err?.message
        });
    }

    if (err?.name === 'unprocessableEntityError') {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
            data: err?.message
        });
    }

    if (err?.name === 'notFoundError' || err?.name === 'appointmentNotFoundError') {
        return res.status(httpStatus.NOT_FOUND).json({
            data: err?.message
        });
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
}

export default threatErrorMiddleware;