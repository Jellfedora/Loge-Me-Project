import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// const urlConnexionApi = 'http://127.0.0.1:8000/api/login_check';

const urlConnexionApi = process.env.REACT_APP_REST_API + 'api/login_check';


class Connexion extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            validEmail: null,
            validPassword: null,
            user: [],
            loadSpinner: false,
            redirectToAccount: false,
        };
    }
    componentDidMount() {
    }

    componentDidUpdate() {
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loadSpinner: true });
        axios.post(urlConnexionApi, {
            username: this.state.email,
            password: this.state.password
        })
            .then(response => {
                const action = { type: "SAVE_USER", value: response.data }
                this.props.dispatch(action)
                this.setState({ loadSpinner: false, redirectToAccount: true });
            })
            .catch(error => {
                const action = { type: "CONNEXION_FAILED", value: true }
                this.props.dispatch(action)
                this.setState({ loadSpinner: false });
            });
    }


    handleEmailChange = (e) => {
        let emailTarget = e.target.value;
        this.setState({ email: emailTarget });
        // Valid Email?
        if (emailTarget.length >= 3) {
            this.setState({ emailAddClass: true })
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

    resetConnectUserFailed() {
        const action = { type: "CONNEXION_FAILED", value: false }
        this.props.dispatch(action)
    }

    render() {
        // Si message flash fermé on reset l'appel de connexion pour permettre au flash de reaparaitre
        if (this.props.resetConnectUserFailed === true) {
            this.resetConnectUserFailed();
        }

        let validEmail = ["input-email"];
        if (this.props.validEmail === true) {
            validEmail.push('is-valid');
        } else if (this.props.validEmail === false) {
            validEmail.push('is-invalid');
        }
        let validPassword = ["input-password"];
        if (this.props.validPassword) {
            validPassword.push('is-valid');
        } else if (this.props.validPassword === false) {
            validPassword.push('is-invalid');
        }

        //Redirection une fois log
        const { redirectToAccount } = this.state;
        if (redirectToAccount) {
            return <Redirect to='/account' />;
        } else {
            return (

                <div className="connexion-component">
                    {/* <button className="ui button">Show Modal</button> */}
                    <div className="connexion-component__title text-center">
                        <h2>Formulaire de connexion</h2>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                                <FontAwesomeIcon
                                    icon="at"
                                />
                                &nbsp; Adresse e-mail
                            </label>
                            <input type="email" className={"form-control " + validEmail.join(' ')} id="InputEmail" aria-describedby="emailHelp" value={this.state.email} onChange={this.handleEmailChange} />
                            <small id="emailHelp" className="form-text text-muted">Votre adresse e-mail ne sera utilisée que pour vous connectez et envoyer occasionnellement notre newsletter.</small>
                            <div className="invalid-feedback">
                                Votre adresse email est invalide
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                                <FontAwesomeIcon
                                    icon="key"
                                />
                                &nbsp; Mot de Passe
                            </label>
                            <input type="password" className={"form-control " + validPassword.join(' ')} id="InputPassword" value={this.state.password} onChange={this.handlePasswordChange} />
                            <div className="invalid-feedback">
                                Votre mot de passe est trop court, il doit faire au moins 8 caractéres
                            </div>
                        </div>
                        <div className="connexion-component__link-register">
                            <small>
                                <Link className="nav-link-blue" to="/register">Pas encore inscrit?</Link>
                            </small>
                        </div>
                        <div className="connexion-component__forgot-password">
                            <small>
                                <Link className="nav-link-blue" to="/password-forgot">Mot de passe perdu?</Link>
                            </small>
                        </div>
                        {this.props.validEmail && this.props.validPassword === true &&
                            <div className="text-center">

                                <button className="btn btn-primary" onClick={this.handleSubmit}>
                                    {this.state.loadSpinner ? (
                                        <FontAwesomeIcon
                                            icon="spinner"
                                            spin
                                        />
                                    ) : (
                                            <span>Se connecter</span>
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
        validEmail: state.connexion.validEmail,
        validPassword: state.connexion.validPassword,
        user: state.connexion.user,
        resetConnectUserFailed: state.flashMessages.resetConnectUserFailed
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Connexion);

