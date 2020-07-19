const initialState = {
    resetConnectUserFailed: false,
    resetRegisterUserFailed: false,
    resetEditUserFailed: false
}

function flashMessageReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'RESET_CONNECT_USER_FAILED':
            nextState = {
                ...state,
                resetConnectUserFailed: action.value // si true dit a connexion de remettre a false
            }
            return nextState || state
        case 'RESET_REGISTER_USER_FAILED':
            nextState = {
                ...state,
                resetRegisterUserFailed: action.value // si true dit a connexion de remettre a false
            }
            return nextState || state
        case 'RESET_EDIT_USER_FAILED':
            nextState = {
                ...state,
                resetEditUserFailed: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default flashMessageReducer