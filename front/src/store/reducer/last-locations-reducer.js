const initialState = {
    lastApartments: null,
    lastHouses: null,
    lastGrounds: null,
}

function lastLocationsReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'GET_HOUSINGS':
            nextState = {
                ...state,
                lastApartments: action.value.apartments,
                lastHouses: action.value.houses,
                lastGrounds: action.value.grounds
            }
            return nextState || state
        default:
            return state
    }
}

export default lastLocationsReducer