import { SignInType, SignUpPatientType } from "../../@types/logins";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { jest } from "@jest/globals";

import errors from "../../errors";

import patientsServices from "../../services/patientsServices";

import loginsRepositories from "../../repositories/loginsRepositories";
import patientsRepositories from "../../repositories/patientsRepositories";

import spyOnPromiseMock from "../mocks/spyOnPromise";

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

        const bcryptHashSync = jest
            .fn()
            .mockImplementationOnce(() => 'foobar123-hash');

        (bcrypt.hashSync as jest.Mock) = bcryptHashSync;

        spyOnPromiseMock(loginsRepositories, "selectByEmail", { rowCount: 0 });

        spyOnPromiseMock(patientsRepositories, "selectByCpf", { rowCount: 0 });

        spyOnPromiseMock(loginsRepositories, "create", { rows: [{ id: loginId }] });

        spyOnPromiseMock(patientsRepositories, "create", { rowCount: 1 });

        expect(await patientsServices.signUp(userSignUp)).toBeTruthy();
    });

    it('#2 should acuse double email error in patients sign up', () => {

        expect(async () => {

            spyOnPromiseMock(loginsRepositories, "selectByEmail", { rowCount: 1 });

            await patientsServices.signUp(userSignUp);

        }).rejects.toEqual(errors.duplicatedEmailError());
    });

    it('#3 should acuse double cpf error in patients sign up', () => {

        expect(async () => {

            spyOnPromiseMock(loginsRepositories, "selectByEmail", { rowCount: 0 });

            spyOnPromiseMock(patientsRepositories, "selectByCpf", { rowCount: 1 });

            await patientsServices.signUp(userSignUp);

        }).rejects.toEqual(errors.duplicatedCpfError());
    });

    it('#4 should sign in as a patient', async () => {

        const fakeToken = 'fake-token';

        const bcryptCompareSync = jest
            .fn()
            .mockImplementationOnce(() => true);

        const jwtSign = jest
            .fn()
            .mockImplementationOnce(() => fakeToken);

        spyOnPromiseMock(loginsRepositories, "selectByEmail", {
            rowCount: 1,
            rows: [{
                id: 1,
                name: 'foo',
                email: 'foo@bar.com',
                password: 'foobar123',
                type: 'patient',
                createdAt: 'foo'
            }]
        });

        (bcrypt.compareSync as jest.Mock) = bcryptCompareSync;

        (jwt.sign as jest.Mock) = jwtSign;

        expect(await patientsServices.signIn(userSignIn)).toBe(fakeToken);
    });

    it('#5 should acuse unauthorized error in sign in when patients email is not found', () => {

        expect(async () => {

            spyOnPromiseMock(loginsRepositories, "selectByEmail", {
                rowCount: 0,
                rows: []
            });

            await patientsServices.signIn(userSignIn);

        }).rejects.toEqual(errors.unauthorizedError());
    });

    it('#6 should acuse unauthorized error in sign in when patients password is not correct', () => {

        expect(async () => {

            const bcryptCompareSync = jest
                .fn()
                .mockImplementationOnce(() => false);

            spyOnPromiseMock(loginsRepositories, "selectByEmail", {
                rowCount: 1,
                rows: [{
                    id: 1,
                    name: 'foo',
                    email: 'foo@bar.com',
                    password: 'foobar123',
                    type: 'patient',
                    createdAt: 'foo'
                }]
            });

            (bcrypt.compareSync as jest.Mock) = bcryptCompareSync;

            await patientsServices.signIn(userSignIn);

        }).rejects.toEqual(errors.unauthorizedError());
    });
});