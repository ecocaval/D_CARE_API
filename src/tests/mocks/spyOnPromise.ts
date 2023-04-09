import { jest } from "@jest/globals";

function spyOnPromiseMock(repository: any, method: string, promiseResolvesIn: any) {
    jest
        .spyOn(repository, method)
        .mockImplementationOnce((): any => (
            Promise.resolve(promiseResolvesIn)
        ));
}

export default spyOnPromiseMock;