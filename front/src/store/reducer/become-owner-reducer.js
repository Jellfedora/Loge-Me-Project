const initialState = {
    validCivilityType: false,
    validSiret: false,
    validSocialReason: false,
    validAdressOwner: false,
    validPostalCode: false,
    validPhone: false,
    owner: null
}

function becomeOwnerReducer(state = initialState, action) {
    let nextState

    switch (action.type) {
        case 'CIVILITY_TYPE_IS_VALID':
            if (action.value === 0) {
                nextState = {
                    ...state,
                    validCivilityType: false
                }
            } else {
                nextState = {
                    ...state,
                    validCivilityType: true
                }
            };

            return nextState || state
        case 'SIRET_IS_VALID':
            if (action.value.length === 14 && !isNaN(action.value)) {
                nextState = {
                    ...state,
                    validSiret: true
                }
            } else {
                nextState = {
                    ...state,
                    validSiret: false
                }
            }

            return nextState || state
        case 'SOCIAL_REASON_IS_VALID':
            if (action.value.length > 2) {
                nextState = {
                    ...state,
                    validSocialReason: true
                }
            } else {
                nextState = {
                    ...state,
                    validSocialReason: false
                }
            }

            return nextState || state
        case 'ADRESS_OWNER_IS_VALID':
            if (action.value.length > 2) {
                nextState = {
                    ...state,
                    validAdressOwner: true
                }
            } else {
                nextState = {
                    ...state,
                    validAdressOwner: false
                }
            }

            return nextState || state
        case 'POSTAL_CODE_IS_VALID':
            if (action.value.length > 2) {
                nextState = {
                    ...state,
                    validPostalCode: true
                }
            } else {
                nextState = {
                    ...state,
                    validPostalCode: false
                }
            }

            return nextState || state
        case 'PHONE_IS_VALID':
            if (action.value.length === 10) {
                nextState = {
                    ...state,
                    validPhone: true
                }
            } else {
                nextState = {
                    ...state,
                    validPhone: false
                }
            }

            return nextState || state
        case 'SUBMIT_OWNER':
            nextState = {
                ...state,
                owner: action.value
            }

            return nextState || state
        default:
            return state
    }
}


export default becomeOwnerReducer