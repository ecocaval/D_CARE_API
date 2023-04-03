import appointmentsRepositories from '../repositories/appointmentsRepositories.js';

import errors from '../errors/index.js';

async function selectAll({ doctorName, date, hour, status, specialityName }) {

    const { rows: appointments } = await appointmentsRepositories.selectAll({ doctorName, date, hour, status, specialityName })

    return appointments
}

async function create({ date, hour, doctorId }) {

    const { rowCount: conflictInAppointment } = await appointmentsRepositories.select({ date, hour, doctorId })
    if (!!conflictInAppointment) throw new errors.duplicatedAppointmentError();

    await appointmentsRepositories.create({ date, hour, doctorId })
}

async function book({ patientId, appointmentId }) {

    const { rows: [appointment], rowCount } = await appointmentsRepositories.selectById(appointmentId)
    if(!rowCount) throw new errors.appointmentNotFoundError();
    if (!!appointment.patientId) throw new errors.bookedAppointmentError();

    await appointmentsRepositories.book({ patientId, appointmentId })
}

export default {
    selectAll,
    create,
    book
}