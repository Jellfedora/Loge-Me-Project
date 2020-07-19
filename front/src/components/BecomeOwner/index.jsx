import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Redirect } from "react-router-dom";
import axios from 'axios';

const urlBecomeOwnerApi = process.env.REACT_APP_REST_API + 'api/owner/create';


class BecomeOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            civilityType: 0,
            siret: "",
            socialReason: "",
            adressOwner: "",
            postalCode: "",
            phone: "",
            redirectToDeposit: false,
        };
    }

    componentDidUpdate() {
    }

    civilityTypeChange = (event) => {
        this.setState({ civilityType: event.target.value });
        const action = { type: "CIVILITY_TYPE_IS_VALID", value: event.target.value }
        this.props.dispatch(action)
    }

    siretChange = (event) => {
        this.setState({ siret: event.target.value });
        const action = { type: "SIRET_IS_VALID", value: event.target.value }
        this.props.dispatch(action)
    }

    socialReasonChange = (event) => {
        this.setState({ socialReason: event.target.value });
        const action = { type: "SOCIAL_REASON_IS_VALID", value: event.target.value }
        this.props.dispatch(action)
    }

    adressOwnerChange = (event) => {
        console.log(event.target.value)
        this.setState({ adressOwner: event.target.value });
        const action = { type: "ADRESS_OWNER_IS_VALID", value: event.target.value }
        this.props.dispatch(action)
    }

    postalCodeChange = (event) => {
        console.log(event.target.value)
        this.setState({ postalCode: event.target.value });
        const action = { type: "POSTAL_CODE_IS_VALID", value: event.target.value }
        this.props.dispatch(action)
    }

    phoneChange = (event) => {
        console.log(event.target.value)
        this.setState({ phone: event.target.value });
        const action = { type: "PHONE_IS_VALID", value: event.target.value }
        this.props.dispatch(action)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userConnected = this.props.userConnected;
        const userToken = this.props.userToken;
        var config = {
            headers: { 'Authorization': "bearer " + userToken }
        };
        var userId = userConnected.id;

        // Envoi des datas en post
        axios.post(urlBecomeOwnerApi + '/' + userId, {
            civilityType: this.state.civilityType,
            siret: this.state.siret,
            socialReason: this.state.socialReason,
            phone: this.state.phone,
            postalCode: this.state.postalCode,
            billingAdress: this.state.adressOwner,

        },
            config
        ).then(response => {
            console.log(response)
            const action = { type: "SUBMIT_OWNER", value: this.state }
            this.props.dispatch(action)
            this.setState({ redirectToDeposit: true });
        })
            .catch(error => {
                console.log(error)
            });


    }



    render() {
        // Si le propriétaire na pas de compte proprio
        let validPhone = this.props.validPhone;
        let validPostalCode = this.props.validPostalCode;
        let validAdressOwner = this.props.validAdressOwner;
        let validSocialReason = this.props.validSocialReason;
        let validSiret = this.props.validSiret;
        let validCivilityType = this.props.validCivilityType;
        let validForm;

        if (validPhone && validPostalCode && validAdressOwner && validSocialReason && validSiret && validCivilityType === true) {
            validForm =
                <button className="btn btn-primary become-owner-component__form__container__submit-form" onClick={this.handleSubmit}>
                    <span>Valider ces informations</span>
                </button>

        } else {
            validForm = <small className="text-center">Toutes ces informations sont obligatoires</small>
        }

        //Redirection si non connecté ou déjà propriétaire
        if (this.props.userConnected === null) {
            return <Redirect to='/' />;
        } else if (this.props.userIsOwner !== null) {
            return <Redirect to='/deposit' />;
        } else {
            return (

                <div className="become-owner-component">
                    <div className="become-owner-component__title text-center">
                        <h2>Vos informations</h2>
                    </div>
                    <div className="become-owner-component__container">
                        <Form className="become-owner-component__container__form">
                            <Form.Group className="become-owner-component__container__form__civility-type" controlId="civilityType">
                                <Form.Label>Civilité</Form.Label>
                                <Form.Control as="select" onChange={this.civilityTypeChange} value={this.state.civilityType}>
                                    <option value="0">Non renseigné</option>
                                    <option value="1">M</option>
                                    <option value="2">Mme</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="become-owner-component__container__form__phone" controlId="phone">
                                <Form.Label>Téléphone</Form.Label>
                                <Form.Control className="become-owner-component__container__form__phone__form-input" type="tel" value={this.state.phone} onChange={this.phoneChange} />
                                <small>Le numéro de téléphone renseigné sera celui affiché sur vos annonces</small>
                            </Form.Group>
                            <Form.Group className="become-owner-component__container__form__siret" controlId="siret">
                                <Form.Label>SIRET</Form.Label>
                                <Form.Control className="become-owner-component__container__form__siret__form-input" type="number" value={this.state.siret} onChange={this.siretChange} />
                            </Form.Group>
                            <Form.Group className="become-owner-component__container__form__social-reason" controlId="social-reason">
                                <Form.Label>Raison sociale</Form.Label>
                                <Form.Control className="become-owner-component__container__form__social-reason__form-input" type="text" value={this.state.socialReason} onChange={this.socialReasonChange} />
                            </Form.Group>
                            <Form.Group className="become-owner-component__container__form__adress-owner" controlId="adress_owner">
                                <Form.Label>Adresse de facturation</Form.Label>
                                <Form.Control className="become-owner-component__container__form__adress-owner__form-input" type="text" value={this.state.adressOwner} onChange={this.adressOwnerChange} />
                            </Form.Group>
                            <Form.Group className="become-owner-component__container__form__postal-code" controlId="postal-code">
                                <Form.Label>Commune ou code postal</Form.Label>
                                <Form.Control className="become-owner-component__container__form__postal-code__form-input" type="text" value={this.state.postalCode} onChange={this.postalCodeChange} />
                            </Form.Group>
                            <div className="text-center">
                                {validForm}
                            </div>
                        </Form>
                    </div>
                </div>

            );
        }
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
const mapStateToProps = (state) => {
    return {
        validCivilityType: state.becomeOwner.validCivilityType,
        validSiret: state.becomeOwner.validSiret,
        validSocialReason: state.becomeOwner.validSocialReason,
        validAdressOwner: state.becomeOwner.validAdressOwner,
        validPostalCode: state.becomeOwner.validPostalCode,
        validPhone: state.becomeOwner.validPhone,
        userConnected: state.user.user,
        userIsOwner: state.user.owner,
        userToken: state.user.token,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BecomeOwner);

