
import ImgTest from './illustration-location.jpg';
import ImgTest2 from './illustration-location4.jpg';
import ImgTest3 from './illustration-location5.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from "react-router-dom";

const urlGetLastApartments = process.env.REACT_APP_REST_API + 'housing/lastApartments';
// Unsplash Api TODO
// const UnsplashApiKey = process.env.REACT_APP_UNSPLASH_API_KEY;
// const urlGetRandomImagesUnsplash = 'https://api.unsplash.com/photos/home/?client_id=';

class LastLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.getLastApartments();
    }

    getLastApartments = () => {
        axios.get(urlGetLastApartments
        ).then(response => {
            const action = { type: "GET_HOUSINGS", value: response.data.data }
            this.props.dispatch(action)
        })
    }

    render() {
        const apartments = []
        const houses = []
        const grounds = []
        if (this.props.lastApartments) {
            for (const [index, value] of this.props.lastApartments.entries()) {
                // Description
                const description = value.description;
                const des = description.substr(0, 100);
                // Rating
                let ratingArray = [];
                let rating = value.rating;
                if (rating === 0) {
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


                apartments.push(
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
            for (const [index, value] of this.props.lastHouses.entries()) {
                // Description
                const description = value.description;
                const des = description.substr(0, 100);
                // Rating
                let ratingArray = [];
                let rating = value.rating;
                if (rating === 0) {
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


                houses.push(
                    < div key={index} className="home-component__new-housings__housing" >
                        <Carousel className="home-component__new-housings__housing__carousel"
                            showThumbs={false}
                            showStatus={false}
                            autoPlay={true}
                            infiniteLoop={true}
                            transitionTime={2000}
                        >
                            <div style={{ backgroundImage: `url(${ImgTest})` }} className="home-component__new-housings__housing__carousel__img">
                                <img src="" alt="" />
                            </div>
                            <div style={{ backgroundImage: `url(${ImgTest})` }} className="home-component__new-housings__housing__carousel__img">
                                <img src="" alt="" />
                            </div>
                            <div className="home-component__new-housings__housing__carousel__img">
                                <img src={ImgTest} className="home-component__new-housings__housing__carousel__img" alt="" />
                            </div>
                        </Carousel>

                        <Link className="home-component__new-housings__housing__container" to={'/post/' + value.id}>
                            <div className="home-component__new-housings__housing__container__top">
                                <div className="home-component__new-housings__housing__container__top__type">
                                    <span>Maison</span>
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
            return (
                < div className="home-component__new-housings" >
                    {/* <h2 className="home-component__new-housings__title text-center">Dernier appartement posté !</h2>
                    {apartments}
                    <h2 className="home-component__new-housings__title text-center">Dernière maison ajoutée !</h2>
                    {houses} */}
                    <h2 className="home-component__new-housings__title">Derniers logements ajoutés</h2>
                    <div className="home-component__new-housings__container">
                        {apartments}
                        {houses}
                    </div>
                    {/* <h2 className="home-component__new-housings__title text-center">Derniers terrains postés !</h2> */}
                    {/* {apartments} */}
                </div >
            );
        } else {
            return false;
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
        lastApartments: state.lastLocations.lastApartments,
        lastHouses: state.lastLocations.lastHouses,
        lastGrounds: state.lastLocations.lastGrounds,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LastLocations);

