import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

// Leatflex
import { Map, TileLayer } from "react-leaflet";


class DepositStepOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adress: '',
            showAdressChoice: false,
            submitAdress: false,
        };
    }
    componentDidMount() {
    }

    componentDidUpdate() {
    }


    handleAdressChange = (e) => {
        this.setState({ showAdressChoice: true });
        let emailTarget = e.target.value;
        this.setState({ adress: emailTarget });

        axios.get('https://api-adresse.data.gouv.fr/search/', {
            params: {
                "q": emailTarget,
                "limit": 5,
            }
        })
            .then(response => {
                let adress = response.data.features[0]
                const action = { type: "SUBMIT_ADRESSES", value: adress };
                this.props.dispatch(action)
            })
            .catch(error => {
                this.setState({ loadSpinner: false });
            });
    }

    showAddress = (adress) => {
        let AdressContainer = []

        if (adress) {
            let array = []
            if (adress.properties) {
                array.push(
                    adress.properties.label + " / " + adress.properties.context
                )

                AdressContainer.push(
                    <p key="i">
                        {array}
                    </p>
                )

                let latitude = adress.geometry.coordinates[0];
                let longitude = adress.geometry.coordinates[1]
                const action = { type: "ADD_LATITUDE", value: latitude };
                const action2 = { type: "ADD_LONGITUDE", value: longitude }
                // Ajouter adresse complete
                this.props.dispatch(action)
                this.props.dispatch(action2)
            }
        }
        if (this.state.showAdressChoice === true) {
            return AdressContainer

        }
    }

    selectAdress = (event) => {
        this.setState({ adress: event.target.textContent, showAdressChoice: false, submitAdress: true });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const action = { type: "STEP_ONE_SUBMIT", value: true };
        // Ajouter adresse complete
        this.props.dispatch(action)
    }

    render() {
        return (
            <div className="deposit-component__step-one">
                <div className="deposit-component__title text-center">
                    <h2>Où est situé votre logement?</h2>
                </div>
                <form className="deposit-component__form">
                    <div className="deposit-component__form__container form-group">
                        <label htmlFor="exampleInputEmail1">
                            <FontAwesomeIcon
                                icon="map"
                            />
                            &nbsp; Adresse de votre logement
                            </label>
                        <input type="text" className="form-control" id="InputAdress" value={this.state.adress || ''} onChange={this.handleAdressChange} placeholder="Rue / Ville / Code Postal" autoComplete="off" />


                        <div className="deposit-component__form__container__select-adress" onClick={event => this.selectAdress(event)}>
                            {this.showAddress(this.props.submitAdress)}
                        </div>
                        <small className="form-text text-muted">Votre adresse ne sera pas affichée sur l'annonce, elle permettra de situer le secteur sur une carte.</small>
                        {this.state.submitAdress &&
                            <div className="text-center">
                                <button className="btn btn-primary deposit-component__form__container__submit-form" onClick={this.handleSubmit}>
                                    <span>Valider l'adresse de ce logement</span>
                                </button>
                            </div>
                        }
                    </div>

                    <Map center={[(this.props.longitude ? this.props.longitude : 46), (this.props.latitude ? this.props.latitude : 2)]} zoom={this.props.longitude === 46 ? 5 : 15}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </Map>
                </form>
            </div>

        );
        // }
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
const mapStateToProps = (state) => {
    return {
        latitude: state.depositStepOne.latitude,
        longitude: state.depositStepOne.longitude,
        submitAdress: state.depositStepOne.submitAdress,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DepositStepOne);

