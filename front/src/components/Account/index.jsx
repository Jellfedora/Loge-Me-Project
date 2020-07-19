import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

const urlDeleteUserApi = process.env.REACT_APP_REST_API + 'api/user/delete';
const urlEditUserApi = process.env.REACT_APP_REST_API + 'api/user/edit';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname: '',
            firstname: '',
            email: '',
            password: '',
            randomIdentifiant: '',
            validLastname: null,
            validFirstname: null,
            validEmail: null,
            validPassword: null,
            validRandomIdentifiant: null,
            loadSpinner: false,
            submitLoadSpinner: false,
            redirectToAccount: false,
            autoriseEdit: true
        };
    }

    componentDidMount() {
    }
    componentDidUpdate() {
    }

    autorisedEdit = () => {
        const action = { type: "AUTORISE_EDIT", value: this.state.autorisedEdit }
        this.props.dispatch(action)
    }

    handleLastnameChange = (e) => {
        let lastnameTarget = e.target.value;
        this.setState({ lastname: lastnameTarget });
        // Valid Lastname?
        if (lastnameTarget.length >= 2) {
            const action = { type: "VALID_LASTNAME", value: this.state.validLastname }
            this.props.dispatch(action)
        } else {
            const action = { type: "INVALID_LASTNAME", value: this.state.validLastname }
            this.props.dispatch(action)
        }
    }

    handleFirstnameChange = (e) => {
        let firstnameTarget = e.target.value;
        this.setState({ firstname: firstnameTarget });
        // Valid Lastname?
        if (firstnameTarget.length >= 2) {
            const action = { type: "VALID_FIRSTNAME", value: this.state.validFirstname }
            this.props.dispatch(action)
        } else {
            const action = { type: "INVALID_FIRSTNAME", value: this.state.validFirstname }
            this.props.dispatch(action)
        }
    }

    handleEmailChange = (e) => {
        let emailTarget = e.target.value;
        this.setState({ email: emailTarget });
        // Valid Email?
        if (emailTarget.length >= 1) {
            // Check email is valid
            if (emailTarget && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+/.test(emailTarget)) {
                const action = { type: "VALID_EMAIL", value: this.state.validEmail }
                this.props.dispatch(action)
            } else {
                const action = { type: "INVALID_EMAIL", value: this.state.validEmail }
                this.props.dispatch(action)
            }
        }
    }

    handlePasswordChange = (e) => {
        let passwordTarget = e.target.value;
        this.setState({ password: passwordTarget });
        // Valid Password?
        if (passwordTarget.length >= 1) {
            if (passwordTarget.length >= 8) {
                const action = { type: "VALID_PASSWORD", value: this.state.validPassword }
                this.props.dispatch(action)
            } else {
                const action = { type: "INVALID_PASSWORD", value: this.state.validPassword }
                this.props.dispatch(action)
            }
        }
    }

    handleRandomIdentifiantChange = (e) => {
        let randomIdentifiantTarget = e.target.value;
        this.setState({ randomIdentifiant: randomIdentifiantTarget });
        // Valid Password?
        if (randomIdentifiantTarget.length >= 1) {
            if (randomIdentifiantTarget.length >= 8) {
                const action = { type: "VALID_IDENTIFIANT", value: this.state.validRandomIdentifiant }
                this.props.dispatch(action)
            } else {
                const action = { type: "INVALID_IDENTIFIANT", value: this.state.validRandomIdentifiant }
                this.props.dispatch(action)
            }
        }
    }

    // PUT EDIT USER
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ submitLoadSpinner: true });
        const userConnected = this.props.userConnected;
        const userToken = this.props.userToken;
        var config = {
            headers: { 'Authorization': "bearer " + userToken }
        };
        var userId = userConnected.id;
        // Envoi des datas en post
        axios.put(urlEditUserApi + '/' + userId, {
            email: this.state.email,
            password: this.state.password,
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            randomIdentifiant: this.state.randomIdentifiant
        },
            config
        ).then(response => {
            this.setState({ submitLoadSpinner: false });
            const action = { type: "EDIT_SUCCESS", value: true }
            const action2 = { type: "EDIT_USER", value: response.data }
            this.props.dispatch(action)
            this.props.dispatch(action2)
        })
            .catch(error => {
                this.setState({ submitLoadSpinner: false });

                // const action = { type: "EDIT_FAILED", value: true }
                // const action3 = { type: "EDIT_FAILED_MESSAGE", value: error.response.data.message_error }
                // this.props.dispatch(action)
                // this.props.dispatch(action3)
                this.setState({ loadSpinner: false });
                // throw (error); // TODO
            });
    }

    // DELETE USER
    deleteAccount = () => {
        this.setState({ loadSpinner: true });
        const userConnected = this.props.userConnected;
        const userToken = this.props.userToken;

        var config = {
            headers: { 'Authorization': "bearer " + userToken }
        };

        var userId = userConnected.id;

        axios.delete(
            urlDeleteUserApi + '/' + userId,
            config
        ).then(response => {
            this.setState({ loadSpinner: false, redirectToAccount: true });
            // TODO redirect to home/deconnexion et message flash
        })
            .catch(error => {
                this.setState({ loadSpinner: false });
                throw (error); // TODO
            });
    }

    render() {
        // THE CONNECTED USER
        const userConnected = this.props.userConnected;
        var disabled = this.props.autoriseEdit;

        let validLastname = ["input-lastname"];
        let validFirstname = ["input-firstname"];
        let validEmail = ["input-email"];
        let validPassword = ["input-password"];
        let validRandomIdentifiant = ["input-random-identifiant"];
        if (disabled === false) {
            // LASTNAME
            if (this.props.validLastname === true) {
                validLastname.push('is-valid');
            } else if (this.props.validLastname === false) {
                validLastname.push('is-invalid');
            }
            // FIRSTNAME
            if (this.props.validFirstname === true) {
                validFirstname.push('is-valid');
            } else if (this.props.validFirstname === false) {
                validFirstname.push('is-invalid');
            }
            // EMAIL
            if (this.props.validEmail === true) {
                validEmail.push('is-valid');
            } else if (this.props.validEmail === false) {
                validEmail.push('is-invalid');
            }
            // PASSWORD
            if (this.props.validPassword) {
                validPassword.push('is-valid');
            } else if (this.props.validPassword === false) {
                validPassword.push('is-invalid');
            }
            // RANDOM IDENTIFIANT
            if (this.props.validRandomIdentifiant) {
                validRandomIdentifiant.push('is-valid');
            } else if (this.props.validRandomIdentifiant === false) {
                validRandomIdentifiant.push('is-invalid');
            }
        }


        //Redirection une fois log ou si non connecté
        const { redirectToAccount } = this.state;
        if (redirectToAccount || (this.props.userConnected == null || this.props.userConnected.length === 0)) {
            return <Redirect to='/' />;
        } else {
            return (
                <div className="account-component container-fluid">
                    <div className="account-component__title text-center">
                        <h2>Mon compte</h2>
                    </div>
                    <fieldset disabled={disabled} className="account-component__fieldset">

                        <form className="account-component__form">
                            <div className="form-group">
                                <label htmlFor="inputLastname">Nom</label>
                                <input type="text" className={"form-control " + validLastname.join(' ')} id="InputLastname" onChange={this.handleLastnameChange} value={this.state.lastname} placeholder={userConnected['lastname']} />
                                <div className="invalid-feedback">
                                    Votre nom n'est pas valide, il doit faire au minimum 2 caractéres
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputFirstname">Prénom</label>
                                <input type="text" className={"form-control " + validFirstname.join(' ')} id="InputFirstname" onChange={this.handleFirstnameChange} value={this.state.firstname} placeholder={userConnected['firstname']} />
                                <div className="invalid-feedback">
                                    Votre prénom n'est pas valide, il doit faire au minimum 2 caractéres
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail1">Adresse e-mail</label>
                                <input type="email" className={"form-control " + validEmail.join(' ')} id="InputEmail" aria-describedby="emailHelp" value={this.state.email} onChange={this.handleEmailChange} placeholder={userConnected['email']} autoComplete="off" />
                                <div className="invalid-feedback">
                                    Votre adresse email n'est pas dans un format valide
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputRandomIdentifiant">Identifiant</label>
                                <input type="text" className={"form-control " + validRandomIdentifiant.join(' ')} id="InputRandomIdentifiant" value={this.state.randomIdentifiant} onChange={this.handleRandomIdentifiantChange} placeholder={userConnected['randomIdentifiant']} />
                                <div className="invalid-feedback">
                                    Votre identifiant n'est pas valide
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword">Mot de passe</label>
                                <input type="password" className={"form-control " + validPassword.join(' ')} id="InputPassword" onChange={this.handlePasswordChange} value={this.state.password} placeholder="********" autoComplete="off" />
                                <div className="invalid-feedback">
                                    Votre mot de passe n'est pas valide, il doit faire au minimum 8 caractéres
                                </div>
                            </div>
                        </form>
                    </fieldset>
                    <div className="account-component__buttons d-flex">
                        {/* <h2>
                            {this.state.autorisedEdit}
                        </h2> */}
                        {this.props.autoriseEdit &&
                            <Button className="account-component__buttons__edit" variant="primary" onClick={this.autorisedEdit}>
                                <FontAwesomeIcon
                                    icon="user-edit"
                                />
                                &nbsp;
                                Modifier mes informations
                            </Button>
                        }
                        {!this.props.autoriseEdit &&
                            <Button className="account-component__buttons__edit" variant="primary" onClick={this.handleSubmit}>
                                {this.state.submitLoadSpinner ? (
                                    <FontAwesomeIcon
                                        icon="spinner"
                                        spin
                                    />
                                ) : (
                                        <span>
                                            Valider
                                        </span>
                                    )}
                            </Button>
                        }
                        <Button className="account-component__buttons__delete" variant="danger" onClick={this.deleteAccount}>

                            {this.state.loadSpinner ? (
                                <FontAwesomeIcon
                                    icon="spinner"
                                    spin
                                />
                            ) : (
                                    <span>
                                        <FontAwesomeIcon
                                            icon="user-slash"
                                        />
                                        &nbsp;
                                        Supprimer mon compte
                                    </span>
                                )}
                        </Button>
                    </div>
                </div >
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
        userConnected: state.user.user,
        userToken: state.user.token,
        autoriseEdit: state.account.autoriseEdit,
        // FORM FIELDS
        validEmail: state.account.validEmail,
        validPassword: state.account.validPassword,
        validLastname: state.account.validLastname,
        validFirstname: state.account.validFirstname,
        validRandomIdentifiant: state.account.validRandomIdentifiant
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);

