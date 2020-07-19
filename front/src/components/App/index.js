
import React from 'react';
import Navigation from '../Navigation';

import Footer from '../Footer';
import User from '../User';
// import About from '../About';
// import Rooms from '../Room';
import CookieConsent from "react-cookie-consent";

import navElements from '../Navigation/data';
// import roomsElements from '../Room/data';
import { Provider } from "react-redux";
import store from '../../store';

// import bg from './bg.jpg';
// Fontawesome 5
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faAt, faSpinner, faUserEdit, faUserSlash, faHome, faMap, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faKey, faAt, faSpinner, faUserEdit, faUserSlash, faHome, faMap, faMapMarkerAlt);

const App = () => {
    return (
        <Provider store={store}>
            <User />
            <div className="app" >
                <div className="app-loge-me container-fluid p-0">
                    <Navigation links={navElements} />
                </div>
                <footer className="footer text-center">
                    <Footer />
                </footer>
                <CookieConsent
                    location="bottom"
                    buttonText="J'accepte"
                    cookieName="CookieConsent"
                    style={{ background: "#007bff" }}
                    buttonStyle={{ color: "white", fontSize: "13px", backgroundColor: "black", marginRight: "8em" }}
                    expires={150}
                >
                    En poursuivant votre navigation sur notre site, vous acceptez l'installation et l'utilisation de cookies sur votre poste
                    </CookieConsent>
            </div>
        </Provider >
    );
};
export default App;