import './Home.css';
import MoveImg from './move.jpeg';
import KeyImg from './key.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
    Link
} from "react-router-dom";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LastLocations from '../LastLocations';
import SearchLocation from '../SearchLocation';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeNavigationDefault: 'searchLogement'
        };
    }
    toggleHomeNavigation = (searchNavigation) => {
        this.setState({ homeNavigationDefault: searchNavigation });
    }

    render() {
        return (
            <div className="home-component">
                {/* <div className="home-component__search-home text-center">
                    <div className="home-component__search-home__switch-links d-flex justify-content-between">
                        <div className={"home-component__search-home__switch-links__link " + (this.state.homeNavigationDefault === "searchLogement" ? 'bg-light' : '')} onClick={() => this.toggleHomeNavigation('searchLogement')}><h2 className={(this.state.homeNavigationDefault === "searchLogement" ? 'text-blue' : 'text-white')}>Rechercher</h2></div>
                      </div>
                    {this.state.homeNavigationDefault === 'searchLogement' &&
                        <div className="home-component__search-home__container__housing">
                            <form className="home-component__search-home__container__housing__form container">
                                <div className="form-group">
                                    <input type="text" className="form-control" id="validationCity" placeholder="Dans quelle ville? Quel quartier?" required />
                                    <div className="invalid-feedback">
                                        Veuillez choisir un nom de Ville valide.
                                        </div>
                                </div>
                                <div className="form-group">
                                    <input type="number" pattern="[0-9]*" className="form-control " id="validationPrice" placeholder="Quel prix" step="100" required />
                                    <div className="invalid-feedback">
                                        Veuillez choisir un prix composé de chiffre sans caractéres.
                                        </div>
                                </div>
                                <div className="form-group form-check-inline home-component__search-home__container__housing__form__check-box">
                                    <input type="checkbox" className="form-check-input" id="logement-type_1" />
                                    <label className="form-check-label" htmlFor="logement-type_1">Maison</label>
                                    <input type="checkbox" className="form-check-input" id="logement-type_2" />
                                    <label className="form-check-label" htmlFor="logement-type_2">Appartement</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Rechercher</button>
                            </form>
                            <small><Link className="text-primary" to="/advanced-search"><h2>Recherche avancée</h2></Link></small>
                        </div>
                    }
                </div> */}

                <SearchLocation />
                <LastLocations />
            </div >
        );
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
        user: state.connexion.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

