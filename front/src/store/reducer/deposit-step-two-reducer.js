const initialState = {
    formIsValid: false,
    area: "0",
    logementType: null,
    description: '',
    stepTwoSubmit: false,
    submitLogementInformation: []
}

function depositStepTwoReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'FORM_IS_VALID':
            nextState = {
                ...state,
                formIsValid: action.value
            }
            return nextState || state
        case 'AREA_IS_DONE':
            nextState = {
                ...state,
                area: action.value
            }
            return nextState || state
        case 'LOGEMENT_TYPE_IS_DONE':
            nextState = {
                ...state,
                logementType: action.value
            }
            return nextState || state
        case 'DESCRIPTION_IS_DONE':
            nextState = {
                ...state,
                description: action.value
            }
            return nextState || state
        case 'STEP_TWO_SUBMIT':
            nextState = {
                ...state,
                stepTwoSubmit: action.value
            }
            return nextState || state
        case 'LOGEMENT_INFORMATION':
            nextState = {
                ...state,
                submitLogementInformation: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default depositStepTwoReducer