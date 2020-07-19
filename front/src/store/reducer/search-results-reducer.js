const initialState = {
    searchResults: null,
}

function searchResultsReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_SEARCH_HOUSINGS':
            nextState = {
                ...state,
                searchResults: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default searchResultsReducer