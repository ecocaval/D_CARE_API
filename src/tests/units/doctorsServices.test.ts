import { SignInType, SignUpDoctorType } from '../../@types/logins';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { jest } from "@jest/globals";

import errors from "../../errors";

import loginsRepositories from "../../repositories/loginsRepositories";
import doctorsRepositories from '../../repositories/doctorsRepositories';
import specialitiesRepositories from '../../repositories/specialitiesRepositories';
import doctorsServices from '../../services/doctorsServices';

const userSignUp: SignUpDoctorType = {
    name: 'foo',
    email: 'foo@bar.com',
    password: 'foobar123',
    type: 'doctor',
    specialityName: 'foobar',
    crm: 'foobar',
    crmOptionals: null,
};

const userSignIn: SignInType = {
    email: 'foo@bar.com',
    password: 'foobar123',
    type: 'doctor'
};

describe('doctorsServices unit tests', () => {

    it('#1 should sign up a doctor with new speciality', async () => {

        const loginId = Math.ceil(10 * Math.random());

        const bcryptHashSync = jest
            .fn()
            .mockImplementationOnce(() => 'foobar123-hash');

        (bcrypt.hashSync as jest.Mock) = bcryptHashSync;

        jest
            .spyOn(loginsRepositories, "selectByEmail")
            .mockImplementationOnce((email): any => (
                Promise.resolve({
                    rowCount: 0
                })
            ));

        jest
            .spyOn(doctorsRepositories, "selectByCrm")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 0
                })
            ));

        jest
            .spyOn(loginsRepositories, "create")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rows: [{ id: loginId }]
                })
            ));

        jest
            .spyOn(specialitiesRepositories, "selectByName")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 0
                })
            ));

        jest
            .spyOn(specialitiesRepositories, "create")
            .mockImplementationOnce((): any => (
                Promise.resolve()
            ));

        jest
            .spyOn(doctorsRepositories, "create")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 1
                })
            ));

        expect(await doctorsServices.signUp(userSignUp)).toBeTruthy();
    });

    it('#2 should sign up a doctor without new speciality', async () => {

        const loginId = Math.ceil(10 * Math.random());

        const bcryptHashSync = jest
            .fn()
            .mockImplementationOnce(() => 'foobar123-hash');

        (bcrypt.hashSync as jest.Mock) = bcryptHashSync;

        jest
            .spyOn(loginsRepositories, "selectByEmail")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 0
                })
            ));

        jest
            .spyOn(doctorsRepositories, "selectByCrm")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 0
                })
            ));

        jest
            .spyOn(loginsRepositories, "create")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rows: [{ id: loginId }]
                })
            ));

        jest
            .spyOn(specialitiesRepositories, "selectByName")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 1
                })
            ));

        jest
            .spyOn(doctorsRepositories, "create")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 1
                })
            ));

        expect(await doctorsServices.signUp(userSignUp)).toBeTruthy();
    });

    it('#3 should acuse double email error in doctors sign up', () => {

        expect(async () => {

            jest
                .spyOn(loginsRepositories, "selectByEmail")
                .mockImplementationOnce((): any => (
                    Promise.resolve({
                        rowCount: 1
                    })
                ));

            await doctorsServices.signUp(userSignUp);

        }).rejects.toEqual(errors.duplicatedEmailError());
    });

    it('#4 should acuse double crm error in doctors sign up', () => {

        expect(async () => {

            jest
                .spyOn(loginsRepositories, "selectByEmail")
                .mockImplementationOnce((): any => (
                    Promise.resolve({
                        rowCount: 0
                    })
                ));

            jest
                .spyOn(doctorsRepositories, "selectByCrm")
                .mockImplementationOnce((): any => (
                    Promise.resolve({
                        rowCount: 1
                    })
                ));

            await doctorsServices.signUp(userSignUp);
            
        }).rejects.toEqual(errors.duplicatedCrmError());
    });

    it('#5 should sign in as a doctor', async () => {

        const fakeToken = 'fake-token';

        const bcryptCompareSync = jest
            .fn()
            .mockImplementationOnce(() => true);

        const jwtSign = jest
            .fn()
            .mockImplementationOnce(() => fakeToken);

        jest
            .spyOn(loginsRepositories, "selectByEmail")
            .mockImplementationOnce((): any => (
                Promise.resolve({
                    rowCount: 1,
                    rows: [{
                        id: 1,
                        name: 'foo',
                        email: 'foo@bar.com',
                        password: 'foobar123',
                        type: 'doctor',
                        createdAt: 'foo'
                    }]
                })
            ));

        (bcrypt.compareSync as jest.Mock) = bcryptCompareSync;

        (jwt.sign as jest.Mock) = jwtSign;

        expect(await doctorsServices.signIn(userSignIn)).toBe(fakeToken);
    });

    it('#6 should acuse unauthorized error in sign in when doctors email is not found', () => {

        expect(async () => {

            jest
                .spyOn(loginsRepositories, "selectByEmail")
                .mockImplementationOnce((): any => (
                    Promise.resolve({
                        rowCount: 0,
                        rows: []
                    })
                ));

            await doctorsServices.signIn(userSignIn);

        }).rejects.toEqual(errors.unauthorizedError());
    });

    it('#7 should acuse unauthorized error in sign in when doctors password is not correct', () => {

        expect(async () => {

            const bcryptCompareSync = jest
                .fn()
                .mockImplementationOnce(() => false);

            jest
                .spyOn(loginsRepositories, "selectByEmail")
                .mockImplementationOnce((): any => (
                    Promise.resolve({
                        rowCount: 1,
                        rows: [{
                            id: 1,
                            name: 'foo',
                            email: 'foo@bar.com',
                            password: 'foobar123',
                            type: 'doctor',
                            createdAt: 'foo'
                        }]
                    })
                ));

            (bcrypt.compareSync as jest.Mock) = bcryptCompareSync;

            await doctorsServices.signIn(userSignIn);

        }).rejects.toEqual(errors.unauthorizedError());
    });

});