const initialState = {
    validLastname: null,
    validFirstname: null,
    validEmail: null,
    validPassword: null,
    validRandomIdentifiant: null,
    showSubmit: false,
    autoriseEdit: true,
    user: [],
    editSuccess: null,
    editFailed: null,
    editUser: null
}

function accountReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'AUTORISE_EDIT':
            nextState = {
                ...state,
                autoriseEdit: false
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
        case 'VALID_IDENTIFIANT':
            nextState = {
                ...state,
                validRandomIdentifiant: true
            }
            return nextState || state
        case 'INVALID_IDENTIFIANT':
            nextState = {
                ...state,
                validRandomIdentifiant: false
            }
            return nextState || state
        case 'EDIT_SUCCESS':
            nextState = {
                ...state,
                editSuccess: true
            }
            return nextState || state
        case 'EDIT_FAILED':
            nextState = {
                ...state,
                editFailed: true
            }
            return nextState || state
        case 'EDIT_FAILED_MESSAGE':
            nextState = {
                ...state,
                editUserFailedMessage: action.value
            }
            return nextState || state
        case 'EDIT_USER':
            nextState = {
                ...state,
                editUser: action.value.data.user
            }
            return nextState || state
        default:
            return state
    }
}

export default accountReducer