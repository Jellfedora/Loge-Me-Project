import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


import { connect } from 'react-redux';
import StepOne from '../Deposit-step-one';
import StepTwo from '../Deposit-step-two';
import StepThree from '../Deposit-step-three';


class Deposit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitAdress: false,
            stepOneSubmit: false,
            stepTwoSubmit: false,
            stepThreeSubmit: false,
            stepOne: true,
            stepTwo: false,
            stepThree: false,
        };
    }

    componentDidUpdate() {
        if (this.props.stepOneSubmit === true && this.state.stepOneSubmit === false) {
            this.setState({ stepOne: false, stepTwo: true, stepThree: false, stepOneSubmit: true, });
        }

        if (this.props.stepTwoSubmit === true && this.state.stepTwoSubmit === false) {
            this.setState({ stepOne: false, stepTwo: false, stepThree: true, stepTwoSubmit: true });
        }

        if (this.props.stepThreeSubmit === true && this.state.stepThreeSubmit === false) {
            this.setState({ stepOne: false, stepTwo: false, stepThree: false, stepThreeSubmit: true });
        }

    }


    showStepOne = () => {
        this.setState({ stepOne: true, stepTwo: false, stepThree: false });
    }
    showStepTwo = () => {
        this.setState({ stepOne: false, stepTwo: true, stepThree: false });
    }
    showStepThree = () => {
        this.setState({ stepOne: false, stepTwo: false, stepThree: true });
    }

    render() {


        //Redirection si non connecté
        const { redirectToAccount } = this.state;
        if (redirectToAccount || (this.props.userConnected == null || this.props.userConnected.length === 0)) {
            return <Redirect to='/' />;
            //Redirection si compte propriétaire pas encore créé
        } else if (this.props.userIsOwner.owner == null) {
            return <Redirect to='/become-owner' />;
        } else {
            return (
                // Si deja this.props.userIsOwner pas d'étape 4
                <div className="deposit-component">
                    <div className="deposit-component__step-counter">
                        <ul className="progressbar">
                            <li className={['deposit-component__step-counter__step ' + (this.state.stepOne ? 'active' : '')]} onClick={this.showStepOne}>Adresse</li>
                            <li className={['deposit-component__step-counter__step ' + (this.state.stepTwo ? 'active' : '')]} onClick={this.showStepTwo}>Details</li>
                            <li className={['deposit-component__step-counter__step ' + (this.state.stepThree ? 'active' : '')]} onClick={this.showStepThree}>Photos</li>
                            {/* <li className={['deposit-component__step-counter__step ' + (this.state.stepFour ? 'active' : '')]} onClick={this.showStepFour}>Vos informations</li> */}
                        </ul>
                    </div>

                    {this.state.stepOne &&
                        <StepOne />
                    }
                    {this.state.stepTwo &&
                        <StepTwo />
                    }
                    {this.state.stepThree &&
                        <StepThree />
                    }
                    {/* {this.state.stepFour &&
                        <StepFour />
                    } */}
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
        submitAdress: state.depositStepOne.submitAdress,
        stepOneSubmit: state.depositStepOne.stepOneSubmit,
        stepTwoSubmit: state.depositStepTwo.stepTwoSubmit,
        stepThreeSubmit: state.depositStepThree.stepThreeSubmit,
        userIsOwner: state.user.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Deposit);

