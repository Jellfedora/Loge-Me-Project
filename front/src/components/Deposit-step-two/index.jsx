import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';

class DepositStepTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logementType: 0,
            area: 0,
            pieces: 0,
            bedrooms: 0,
            description: '',
            energy: 'baobab',
            gas: 'baobab',
            isGround: false

        };
    }

    logementTypeChange = (event) => {
        if (event.target.value == 3) {
            this.setState({ isGround: true, logementType: event.target.value });
        } else {
            this.setState({ isGround: false, logementType: event.target.value });
            const action = { type: "LOGEMENT_TYPE_IS_DONE", value: event.target.value }
            this.props.dispatch(action)
        }
    }

    areaChange = (event) => {
        this.setState({ area: event.target.value });
        const action = { type: "AREA_IS_DONE", value: event.target.value }
        this.props.dispatch(action)
    }

    piecesChange = (event) => {
        this.setState({ pieces: event.target.value });
    }

    bedroomsChange = (event) => {
        this.setState({ bedrooms: event.target.value });
    }

    descriptionChange = (event) => {
        this.setState({ description: event.target.value });
        const action = { type: "DESCRIPTION_IS_DONE", value: event.target.value }
        this.props.dispatch(action)
    }

    energyChange = (event) => {
        this.setState({ energy: event.target.value });
    }

    gasChange = (event) => {
        this.setState({ gas: event.target.value });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const action = { type: "STEP_TWO_SUBMIT", value: true };
        this.props.dispatch(action)

        const action2 = { type: "LOGEMENT_INFORMATION", value: this.state }
        this.props.dispatch(action2)
    }




    render() {
        return (
            <div className="deposit-component__step-two">
                <div className="deposit-component__title text-center">
                    <h2>Informations sur votre logement</h2>
                </div>
                <div className="deposit-component__step-two__form__container form-group">
                    <Form className="deposit-component__step-two__form">
                        <Form.Group className="deposit-component__step-two__form__group__logement-type" controlId="logementType">
                            <Form.Label>Type de Logement</Form.Label>
                            <Form.Control as="select" onChange={this.logementTypeChange} value={this.state.logementType}>
                                <option value="0">Choisir</option>
                                <option value="1">Appartement</option>
                                <option value="2">Maison</option>
                                <option value="3">Terrain</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="deposit-component__step-two__form__isNotGround">
                            <Form.Group className="deposit-component__step-two__form__group__area" controlId="area">
                                <Form.Label>Surface Totale <small>(m2)</small></Form.Label>
                                <Form.Control className="deposit-component__step-two__form__group__area__form-input" type="number" value={this.state.area} onChange={this.areaChange} min="0" />
                            </Form.Group>
                            {this.state.isGround === false &&
                                <Form.Group className="deposit-component__step-two__form__group__pieces" controlId="pieces">
                                    <Form.Label>Nombre de Pièces</Form.Label>
                                    <Form.Control className="deposit-component__step-two__form__group__pieces__form-input" type="number" value={this.state.pieces} onChange={this.piecesChange} min="0" />
                                </Form.Group>
                            }
                            {this.state.isGround === false &&
                                <Form.Group className="deposit-component__step-two__form__group__bedrooms" controlId="bedrooms">
                                    <Form.Label>Nombre de Chambres</Form.Label>
                                    <Form.Control className="deposit-component__step-two__form__group__bedrooms__form-input" type="number" value={this.state.bedrooms} onChange={this.bedroomsChange} min="0" />
                                </Form.Group>
                            }
                        </div>
                        <Form.Group className="deposit-component__step-two__form__group__description" controlId="description">
                            <Form.Label>Texte de L'annonce</Form.Label>
                            <Form.Control className="deposit-component__step-two__form__group__description__form-input" as="textarea" rows="4" value={this.state.description} onChange={this.descriptionChange} placeholder="Ensoleillé toute la journée, profitez d'un emplacement idéal proche du marché, convivial et animé. Le salon vous ravira par ses volumes accueillants..." />
                            <small className="form-text text-muted">Éviter de répéter des informations déjà précisées et ne pas oublier de parler :</small>
                            <small className="text-muted">
                                <ul>
                                    <li>- des atouts du bien</li>
                                    <li>- de l'ambiance du quartier</li>
                                    <li>- des commerces aux alentours</li>
                                    <li>- des transports en commun</li>
                                </ul>
                            </small>
                        </Form.Group>
                        {this.state.isGround === false &&
                            <Form.Group className="deposit-component__step-two__form__group__energy" controlId="energy">
                                <Form.Label>Consommation Energétique <small>(Optionnel)</small></Form.Label>
                                <Form.Control className="deposit-component__step-two__form__group__energy__form-input" as="select" value={this.state.energy} onChange={this.energyChange}>
                                    <option>Choisir</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                    <option>D</option>
                                    <option>E</option>
                                    <option>F</option>
                                    <option>G</option>
                                </Form.Control>
                            </Form.Group>
                        }
                        {this.state.isGround === false &&
                            <Form.Group className="deposit-component__step-two__form__group__gas" controlId="gas">
                                <Form.Label>Emissions De Gaz à Effet De Serre <small>(Optionnel)</small></Form.Label>
                                <Form.Control className="deposit-component__step-two__form__group__gas__form-input" as="select" value={this.state.gas} onChange={this.gasChange}>
                                    <option>Choisir</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                    <option>D</option>
                                    <option>E</option>
                                    <option>F</option>
                                    <option>G</option>
                                </Form.Control>
                            </Form.Group>
                        }
                        {this.props.logementType !== "0" && this.props.area !== "0" && this.props.description !== "" &&
                            <div className="text-center">
                                <button className="btn btn-primary deposit-component__form__container__submit-form" onClick={this.handleSubmit}>
                                    <span>Valider ces informations</span>
                                </button>
                            </div>
                        }
                    </Form>

                </div>
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
        formIsValid: state.depositStepTwo.formIsValid,
        logementType: state.depositStepTwo.logementType,
        area: state.depositStepTwo.area,
        description: state.depositStepTwo.description,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DepositStepTwo);
