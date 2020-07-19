

const initialState = {
    validLastname: null,
    validFirstname: null,
    validEmail: null,
    validPassword: null,
}

function registerReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'VALID_LASTNAME':
            nextState = {
                ...state,
                validLastname: true
            }
            return nextState || state
        case 'INVALID_LASTNAME':
            nextState = {
                ...state,
                validLastname: false
            }
            return nextState || state
        case 'VALID_FIRSTNAME':
            nextState = {
                ...state,
                validFirstname: true
            }
            return nextState || state
        case 'INVALID_FIRSTNAME':
            nextState = {
                ...state,
                validFirstname: false
            }
            return nextState || state
        case 'VALID_EMAIL':
            nextState = {
                ...state,
                validEmail: true
            }
            return nextState || state
        case 'INVALID_EMAIL':
            nextState = {
                ...state,
                validEmail: false
            }
            return nextState || state
        case 'VALID_PASSWORD':
            nextState = {
                ...state,
                validPassword: true
            }
            return nextState || state
        case 'INVALID_PASSWORD':
            nextState = {
                ...state,
                validPassword: false
            }
            return nextState || state
        case 'REGISTER_SUCCESS':
            nextState = {
                ...state,
                registerSuccess: action.value
            }
            return nextState || state
        case 'REGISTER_FAILED':
            nextState = {
                ...state,
                registerFailed: action.value
            }
            return nextState || state
        case 'REGISTER_FAILED_MESSAGE':
            nextState = {
                ...state,
                registerFailedMessage: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default registerReducer