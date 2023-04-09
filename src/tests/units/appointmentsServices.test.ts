import { BookAppointmentType, ConfirmAndCancelAppointmentType, SelectAndCreateAppointmentType } from "../../@types/appointments";

import { jest } from "@jest/globals";

import errors from "../../errors";

import appointmentsRepositories from "../../repositories/appointmentsRepositories";

import appointmentsServices from "../../services/appointmentsServices";

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

        jest
            .spyOn(appointmentsRepositories, "select")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 0
                })
            ));

        jest
            .spyOn(appointmentsRepositories, "create")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 1
                })
            ));

        expect(await appointmentsServices.create(createAppointment)).toBeTruthy();

    });

    it('#2 should acuse dupplicated appointment in creation when appointment already exists', () => {

        expect(async () => {

            jest
                .spyOn(appointmentsRepositories, "select")
                .mockImplementationOnce((): any => (
                    Promise.resolve({
                        rowCount: 1
                    })
                ));

            await appointmentsServices.create(createAppointment);

        }).rejects.toEqual(errors.duplicatedAppointmentError());

    });

    it('#3 should book appointment', async () => {

        jest
            .spyOn(appointmentsRepositories, "selectById")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 1,
                    rows: [{
                        patientId: null
                    }]
                })
            ));

        jest
            .spyOn(appointmentsRepositories, "book")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 1
                })
            ));

        expect(await appointmentsServices.book(bookAppointment)).toBeTruthy();

    });

    it('#4 should not book appointment when appointmentId is not found', () => {

        expect(async () => {

            jest
                .spyOn(appointmentsRepositories, "selectById")
                .mockImplementationOnce((): any => (
                    Promise.resolve({
                        rowCount: 0,
                        rows: [{}]
                    })
                ));

            await appointmentsServices.book(bookAppointment);

        }).rejects.toEqual(errors.appointmentNotFoundError());

    });

    it('#5 should not book appointment when appointment is already booked', () => {

        expect(async () => {

            jest
                .spyOn(appointmentsRepositories, "selectById")
                .mockImplementationOnce((): any => (
                    Promise.resolve({
                        rowCount: 1,
                        rows: [{
                            patientId: '1'
                        }]
                    })
                ));

            await appointmentsServices.book(bookAppointment);

        }).rejects.toEqual(errors.bookedAppointmentError());

    });

    it('#6 should confirm appointment', async () => {

        jest
            .spyOn(appointmentsRepositories, "selectById")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 1,
                    rows: [{
                        doctorId: 1,
                        status: 'booked',
                    }]
                })
            ));

        jest
            .spyOn(appointmentsRepositories, "confirm")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 1
                })
            ));

        expect(await appointmentsServices.confirm(confirmAppointment)).toBeTruthy();

    });

});