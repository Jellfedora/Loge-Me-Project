
import React, { Component } from 'react';
import "./Navigation.css";
import Home from '../Home';
import Register from '../Register';
import Connexion from '../Connexion';
import Account from '../Account';
import AdvancedSearch from '../AdvancedSearch';
import ForgotPassword from '../Forgot-password';
import Deposit from '../Deposit';
import BecomeOwner from '../BecomeOwner';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FlashMessages from '../Flash-messages';
import Post from '../Post';
import App from '../App';
import SearchResults from '../SearchResults';





import Logo from './logo-blue.png';


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userConnected: null,
            navExpanded: false,
            userIsConnect: false
        };

    }
    componentDidMount() {
    }

    componentDidUpdate() {
    }


    logout = () => {
        const action = { type: "DISCONNECT_USER", value: null }
        this.props.dispatch(action)
    }

    setNavExpanded = (expanded) => {
        this.setState({ navExpanded: expanded });
    }

    closeNav = () => {
        this.setState({ navExpanded: false });
    }

    render() {
        // Open/Close Menu
        let menu = ["menu"];
        if (this.state.openMenu === true) {
            menu.push('collapse show');
        } else if (this.state.openMenu === false) {
            menu.push('collapse');
        }

        return (
            <Router>
                <Navbar className="menu" expand="lg" onToggle={this.setNavExpanded} expanded={this.state.navExpanded}>
                    <Link className="navbar-brand logo_loge-me menu__title" to="/">
                        <img src={Logo} alt='website logo' />
                        <h1>Loge Me</h1>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto menu__nav">
                            <Link className="nav-link-blue" to="/" onClick={this.closeNav}>Accueil<span className="sr-only" >(current)</span></Link>
                            {this.props.userConnected != null ? (
                                <div className="menu__nav__user-connected">
                                    <div className="menu__nav__user-connected__rent">
                                        <Link className="nav-link-blue" to="/rent" onClick={this.closeNav}>Louer</Link>
                                        <Link className="nav-link-blue" to="/deposit" onClick={this.closeNav}>Déposer une annonce</Link>
                                    </div>
                                    <div className="menu__nav__user-connected__user">

                                        <Link className="nav-link-blue" to="/account" onClick={this.closeNav}>Mon compte</Link>
                                        <span className="nav-link-blue" onClick={this.logout}>Déconnexion</span>

                                    </div>

                                </div>
                            ) : (
                                    <div className="menu__nav__user-not-connected">
                                        <Link className="nav-link-blue" to="/connexion" onClick={this.closeNav}>Connexion</Link>
                                        <Link className="nav-link-blue" to="/register" onClick={this.closeNav}>Créer un compte</Link>

                                    </div>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="navigation__banner mb-2">
                    <p className="navigation__banner__text">Trouvez et louez le logement de vos rêves en toute confiance grâce aux évaluations de nos utilisateurs !</p>
                    {/* <img className="home-component__introduction__img" src={Illustration} alt='Logement illustration' /> */}
                </div>
                <FlashMessages />
                <Switch>
                    <Route path="/connexion">
                        <Connexion />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/account">
                        <Account />
                    </Route>
                    <Route path="/account">
                        <Account />
                    </Route>
                    <Route path="/deposit">
                        <Deposit />
                    </Route>
                    <Route path="/become-owner">
                        <BecomeOwner />
                    </Route>
                    <Route path="/rent">
                        <Account />
                    </Route>
                    <Route path="/advanced-search">
                        <AdvancedSearch />
                    </Route>
                    <Route path="/search-results">
                        <SearchResults />
                    </Route>
                    <Route path="/password-forgot">
                        <ForgotPassword />
                    </Route>
                    <Route path="/post/:index" component={App} >
                        <Post />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router >
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
        openMenu: false
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

