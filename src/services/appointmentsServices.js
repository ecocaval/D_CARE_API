import appointmentsRepositories from '../repositories/appointmentsRepositories.js';

import errors from '../errors/index.js';

async function selectAll({ doctorName, date, hour, status, specialityName }) {

    const { rows: appointments } = await appointmentsRepositories.selectAll({ doctorName, date, hour, status, specialityName });

    return appointments;
}

async function selectPatientAppointments({ patientId, status }) {

    const { rows: appointments } = await appointmentsRepositories.selectPatientAppointments({ patientId, status });

    return appointments;
}

async function selectDoctorAppointments({ doctorId, status }) {

    const { rows: appointments } = await appointmentsRepositories.selectDoctorAppointments({ doctorId, status });

    return appointments;
}

async function create({ date, hour, doctorId }) {

    const { rowCount: conflictInAppointment } = await appointmentsRepositories.select({ date, hour, doctorId });
    if (!!conflictInAppointment) throw new errors.duplicatedAppointmentError();

    await appointmentsRepositories.create({ date, hour, doctorId });
}

async function book({ patientId, appointmentId }) {

    const { rows: [appointment], rowCount } = await appointmentsRepositories.selectById(appointmentId)
    if (!rowCount) throw new errors.appointmentNotFoundError();
    if (!!appointment.patientId) throw new errors.bookedAppointmentError();

    await appointmentsRepositories.book({ patientId, appointmentId });
}

async function confirm({ appointmentId, doctorId }) {
    const { rows: [appointment], rowCount: appointmentExists } = await appointmentsRepositories.selectById(appointmentId)
    if (!appointmentExists) {
        throw new errors.appointmentNotFoundError();
    }
    if (appointment.status === 'confirmed') {
        throw new errors.confirmedAppointmentError();
    }
    if (appointment.status === 'canceled') {
        throw new errors.canceledAppointmentError();
    }
    if (appointment.status === 'free') {
        throw new errors.freeAppointmentError();
    }
    if (appointment.doctorId !== doctorId) {
        throw new errors.unauthorizedError();
    }
    await appointmentsRepositories.confirm({ appointmentId });
}

async function cancel({ appointmentId, doctorId }) {
    const { rows: [appointment], rowCount: appointmentExists } = await appointmentsRepositories.selectById(appointmentId)
    if (!appointmentExists) {
        throw new errors.appointmentNotFoundError();
    }
    if (appointment.status === 'canceled') {
        throw new errors.canceledAppointmentError();
    }
    if (appointment.doctorId !== doctorId) {
        throw new errors.unauthorizedError();
    }
    await appointmentsRepositories.cancel({ appointmentId });
}

export default {
    selectAll,
    selectPatientAppointments,
    selectDoctorAppointments,
    create,
    book,
    confirm,
    cancel
}