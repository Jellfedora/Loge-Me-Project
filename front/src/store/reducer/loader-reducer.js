

const initialState = {
    isActive: false
}

function loaderReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ACTIVE_LOADER':
            nextState = {
                ...state,
                isActive: true
            }
            return nextState || state
        case 'STOP_LOADER':
            nextState = {
                ...state,
                isActive: false
            }
            return nextState || state

        default:
            return state
    }
}

export default loaderReducer