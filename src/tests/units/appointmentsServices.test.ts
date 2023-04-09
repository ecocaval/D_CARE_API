import { BookAppointmentType, ConfirmAndCancelAppointmentType, SelectAndCreateAppointmentType } from "../../protocols/appointments";

import { jest } from "@jest/globals";

import errors from "../../errors";

import appointmentsServices from "../../services/appointmentsServices";

import appointmentsRepositories from "../../repositories/appointmentsRepositories";

import spyOnPromiseMock from "../mocks/spyOnPromise";

const createAppointment: SelectAndCreateAppointmentType = {
    date: "2023-04-02",
    hour: "13:20:00Z",
    doctorId: '1'
}

const bookAppointment: BookAppointmentType = {
    appointmentId: '1',
    patientId: '1'
}

const confirmAppointment: ConfirmAndCancelAppointmentType = {
    appointmentId: '1',
    doctorId: '1'
}

describe('appointments unit tests', () => {

    it('#1 should create appointment', async () => {

        spyOnPromiseMock(appointmentsRepositories, "select", { rowCount: 0 });

        spyOnPromiseMock(appointmentsRepositories, "create", { rowCount: 1 });

        expect(await appointmentsServices.create(createAppointment)).toBeTruthy();
    });

    it('#2 should acuse dupplicated appointment in creation when appointment already exists', () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "select", { rowCount: 1 });

            await appointmentsServices.create(createAppointment);

        }).rejects.toEqual(errors.duplicatedAppointmentError());
    });

    it('#3 should book appointment', async () => {

        spyOnPromiseMock(appointmentsRepositories, "selectById", {
            rowCount: 1,
            rows: [{ patientId: null }]
        });

        spyOnPromiseMock(appointmentsRepositories, "book", { rowCount: 1 });

        expect(await appointmentsServices.book(bookAppointment)).toBeTruthy();
    });

    it('#4 should not book appointment when appointmentId is not found', () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 0,
                rows: [{}]
            });

            await appointmentsServices.book(bookAppointment);

        }).rejects.toEqual(errors.appointmentNotFoundError());
    });

    it('#5 should not book appointment when appointment is already booked', () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 1,
                rows: [{ patientId: '1' }]
            });

            await appointmentsServices.book(bookAppointment);

        }).rejects.toEqual(errors.bookedAppointmentError());
    });

    it('#6 should confirm appointment', async () => {

        spyOnPromiseMock(appointmentsRepositories, "selectById", {
            rowCount: 1,
            rows: [{
                doctorId: 1,
                status: 'booked',
            }]
        });

        spyOnPromiseMock(appointmentsRepositories, "confirm", { rowCount: 1 });

        expect(await appointmentsServices.confirm(confirmAppointment)).toBeTruthy();
    });

    it('#7 should not confirm appointment if appointment doesnt exist', async () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 0,
                rows: [{}]
            });

            await appointmentsServices.confirm(confirmAppointment);

        }).rejects.toEqual(errors.appointmentNotFoundError());
    });

    it('#8 should not confirm appointment if appointment is already confirmed', async () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 1,
                rows: [{ status: 'confirmed' }]
            });

            await appointmentsServices.confirm(confirmAppointment);

        }).rejects.toEqual(errors.confirmedAppointmentError());
    });

    it('#9 should not confirm appointment if appointment is canceled', async () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 1,
                rows: [{ status: 'canceled' }]
            });

            await appointmentsServices.confirm(confirmAppointment);

        }).rejects.toEqual(errors.canceledAppointmentError());
    });

    it('#10 should not confirm appointment if appointment is not booked', async () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 1,
                rows: [{ status: 'free' }]
            });

            await appointmentsServices.confirm(confirmAppointment);

        }).rejects.toEqual(errors.freeAppointmentError());
    });

    it('#10 should not confirm appointment if you are not the appointments doctor', async () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 1,
                rows: [{
                    doctorId: 2, //! all the others doctorIds are set to 1
                    status: 'booked'
                }]
            });

            await appointmentsServices.confirm(confirmAppointment);

        }).rejects.toEqual(errors.unauthorizedError());
    });

    it('#11 should cancel appointment', async () => {

        spyOnPromiseMock(appointmentsRepositories, "selectById", {
            rowCount: 1,
            rows: [{
                doctorId: 1,
                status: 'booked',
            }]
        });

        spyOnPromiseMock(appointmentsRepositories, "cancel", { rowCount: 1 });

        expect(await appointmentsServices.cancel(confirmAppointment)).toBeTruthy();
    });

    it('#12 should not cancel appointment if appointment doesnt exist', async () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 0,
                rows: [{}]
            });

            await appointmentsServices.cancel(confirmAppointment);

        }).rejects.toEqual(errors.appointmentNotFoundError());
    });

    it('#12 should not cancel appointment if appointment is already canceled', async () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 1,
                rows: [{ status: 'canceled' }]
            });

            await appointmentsServices.cancel(confirmAppointment);

        }).rejects.toEqual(errors.canceledAppointmentError());
    });

    it('#13 should not cancel appointment if you are not the appointments doctor', async () => {

        expect(async () => {

            spyOnPromiseMock(appointmentsRepositories, "selectById", {
                rowCount: 1,
                rows: [{
                    doctorId: 2, //! all the others doctorIds are set to 1
                    status: 'booked'
                }]
            });

            await appointmentsServices.cancel(confirmAppointment);

        }).rejects.toEqual(errors.unauthorizedError());
    });
});