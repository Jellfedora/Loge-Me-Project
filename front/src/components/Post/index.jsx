
import ImgTest from './illustration-location.jpg';
import ImgTest2 from './illustration-location4.jpg';
import ImgTest3 from './illustration-location5.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Map, TileLayer } from "react-leaflet";
import Button from 'react-bootstrap/Button';

const urlGetHousingById = process.env.REACT_APP_REST_API + 'housing/get';

class Post extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getHousing();
    }

    getHousing = () => {
        const housingId = this.props.location.pathname.split('/')[2]

        axios.get(urlGetHousingById + '/' + housingId
        ).then(response => {
            const action = { type: "GET_HOUSING", value: response.data.data.housing }
            this.props.dispatch(action)
        })
            .catch(error => {
            });
    }

    render() {
        const housing = []
        if (this.props.housing) {
            const housingDatas = this.props.housing;
            var housingType;
            var energyClass;
            var emissionOfGase;
            switch (this.props.housing.logementType) {
                case 1:
                    housingType = 'Appartement';
                    break;
                case 2:
                    housingType = 'Maison';
                    break;
                case 3:
                    housingType = 'Terrain';
                    break;

                default:
                    break;
            }

            if (this.props.housing.energyClass == 0) {
                energyClass = 'Non renseigné'
            } else {
                energyClass = this.props.housing.energyClass
            }

            if (this.props.housing.emissionOfGase == 0) {
                emissionOfGase = 'Non renseigné'
            } else {
                emissionOfGase = this.props.housing.emissionOfGase
            }

            const localisation = [
                housingDatas.geometricCoordinates[1],
                housingDatas.geometricCoordinates[0]
            ]

            // Rating
            let ratingArray = [];
            let rating = this.props.housing.rating;
            if (rating === 0) {
                ratingArray = "Pas encore évalué"
            } else {
                if (rating !== 0) {
                    for (let index = 0; index < rating; index++) {
                        const goodRating = <span key={index}><FontAwesomeIcon icon="key" color="#007bff" /></span>;
                        ratingArray.push(goodRating)
                    }
                    const note = 5 - rating;
                    for (let index = 0; index < note; index++) {
                        const greyRating = <span><FontAwesomeIcon icon="key" color="grey" /></span>
                        ratingArray.push(greyRating)
                    }
                }
            }
            housing.push(
                <div key={housingDatas.id} className="post-component__housing" >
                    <h2 className="post-component__housing__title text-center">Location <span>{housingType}</span></h2>
                    <div className="post-component__housing__top">
                        <h3 className="post-component__housing__top__localisation text-center"><FontAwesomeIcon icon="map-marker-alt" color="red" /> {housingDatas.city} {housingDatas.cityCode}</h3>
                        <div className="post-component__housing__top__rent">
                            <span className="post-component__housing__top__rent__price">{housingDatas.monthlyRent} &euro; </span>
                            <span className="post-component__housing__top__rent__info">cc /mois</span>
                        </div>
                    </div>
                    <div className="post-component__housing__rating">
                        {ratingArray}
                    </div>
                    <Carousel className="post-component__housing__carousel"
                        showThumbs={true}
                        showStatus={false}
                    >
                        <div style={{ backgroundImage: `url(${ImgTest2})` }} className="home-component__new-housings__housing__carousel__img">
                            <img src={ImgTest2} alt="" />
                        </div>
                        <div>
                            <img src={ImgTest3} alt="" />
                        </div>
                        <div className="post-component__housing__carousel__img">
                            <img src={ImgTest} className="post-component__housing__carousel__img" alt="" />
                        </div>
                        <div className="post-component__housing__carousel__img">
                            <img src={ImgTest2} className="post-component__housing__carousel__img" alt="" />
                        </div>
                        <div className="post-component__housing__carousel__img">
                            <img src={ImgTest3} className="post-component__housing__carousel__img" alt="" />
                        </div>
                    </Carousel>
                    <div className="post-component__housing__informations">
                        <h3>Critéres</h3>
                        <p><span className="post-component__housing__informations__title">Surface Totale:</span> {housingDatas.area}m2</p>
                        <p><span className="post-component__housing__informations__title">Nombre de piéce(s):</span> {housingDatas.numberOfPieces}</p>
                        <p><span className="post-component__housing__informations__title">Nombre de chambre(s):</span> {housingDatas.numberOfBedrooms}</p>
                        <p><span className="post-component__housing__informations__title">Consommation énergétique:</span> {energyClass}</p>
                        <p><span className="post-component__housing__informations__title">Emission de gaz à effet de serre:</span> {emissionOfGase}</p>
                    </div>
                    <div className="post-component__housing__description">
                        <h3>Description</h3>
                        <p>{housingDatas.description}</p>
                    </div>
                    <div className="post-component__housing__map">
                        <h3>Localisation</h3>
                        <p><span className="post-component__housing__map__title">Secteur: </span>{housingDatas.city} ({housingDatas.cityCode})</p>
                        <Map className="post-component__housing__map__component" center={localisation} zoom={15}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                        </Map>
                    </div>
                    <div className="post-component__housing__commentary text-center">
                        <h3>Commentaires</h3>
                        <p>Aucun commentaire pour le moment</p>
                        <Button className="post-component__housing__commentary__button" variant="primary" >
                            Laisser un commentaire
                        </Button>
                    </div>
                    <div className="post-component__housing__contact text-center">
                        <h3>Contact</h3>
                        <Button className="post-component__housing__contact__button" variant="primary" >
                            Contacter le vendeur
                        </Button>
                    </div>
                </div >
            )
            return (
                < div className="post-component"  >
                    {housing}
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
        housing: state.post.housing
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));

