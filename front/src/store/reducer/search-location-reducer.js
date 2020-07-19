const initialState = {
    search: null,
    localisationIsSelect: false
}

function searchLocationReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_SEARCH':
            nextState = {
                ...state,
                search: action.value
            }
            return nextState || state
        case 'LOCALISATION_IS_SELECT':
            nextState = {
                ...state,
                localisationIsSelect: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default searchLocationReducer