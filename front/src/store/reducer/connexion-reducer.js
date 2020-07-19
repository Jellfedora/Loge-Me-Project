const initialState = {
    validEmail: null,
    validPassword: null,
    showSubmit: false,
    user: [],
    token: ''
}

function connexionReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
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
        case 'SAVE_USER':
            nextState = {
                ...state,
                user: action.value.data.user,
                token: action.value.token,
                connexionFailed: false
            }
            return nextState || state
        case 'CONNEXION_FAILED':
            nextState = {
                ...state,
                connexionFailed: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default connexionReducer