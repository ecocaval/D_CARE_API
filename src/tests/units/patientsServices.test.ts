import { SignInType, SignUpPatientType } from "../../@types/logins";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { jest } from "@jest/globals";

import errors from "../../errors";

import patientsServices from "../../services/patientsServices";

import loginsRepositories from "../../repositories/loginsRepositories";
import patientsRepositories from "../../repositories/patientsRepositories";

const userSignUp: SignUpPatientType = {
    name: 'foo',
    email: 'foo@bar.com',
    password: 'foobar123',
    type: 'patient',
    cpf: '13113113113'
};

const userSignIn: SignInType = {
    email: 'foo@bar.com',
    password: 'foobar123',
    type: 'patient'
};

describe('patientsServices unit tests', () => {

    it('#1 should sign up a patient', async () => {

        const loginId = Math.ceil(10 * Math.random());

        jest
            .spyOn(loginsRepositories, "selectByEmail")
            .mockImplementationOnce((email): any => (
                Promise.resolve({
                    rowCount: 0
                })
            ));

        jest
            .spyOn(patientsRepositories, "selectByCpf")
            .mockImplementationOnce((cpf): any => (
                Promise.resolve({
                    rowCount: 0
                })
            ));

        jest
            .spyOn(loginsRepositories, "create")
            .mockImplementationOnce((params): any => (
                Promise.resolve({
                    rows: [{ id: loginId }]
                })
            ));

        jest
            .spyOn(patientsRepositories, "create")
            .mockImplementationOnce((params): any => (
                Promise.resolve({
                    rowCount: 1
                })
            ));

        expect(await patientsServices.signUp(userSignUp))
            .toBeTruthy();
    });

    it('#2 should acuse double email error in sign up', () => {

        expect(async () => {
            jest
                .spyOn(loginsRepositories, "selectByEmail")
                .mockImplementationOnce((email): any => (
                    Promise.resolve({
                        rowCount: 1
                    })
                ));

            await patientsServices.signUp(userSignUp);
        }).rejects.toEqual(errors.duplicatedEmailError());
    });

    it('#3 should acuse double cpf error in sign up', () => {

        expect(async () => {
            jest
                .spyOn(loginsRepositories, "selectByEmail")
                .mockImplementationOnce((email): any => (
                    Promise.resolve({
                        rowCount: 0
                    })
                ));

            jest
                .spyOn(patientsRepositories, "selectByCpf")
                .mockImplementationOnce((cpf): any => (
                    Promise.resolve({
                        rowCount: 1
                    })
                ));

            await patientsServices.signUp(userSignUp);
        }).rejects.toEqual(errors.duplicatedCpfError());
    });

    it('#4 should sign in', async () => {

        const fakeToken = 'fake-token';

        const bcryptCompareSync = jest
            .fn()
            .mockImplementationOnce(() => true);

        const jwtSign = jest
            .fn()
            .mockImplementationOnce(() => fakeToken);

        jest
            .spyOn(loginsRepositories, "selectByEmail")
            .mockImplementationOnce((email): any => (
                Promise.resolve({
                    rowCount: 1,
                    rows: [{
                        id: 1,
                        name: 'foo',
                        email: 'foo@bar.com',
                        password: 'foobar123',
                        type: 'patient',
                        createdAt: 'foo'
                    }]
                })
            ));

        (bcrypt.compareSync as jest.Mock) = bcryptCompareSync;

        (jwt.sign as jest.Mock) = jwtSign;

        expect(await patientsServices.signIn(userSignIn)).toBe(fakeToken);
    });
})