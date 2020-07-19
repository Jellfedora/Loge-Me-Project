import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Link
} from "react-router-dom";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import ImgTest from './illustration-location.jpg';
import ImgTest2 from './illustration-location4.jpg';
import ImgTest3 from './illustration-location5.jpg';
const urlGetHousings = process.env.REACT_APP_REST_API + 'housing/gethousings';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // logementType: 0,
            // localisation: '',
            // localisationChoice: [],
            // showLocalisationChoice: false,
            // rent: 0,
            // area: 0,
            // redirectToResults: false
        };
    }

    componentDidMount() {
        this.getHousings();
    }

    getHousings = () => {
        if ((this.props.search !== null)) {
            const rentMax = this.props.search[2];
            const logementType = this.props.search[0];
            const area = this.props.search[3];
            const cityCode = this.props.search[1];

            axios.get(urlGetHousings + '/' + rentMax + '/' + logementType + '/' + area + '/' + cityCode,
            ).then(response => {
                if (response.data.data.status === 204) {
                    const action = { type: "GET_SEARCH_HOUSINGS", value: 204 }
                    this.props.dispatch(action)
                } else {
                    const action = { type: "GET_SEARCH_HOUSINGS", value: response.data.data.searchHousings }
                    this.props.dispatch(action)
                }
            })
        }

    }

    render() {
        const results = []

        if (this.props.searchResults == null) {
            results.push(<span key='1' >Désolé il n'y a pas de résultats correspondants à vos critéres</span>);
        } else {
            for (const [index, value] of this.props.searchResults.entries()) {
                // Description
                const description = value.description;
                const des = description.substr(0, 100);
                // Rating
                let ratingArray = [];
                let rating = value.rating;
                if (rating == 0) {
                    ratingArray = "Pas encore évalué"
                } else {
                    if (rating !== 0) {
                        for (let index = 0; index < rating; index++) {
                            const goodRating = <span key={'good' + index}><FontAwesomeIcon icon="key" color="#007bff" /></span>;
                            ratingArray.push(goodRating)
                        }
                        const note = 5 - rating;
                        for (let index = 0; index < note; index++) {
                            const greyRating = <span key={'grey' + index}><FontAwesomeIcon icon="key" color="grey" /></span>
                            ratingArray.push(greyRating)
                        }
                    }
                }

                results.push(
                    < div key={index} className="home-component__new-housings__housing" >
                        <Carousel className="home-component__new-housings__housing__carousel"
                            showThumbs={false}
                            showStatus={false}
                            autoPlay={true}
                            infiniteLoop={true}
                            transitionTime={2000}
                        >
                            <div style={{ backgroundImage: `url(${ImgTest2})` }} className="home-component__new-housings__housing__carousel__img">
                                <img src="" alt="" />
                            </div>
                            <div style={{ backgroundImage: `url(${ImgTest3})` }} className="home-component__new-housings__housing__carousel__img">
                                <img src="" alt="" />
                            </div>
                            <div className="home-component__new-housings__housing__carousel__img">
                                <img src={ImgTest} className="home-component__new-housings__housing__carousel__img" alt="" />
                            </div>
                        </Carousel>

                        <Link className="home-component__new-housings__housing__container" to={'/post/' + value.id}>
                            <div className="home-component__new-housings__housing__container__top">
                                <div className="home-component__new-housings__housing__container__top__type">
                                    <span>Appartement</span>
                                </div>
                                <div className="home-component__new-housings__housing__container__top__rent">
                                    <span className="home-component__new-housings__housing__container__top__rent__price">{value.monthlyRent} &euro; </span>
                                    <span className="home-component__new-housings__housing__container__top__rent__info">cc /mois</span>
                                </div>
                            </div>
                            <div className="home-component__new-housings__housing__container__informations">
                                <span>{value.area}m2</span>
                                <span> / {value.numberOfPieces}p / </span>
                                <span>{value.numberOfBedrooms}ch</span>
                            </div>
                            <span className="home-component__new-housings__housing__container__localisation">{value.city} {value.cityCode}</span>
                            <p className="home-component__new-housings__housing__container__description">{des}...</p>
                            <div className="home-component__new-housings__housing__container__rating">
                                {ratingArray}
                            </div>
                        </Link>
                    </div >
                )
            }
        }
        // Redirect si la recherche n'a pas été soumise
        if ((this.props.search == null)) {
            return <Redirect to='/' />;
        } else {
            return (
                <div className="search-results-components text-center mt-5">
                    <div className="search-results-components__title text-center">
                        <h2 style={{ marginBottom: 1 + 'em' }}>Résultat de votre recherche</h2>
                    </div>
                    <div className="search-results-components__container">
                        {results}
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

        search: state.searchLocation.search,
        searchResults: state.searchResults.searchResults,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

