import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Loader extends Component {
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
    }


    render() {

        // Redirect si la recherche n'a pas été soumise
        if ((this.props.isActive == true)) {
            return (
                <div className="container-loader">
                    <FontAwesomeIcon
                        className="container-loader__loader"
                        icon="spinner"
                        spin
                        color="#007bff"
                        size="3x"
                    />
                </div>

            );
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
    console.log(state)
    return {
        isActive: state.loader.isActive,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Loader);

