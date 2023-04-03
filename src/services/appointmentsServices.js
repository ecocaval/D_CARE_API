import appointmentsRepositories from '../repositories/appointmentsRepositories.js';

import errors from '../errors/index.js';

async function create({ date, hour, doctorId }) {

    const { rowCount: conflictInAppointment } = await appointmentsRepositories.select({ date, hour, doctorId })
    if(!!conflictInAppointment) throw new errors.duplicatedAppointmentError();

    await appointmentsRepositories.create({ date, hour, doctorId })
}

export default {
    create
}