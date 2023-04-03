import appointmentsRepositories from '../repositories/appointmentsRepositories.js';

import errors from '../errors/index.js';

async function selectAll({ doctorName, date, hour, status }) {

    const { rows: appointments } = await appointmentsRepositories.selectAll({ doctorName, date, hour, status })

    return appointments
}

async function create({ date, hour, doctorId }) {

    const { rowCount: conflictInAppointment } = await appointmentsRepositories.select({ date, hour, doctorId })
    if (!!conflictInAppointment) throw new errors.duplicatedAppointmentError();

    await appointmentsRepositories.create({ date, hour, doctorId })
}

export default {
    selectAll,
    create
}