import { BookAppointmentType, SelectAndCreateAppointmentType } from "../../@types/appointments";

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
    patientId: '2'
}

describe('appointments unit tests', () => {

    it('#1 should create appointment', async () => {

        jest
            .spyOn(appointmentsRepositories, "select")
            .mockImplementationOnce((email): any => (
                Promise.resolve({
                    rowCount: 0
                })
            ));

        jest
            .spyOn(appointmentsRepositories, "create")
            .mockImplementationOnce((email): any => (
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
                .mockImplementationOnce((email): any => (
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
            .mockImplementationOnce((email): any => (
                Promise.resolve({
                    rowCount: 1,
                    rows: [{
                        patientId: null
                    }]
                })
            ));

        jest
            .spyOn(appointmentsRepositories, "book")
            .mockImplementationOnce((email): any => (
                Promise.resolve({
                    rowCount: 1
                })
            ));

        expect(await appointmentsServices.book(bookAppointment)).toBeTruthy();

    });

    it('#4 should not book appointment when appointmentId is not found', async () => {

        expect(async () => {
            
            jest
                .spyOn(appointmentsRepositories, "selectById")
                .mockImplementationOnce((email): any => (
                    Promise.resolve({
                        rowCount: 0,
                        rows: [{}]
                    })
                ));

            await appointmentsServices.book(bookAppointment);

        }).rejects.toEqual(errors.appointmentNotFoundError());

    });

    it('#5 should not book appointment when appointment is already booked', async () => {

        expect(async () => {
            
            jest
                .spyOn(appointmentsRepositories, "selectById")
                .mockImplementationOnce((email): any => (
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

});