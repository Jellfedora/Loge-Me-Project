const initialState = {
    latitude: 2,
    longitude: 46,
    submitAdress: [],
    stepOneSubmit: false
}

function depositStepOneReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_LATITUDE':
            nextState = {
                ...state,
                latitude: action.value
            }
            return nextState || state
        case 'ADD_LONGITUDE':
            nextState = {
                ...state,
                longitude: action.value
            }
            return nextState || state
        case 'SUBMIT_ADRESSES':
            nextState = {
                ...state,
                submitAdress: action.value
            }
            return nextState || state
        case 'STEP_ONE_SUBMIT':
            nextState = {
                ...state,
                stepOneSubmit: true
            }
            return nextState || state
        default:
            return state
    }
}

export default depositStepOneReducer