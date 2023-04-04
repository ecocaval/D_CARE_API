import {
    BookType,
    ConfirmType,
    SelectAllType,
    SelectDoctorAppointmentsType,
    SelectPatientAppointmentsType,
    SelectAppointmentsType
} from '../repositories/appointmentsRepositories/@types/index.js';

import appointmentsRepositories from '../repositories/appointmentsRepositories.js';

import errors from '../errors/index.js';

async function selectAll({ doctorName, date, hour, status, specialityName }: SelectAllType) {

    const { rows: appointments } = await appointmentsRepositories.selectAll({ doctorName, date, hour, status, specialityName });

    return appointments;
}

async function selectPatientAppointments({ patientId, status }: SelectPatientAppointmentsType) {

    const { rows: appointments } = await appointmentsRepositories.selectPatientAppointments({ patientId, status });

    return appointments;
}

async function selectDoctorAppointments({ doctorId, status }: SelectDoctorAppointmentsType) {

    const { rows: appointments } = await appointmentsRepositories.selectDoctorAppointments({ doctorId, status });

    return appointments;
}

async function create({ date, hour, doctorId }: SelectAppointmentsType) {

    const { rowCount: conflictInAppointment } = await appointmentsRepositories.select({ date, hour, doctorId });
    if (!!conflictInAppointment) throw errors.duplicatedAppointmentError();

    await appointmentsRepositories.create({ date, hour, doctorId });
}

async function book({ patientId, appointmentId }: BookType) {

    const {
        rows: [appointment],
        rowCount
    } = await appointmentsRepositories.selectById({ appointmentId });

    if (!rowCount) throw errors.appointmentNotFoundError();
    if (!!appointment.patientId) throw errors.bookedAppointmentError();

    await appointmentsRepositories.book({ patientId, appointmentId });
}

async function confirm({ appointmentId, doctorId }: ConfirmType) {
    const {
        rows: [appointment],
        rowCount: appointmentExists
    } = await appointmentsRepositories.selectById({ appointmentId });

    if (!appointmentExists) {
        throw errors.appointmentNotFoundError();
    };
    if (appointment.status === 'confirmed') {
        throw errors.confirmedAppointmentError();
    };
    if (appointment.status === 'canceled') {
        throw errors.canceledAppointmentError();
    };
    if (appointment.status === 'free') {
        throw errors.freeAppointmentError();
    };
    if (appointment.doctorId !== doctorId) {
        throw errors.unauthorizedError();
    };
    await appointmentsRepositories.confirm({ appointmentId });
}

async function cancel({ appointmentId, doctorId }: ConfirmType) {
    const {
        rows: [appointment],
        rowCount: appointmentExists
    } = await appointmentsRepositories.selectById({ appointmentId });

    if (!appointmentExists) {
        throw errors.appointmentNotFoundError();
    };
    if (appointment.status === 'canceled') {
        throw errors.canceledAppointmentError();
    };
    if (appointment.doctorId !== doctorId) {
        throw errors.unauthorizedError();
    };
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