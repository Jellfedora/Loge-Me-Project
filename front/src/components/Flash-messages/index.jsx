import { connect } from 'react-redux';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class FlashMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connectUserSuccessShow: true,
            registerUserSuccessShow: true,
            editUserSuccessShow: true
        };
    }

    // Register success
    setRegisterUserSuccessHide = () => {
        this.setState({ registerUserSuccessShow: false })
    }

    // Register failed
    setRegisterUserFailedHide = () => {
        const action = { type: "RESET_REGISTER_USER_FAILED", value: true }
        this.props.dispatch(action)
    }

    // Edit user success
    setEditUserSuccessHide = () => {
        this.setState({ editUserSuccessShow: false })
    }

    // Edit user failed
    setEditUserFailedHide = () => {
        const action = { type: "RESET_EDIT_USER_FAILED", value: true }
        this.props.dispatch(action)
    }

    resetflashRegisterUserFailed() {
        const action = { type: "RESET_REGISTER_USER_FAILED", value: false }
        this.props.dispatch(action)
    }



    // Connexion failed
    setConnectUserFailedHide = () => {
        const action = { type: "RESET_CONNECT_USER_FAILED", value: true }
        this.props.dispatch(action)
    }

    resetflashConnectUserFailed() {
        const action = { type: "RESET_CONNECT_USER_FAILED", value: false }
        this.props.dispatch(action)
    }

    // Connexion success
    setConnectUserSuccessHide = () => {
        this.setState({ connectUserSuccessShow: false })
    }

    showFailedMessageForEditUser = (failedMessage) => {
        let failedMessageContainer = []

        if (failedMessage) {

            for (let i = 0; i < failedMessage.length; i++) {
                failedMessageContainer.push(<p key={i} >{failedMessage[i]}</p>)
            }
        }
        return failedMessageContainer
    }

    // Hide setTimeout
    // automaticHideFlash = (flashMessageToHide) => {
    //     setTimeout(() => {
    //         flashMessageToHide()
    //     }, 5000);
    // }

    render() {
        // Hide automaticaly flashMessage
        const setEditUserFailedHide = this.setEditUserFailedHide;
        const setRegisterUserSuccessHide = this.setRegisterUserSuccessHide;
        const setRegisterUserFailedHide = this.setRegisterUserFailedHide;
        const setConnectUserFailedHide = this.setConnectUserFailedHide;
        const setConnectUserSuccessHide = this.setConnectUserSuccessHide;
        const setEditUserSuccessHide = this.setEditUserSuccessHide;

        // Edit user success
        if (this.props.editUserSuccess === true) {
            if (this.state.editUserSuccessShow) {
                // this.automaticHideFlash(setRegisterUserSuccessHide);
                return (
                    <Alert className="flash-message__success" onClose={setEditUserSuccessHide} dismissible>
                        <Alert.Heading>Modifications réussies!</Alert.Heading>
                    </Alert>
                );
            } else {
                return null
            }
        }

        // Edit user failed
        if (this.props.editUserFailed === true) {
            // this.automaticHideFlash(setRegisterUserFailedHide);
            return (
                <Alert className="flash-message__error" onClose={setEditUserFailedHide} dismissible>
                    <Alert.Heading>Veuillez corriger les erreurs ci-dessous et réessayer</Alert.Heading>
                    <div>{this.showFailedMessageForEditUser(this.props.editUserFailedMessage)}</div>


                </Alert>
            );
        } else {
            this.resetflashRegisterUserFailed();
        }

        // Register success
        if (this.props.registerUserSuccess === true) {
            if (this.state.registerUserSuccessShow) {
                // this.automaticHideFlash(setRegisterUserSuccessHide);
                return (
                    <Alert className="flash-message__success" onClose={setRegisterUserSuccessHide} dismissible>
                        <Alert.Heading>Inscription réussie!</Alert.Heading>
                        <p>
                            Veuillez vous connecter pour accéder à votre compte
                        </p>
                    </Alert>
                );
            } else {
                this.setRegisterUserSuccessHide();
            }
        }

        // Register failed
        if (this.props.registerUserFailed === true) {
            // this.automaticHideFlash(setRegisterUserFailedHide);
            return (
                <Alert className="flash-message__error" onClose={setRegisterUserFailedHide} dismissible>
                    <Alert.Heading>Veuillez réessayer</Alert.Heading>
                    <p>{this.props.registerUserFailedMessage}</p>
                </Alert>
            );
        } else {
            this.resetflashRegisterUserFailed();
        }

        // Connexion failed
        if (this.props.connectUserFailed === true) {
            // this.automaticHideFlash(setConnectUserFailedHide);
            return (
                <Alert className="flash-message__error" onClose={setConnectUserFailedHide} dismissible>
                    <Alert.Heading>Identifiants invalides</Alert.Heading>
                    <p>
                        L'adresse e-mail et le mot de passe que vous avez entrés ne correspondent pas à ceux présents dans nos fichiers. Veuillez vérifier et réessayer.
                        </p>
                </Alert>
            );
        } else {
            this.resetflashConnectUserFailed();
        }

        // Connexion success
        if (this.props.connectUserSuccess.length !== 0) {
            if (this.state.connectUserSuccessShow) {
                // this.automaticHideFlash(setConnectUserSuccessHide);
                return (
                    <Alert className="flash-message__success" onClose={setConnectUserSuccessHide} dismissible>
                        <Alert.Heading>Connexion réussie!</Alert.Heading>
                        <p>
                            Bienvenue {this.props.connectUserSuccess.firstname} {this.props.connectUserSuccess.lastname} !
                        </p>
                    </Alert>
                );
            } else {
                return null
            }
        } else {
            return null
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
        connectUserSuccess: state.connexion.user,
        connectUserFailed: state.connexion.connexionFailed,
        registerUserSuccess: state.register.registerSuccess,
        registerUserFailed: state.register.registerFailed,
        registerUserFailedMessage: state.register.registerFailedMessage,
        forgotPasswordSuccess: state.forgotPassword.success,
        editUserSuccess: state.account.editSuccess,
        editUserFailed: state.account.editFailed,
        editUserFailedMessage: state.account.editUserFailedMessage,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlashMessages);

