import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUploader from "react-images-upload";
import axios from 'axios';
import FormData from 'form-data';

const urlUploadImage = 'http://127.0.0.1:8000/housing/test';

const urlRegisterLogement = process.env.REACT_APP_REST_API + 'api/housing/create';

class DepositStepThree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: []
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        if (pictureFiles.length > 0) {
            let index = pictureFiles.length - 1;
            let formData = new FormData();
            formData.append('file', pictureFiles[index], pictureFiles[index].name);

            axios({
                method: 'get',
                url: urlUploadImage,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (response) {
                })
                .catch(function (response) {
                });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const owner = this.props.userIsOwner;
        const userToken = this.props.userToken;
        var config = {
            headers: { 'Authorization': "bearer " + userToken }
        };
        const ownerId = owner.id;
        // Envoi des datas en post
        axios.post(urlRegisterLogement + '/' + ownerId, {
            logementType: this.props.logementInformation.logementType,
            area: this.props.logementInformation.area,
            numberOfPieces: this.props.logementInformation.pieces,
            numberOfBedrooms: this.props.logementInformation.bedrooms,
            energyClass: this.props.logementInformation.energy,
            emissionOfGase: this.props.logementInformation.gas,
            monthlyRent: 500,
            description: this.props.logementInformation.description,
            geometricCoordinates: this.props.houseLocalisation.coordinates,
            city: this.props.houseAdress.city,
            cityCode: this.props.houseAdress.postcode,
            streetName: this.props.houseAdress.name
        },
            config
        ).then(response => {
            console.log(response)
            // TODO redirect
            // const action = { type: "STEP_THREE_SUBMIT", value: true };
            // this.props.dispatch(action)
            // remettre à null deposit houseAdress,houseLocalisation,logementInformation
        })
            .catch(error => {
            });

        // TOTO UPLOAD PHOTOS!!
    }



    render() {
        return (
            <div className="deposit-component__step-two">
                <div className="deposit-component__title text-center">
                    <h2>Photos de votre logement</h2>
                </div>
                <form>
                    <div className="Card" >
                        <div style={{ marginRight: "15px" }}>
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                label="Taille maximale par fichier: 2Mo / Formats jpg et png acceptés"
                                buttonText="Cliquez ici pour ajouter vos photos"
                                onChange={this.onDrop}
                                imgExtension={[".jpg", ".png"]}
                                maxFileSize={2000000}
                                fileSizeError=" ce fichier est trop lourd"
                                fileTypeError=" seulement les formats jpg et png sont acceptés"
                                labelClass="images-upload__label"
                            />
                        </div>
                    </div >
                    <div className="text-center">
                        <button className="btn btn-primary deposit-component__form__container__submit-form" onClick={this.handleSubmit}>
                            <span>Valider</span>
                        </button>
                    </div>
                </form >
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
        userConnected: state.user.user,
        userIsOwner: state.user.owner,
        userToken: state.user.token,
        houseAdress: state.depositStepOne.submitAdress.properties,
        houseLocalisation: state.depositStepOne.submitAdress.geometry,
        logementInformation: state.depositStepTwo.submitLogementInformation,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DepositStepThree);
