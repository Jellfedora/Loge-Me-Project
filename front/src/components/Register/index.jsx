
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// const urlRegisterApi = 'http://localhost/loge-me/rest-api_ci/index.php/user/add';
const urlRegisterApi = process.env.REACT_APP_REST_API + 'user/create';
class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            lastname: '',
            firstname: '',
            email: '',
            password: '',
            cguIsChecked: false,
            validLastname: null,
            validFirstname: null,
            validEmail: null,
            validPassword: null,
            loadSpinner: false,
            redirectToConnexion: false
        };
    }
    componentDidMount() {
    }

    componentDidUpdate() {
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
        if (emailTarget.length >= 3) {
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

    handleCheckboxChange = () => {
        this.setState({
            cguIsChecked: !this.state.cguIsChecked,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loadSpinner: true });
        // Envoi des datas en post
        axios.post(urlRegisterApi, {
            email: this.state.email,
            password: this.state.password,
            lastname: this.state.lastname,
            firstname: this.state.firstname
        })
            .then(response => {
                this.setState({ loadSpinner: false, redirectToConnexion: true });
                const action = { type: "REGISTER_SUCCESS", value: true }
                this.props.dispatch(action)
            })
            .catch(error => {
                const action = { type: "REGISTER_FAILED", value: true }
                const action2 = { type: "REGISTER_FAILED_MESSAGE", value: error.response.data.message_error }
                this.props.dispatch(action)
                this.props.dispatch(action2)
                this.setState({ loadSpinner: false });
            });
    }

    resetRegisterUserFailed() {
        const action = { type: "REGISTER_FAILED", value: false }
        this.props.dispatch(action)
    }

    render() {
        // Si message flash fermé on reset l'appel de register pour permettre au flash de reaparaitre
        if (this.props.resetRegisterUserFailed === true) {
            this.resetRegisterUserFailed();
        }

        let validLastname = ["input-lastname"];
        let validFirstname = ["input-firstname"];
        let validEmail = ["input-email"];
        let validPassword = ["input-password"];
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

        //Redirection une fois enregistré
        const { redirectToConnexion } = this.state;
        if (redirectToConnexion) {
            return <Redirect to='/connexion' />;
        } else {
            return (
                <div className="register-component">
                    <div className="register-component__title text-center">
                        <h2>Formulaire d'inscription</h2>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="formLastname">Nom</label>
                            <input type="text" className={"form-control " + validLastname.join(' ')} id="InputLastname" onChange={this.handleLastnameChange} value={this.state.lastname} />
                            {/* <input type="password" className={"form-control " + validLastname.join(' ')} id="InputPassword" value={this.state.lastname} onChange={this.handleLastnameChange} /> */}
                            <div className="invalid-feedback">
                                Votre nom est incorrect
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formFirstname">Prénom</label>
                            <input type="text" className={"form-control " + validFirstname.join(' ')} id="InputFirstname" onChange={this.handleFirstnameChange} value={this.state.firstname} />
                            <div className="invalid-feedback">
                                Votre nom est incorrect
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Adresse e-mail</label>
                            <input type="email" className={"form-control " + validEmail.join(' ')} id="InputEmail" aria-describedby="emailHelp" value={this.state.email} onChange={this.handleEmailChange} />
                            <small id="emailHelp" className="form-text text-muted">Votre adresse e-mail ne sera utilisée que pour vous connectez et envoyer occasionnellement notre newsletter.</small>
                            <div className="invalid-feedback">
                                Votre adresse email est incorrecte
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Mot de Passe</label>
                            <input type="password" className={"form-control " + validPassword.join(' ')} id="InputPassword" value={this.state.password} onChange={this.handlePasswordChange} />
                            <div className="invalid-feedback">
                                Votre mot de passe est incorrect
                            </div>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" defaultChecked={this.state.isChecked} onChange={this.handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="exampleCheck1">J'accepte les conditions d'utilisations</label>
                            <div className="invalid-feedback">
                                Veuillez choisir un nom de Ville valide.
                            </div>
                        </div>
                        <div className="register-component__link-connexion">
                            <small>
                                <a href="/connexion">Déjà inscrit?</a>
                            </small>
                        </div>
                        {this.props.validLastname && this.props.validFirstname && this.props.validEmail && this.props.validPassword && this.state.cguIsChecked === true &&
                            <div className="text-center">
                                <button className="btn btn-primary" onClick={this.handleSubmit}>
                                    {this.state.loadSpinner ? (
                                        <FontAwesomeIcon
                                            icon="spinner"
                                            spin
                                        />
                                    ) : (
                                            <span>S'inscrire</span>
                                        )}
                                </button>
                            </div>
                        }
                    </form>
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
        validLastname: state.register.validLastname,
        validFirstname: state.register.validFirstname,
        validEmail: state.register.validEmail,
        validPassword: state.register.validPassword,
        resetRegisterUserFailed: state.flashMessages.resetRegisterUserFailed
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

