import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
    Link
} from "react-router-dom";
import axios from 'axios';
import { Redirect } from "react-router-dom";

class SearchLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logementType: 0,
            localisation: '',
            localisationChoice: [],
            showLocalisationChoice: false,
            rent: undefined,
            area: undefined,
            redirectToResults: false
        };
    }

    logementTypeChange = (event) => {
        this.setState({ logementType: event.target.value });
    }

    rentChange = (event) => {
        this.setState({ rent: event.target.value });
    }

    areaChange = (event) => {
        this.setState({ area: event.target.value });
    }

    handleLocalisationChange = (e) => {
        this.setState({ showLocalisationChoice: true });
        let localisationTarget = e.target.value;
        this.setState({ localisation: localisationTarget });
        axios.get('https://api-adresse.data.gouv.fr/search/', {
            params: {
                "q": localisationTarget,
                "limit": 5,
                "type": 'municipality'
            }
        })
            .then(response => {
                this.setState({ localisationChoice: response.data.features });
                const action = { type: "LOCALISATION_IS_SELECT", value: true }
                this.props.dispatch(action)
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let submitArray = [];
        // Récupére chiffre dans une string
        let postcode = this.state.localisation.match(/\d+/g).join('')

        submitArray.push(this.state.logementType);
        submitArray.push(postcode);
        submitArray.push(this.state.rent);
        submitArray.push(this.state.area);
        const action = { type: "ADD_SEARCH", value: submitArray };
        this.props.dispatch(action)
        this.setState({ redirectToResults: true });
    }

    render() {
        let localisationChoice = this.state.localisationChoice;
        let localisationOption = [];
        for (const [index, value] of localisationChoice.entries()) {
            localisationOption.push(
                <option key={index} onChange={event => this.selectAdress(event)}>{value.properties.city} ({value.properties.postcode})</option>
            )
        }

        //Redirection une fois log
        const { redirectToResults } = this.state;
        if (redirectToResults) {
            return <Redirect to='/search-results' />;
        } else {
            return (
                <div className="search-location text-center">
                    <div className="search-location__title text-center">
                        <h2>Trouvez votre futur logement !</h2>
                    </div>
                    <Form className="search-location__form">
                        <Form.Group className="search-location__form__logement-type" controlId="logementType">
                            <Form.Control className="search-location__form__logement-type__select" as="select" onChange={this.logementTypeChange} value={this.state.logementType}>
                                <option className="search-location__form__logement-type__select__option" value="0">Type de logement</option>
                                <option className="search-location__form__logement-type__select__option" value="1">Appartement</option>
                                <option className="search-location__form__logement-type__select__option" value="2">Maison</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="search-location__form__localisation" controlId="localisation">
                            <input className="search-location__form__localisation__form-input" type="text" list="city" value={this.state.localisation || ''} onChange={this.handleLocalisationChange} placeholder="Ville, code postal" />
                            <datalist id="city"  >
                                {localisationOption}
                            </datalist>

                        </Form.Group>
                        <Form.Group className="search-location__form__rent" controlId="rent">
                            <Form.Control className="search-location__form__rent__form-input" type="number" value={this.state.rent} onChange={this.rentChange} min="50" step="50" placeholder="Budget max" />
                        </Form.Group>
                        <Form.Group className="search-location__form__area" controlId="area">
                            <Form.Control className="search-location__form__area__form-input" type="number" value={this.state.area} onChange={this.areaChange} min="0" step="5" placeholder="Surface min" />
                        </Form.Group>
                        {this.props.localisationIsSelect === true &&
                            <div className="text-center">
                                <Button onClick={this.handleSubmit}>
                                    Rechercher
                        </Button>
                            </div>
                        }
                    </Form>
                    <small className="search-location__advanced-search-link text-left"><Link className="text-primary" to="/advanced-search"><h2>Recherche avancée</h2></Link></small>
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
        localisationIsSelect: state.searchLocation.localisationIsSelect,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);

