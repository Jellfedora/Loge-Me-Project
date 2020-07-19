const initialState = {
    stepThreeSubmit: false
}

function depositStepThreeReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'STEP_THREE_SUBMIT':
            nextState = {
                ...state,
                stepThreeSubmit: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default depositStepThreeReducer