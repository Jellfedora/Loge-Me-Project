import { combineReducers } from 'redux';
import connexion from './connexion-reducer';
import register from './register-reducer';
import navigation from './navigation-reducer';
import account from './account-reducer';
import flashMessages from './flash-message-reducer';
import forgotPassword from './forgot-password-reducer';
import user from './user-reducer';
import deposit from './deposit-reducer';
import depositStepOne from './deposit-step-one-reducer';
import depositStepTwo from './deposit-step-two-reducer';
import depositStepThree from './deposit-step-three-reducer';
import becomeOwner from './become-owner-reducer';
import lastLocations from './last-locations-reducer';
import post from './post-reducer';
import searchLocation from './search-location-reducer';
import searchResults from './search-results-reducer';

const rootReducer = combineReducers({
    connexion,
    register,
    navigation,
    account,
    flashMessages,
    forgotPassword,
    user,
    deposit,
    depositStepOne,
    depositStepTwo,
    depositStepThree,
    becomeOwner,
    lastLocations,
    post,
    searchLocation,
    searchResults
});

export default rootReducer;