const initialState = {
    housing: null,
}

function postReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_HOUSING':
            nextState = {
                ...state,
                housing: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default postReducer