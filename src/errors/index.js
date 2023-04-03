function unauthorizedError() {
    return {
        name: 'unauthorizedError',
        message: 'You are not authorized to acess'
    }
}

function notFoundError() {
    return {
        name: "notFoundError",
        message: "No result for this search",
    };
}

function conflictError() {
    return {
        name: 'conflictError',
        message: 'This credentials are already in use'
    }
}

function duplicatedAppointmentError() {
    return {
        name: 'duplicatedAppointmentError',
        message: 'This appointment already exists'
    }
}

function duplicatedEmailError() {
    return {
        name: 'duplicatedEmailError',
        message: 'This email is already in use'
    }
}

function duplicatedCrmError() {
    return {
        name: 'duplicatedCrmError',
        message: 'This crm is already in use'
    }
}

function duplicatedCpfError() {
    return {
        name: 'duplicatedCpfError',
        message: 'This cpf is already in use'
    }
}

function invalidLoginError() {
    return {
        name: 'invalidLoginError',
        message: 'Email or password wrong'
    }
}

function unprocessableEntityError(message) {
    return {
        name: 'unprocessableEntityError',
        message
    }
}

export default {
    unauthorizedError,
    notFoundError,
    conflictError,
    duplicatedAppointmentError,
    duplicatedEmailError,
    duplicatedCrmError,
    duplicatedCpfError,
    invalidLoginError,
    unprocessableEntityError
}
