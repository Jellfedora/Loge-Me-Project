import { connect } from 'react-redux';
import Register from '../components/Register';

import { } from '../store/reducer/register-reducer';

// On veut pouvoir faire correspondre des propriétés
// du state aux props de notre composant

const mapStateToProps = (state) => ({
    totalOui: state.vote.oui,
    totalNon: state.vote.non,
});


// Si on veut pouvoir modifier le state, il faut pouvoir
// dispatcher des actions, et donc on va donner en tant que props
// des méthodes pour dispatcher les actions qui nous intéressent

const mapDispatchToProps = (dispatch) => ({
    onVote: (name) => {
        dispatch(vote(name));
    },
    fetchVotes: () => {
        dispatch(fetchVotes());
    }
});

// const readyToConnect = connect(mapStateToProps, mapDispatchToProps);
// const container = readyToConnect(Sondage);

export default connect(mapStateToProps, mapDispatchToProps)(Register);