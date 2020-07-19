
import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const urlGetUser = process.env.REACT_APP_REST_API + 'api/user/get';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            token: null
        };
    }


    componentDidUpdate() {
        // Quand le user se connecte
        let connectedUser = this.props.userConnected;
        let token = this.props.userToken;

        if (connectedUser !== this.state.user) {
            this.editUser()
            this.saveToken(token)
        }

        // Quand il est édité
        let editUser = this.props.userEdit
        if (editUser != null && editUser !== this.state.user) {
            this.editUser()
        }

        // Quand Owner crée
        let userIsOwner = this.props.userIsOwner
        if (userIsOwner != null) {
            this.editUser()
        }
    }


    editUser = () => {
        var config = {
            headers: { 'Authorization': "bearer " + this.props.userToken }
        };
        var userId = this.props.userConnected.id;

        axios.get(urlGetUser + '/' + userId,
            config
        ).then(response => {
            const action = { type: "MAJ_USER", value: response.data.data.user }
            this.props.dispatch(action)
            const action2 = { type: "MAJ_OWNER_INFORMATIONS", value: response.data.data.user.owner }
            this.props.dispatch(action2)
        })
    }

    saveToken = (token) => {
        const action = { type: "SAVE_TOKEN", value: token }
        this.props.dispatch(action)
    }



    render() {

        return null;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
const mapStateToProps = (state) => {
    return {
        userConnected: state.connexion.user,
        userToken: state.connexion.token,
        userEdit: state.account.editUser,
        userIsOwner: state.becomeOwner.owner
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);

