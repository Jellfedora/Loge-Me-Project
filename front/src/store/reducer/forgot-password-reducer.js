const initialState = {
    validEmail: null,
    success: false
}

function forgotPasswordReducer(state = initialState, action) {
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
        case 'SEND-MAIL-SUCCESS':
            nextState = {
                ...state,
                success: true
            }
            return nextState || state
        default:
            return state
    }
}

export default forgotPasswordReducer