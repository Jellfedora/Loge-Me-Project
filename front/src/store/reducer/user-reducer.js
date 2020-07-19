const initialState = {
    user: null,
    token: null,
    owner: null
}

function userReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'MAJ_USER':
            nextState = {
                ...state,
                user: action.value
            }
            return nextState || state
        case 'SAVE_TOKEN':
            nextState = {
                ...state,
                token: action.value
            }
            return nextState || state
        case 'MAJ_OWNER_INFORMATIONS':
            nextState = {
                ...state,
                owner: action.value
            }
            return nextState || state
        case 'DISCONNECT_USER':
            nextState = {
                ...state,
                user: action.value,
                token: action.value,
                owner: action.value
            }
            return nextState || state

        default:
            return state
    }
}

export default userReducer