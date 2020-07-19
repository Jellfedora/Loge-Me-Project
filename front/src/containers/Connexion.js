import { connect } from 'react-redux';
import Connexion from '../components/Sondage';

// import { vote, fetchVotes } from '../store/reducer/connexion-reducer';

// On veut pouvoir faire correspondre des propriétés
// du state aux props de notre composant

// const mapStateToProps = (state) => ({
//     totalOui: state.vote.oui,
//     totalNon: state.vote.non,
// });


// Si on veut pouvoir modifier le state, il faut pouvoir
// dispatcher des actions, et donc on va donner en tant que props
// des méthodes pour dispatcher les actions qui nous intéressent

// const mapDispatchToProps = (dispatch) => ({
//     onVote: (name) => {
//         dispatch(vote(name));
//     },
//     fetchVotes: () => {
//         dispatch(fetchVotes());
//     }
// });

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

// const readyToConnect = connect(mapStateToProps, mapDispatchToProps);
// const container = readyToConnect(Sondage);

export default connect(mapStateToProps, mapDispatchToProps)(Connexion);
