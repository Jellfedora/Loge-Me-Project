import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
// const urlConnexionApi = 'http://127.0.0.1:8000/api/login_check';

const urlForgotPasswordApi = 'http://127.0.0.1:8000/user/passwordForgot';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            validEmail: null,
            loadSpinner: false,
            redirectToConnexion: false,
        };
    }
    componentDidMount() {
    }

    componentDidUpdate() {
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

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loadSpinner: true });
        axios.post(urlForgotPasswordApi, {
            email: this.state.email,
        })
            .then(response => {
                const action = { type: "SEND-MAIL-SUCCESS" }
                this.props.dispatch(action)
                this.setState({ loadSpinner: false, redirectToConnexion: true });
            })
            .catch(error => {
                const action = { type: "SEND-MAIL-ERROR" }
                this.props.dispatch(action)
                this.setState({ loadSpinner: false });
            });

    }


    render() {
        let validEmail = ["input-email"];
        if (this.props.validEmail === true) {
            validEmail.push('is-valid');
        } else if (this.props.validEmail === false) {
            validEmail.push('is-invalid');
        }

        //Redirection une fois log
        const { redirectToConnexion } = this.state;
        if (redirectToConnexion) {
            return <Redirect to='/connexion' />;
        } else {
            return (

                <div className="forgot-password-component container-fluid">
                    {/* <button className="ui button">Show Modal</button> */}
                    <div className="forgot-password-component__title text-center">
                        <h2>Mot de passe perdu</h2>
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
                            <small id="emailHelp" className="form-text text-muted">Votre adresse e-mail est nécessaire pour vous envoyer votre nouveau mot de passe à celle ci.</small>
                            <div className="invalid-feedback">
                                Cette adresse e-mail est incorrecte
                            </div>
                        </div>
                        {this.props.validEmail === true &&
                            <div className="text-center">

                                <button className="btn btn-primary" onClick={this.handleSubmit}>
                                    {this.state.loadSpinner ? (
                                        <FontAwesomeIcon
                                            icon="spinner"
                                            spin
                                        />
                                    ) : (
                                            <span>Réinitialiser mon mot de passe</span>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

