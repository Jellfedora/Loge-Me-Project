

const initialState = {
    // userIsConnect: true
}

function navigationReducer(state = initialState, action) {
    // let nextState
    switch (action.type) {
        // case 'DISCONNECT_USER':
        //     nextState = {
        //         ...state,
        //         userIsConnect: null
        //     }
        //     return nextState || state

        default:
            return state
    }
}

export default navigationReducer