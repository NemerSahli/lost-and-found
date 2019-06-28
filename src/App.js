import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import About from './components/layout/About';
import NotFound from './components/layout/NotFound';
import InsertFoundItem from './components/pages/insertItem/InsertFoundItem';
import InsertLostItem from './components/pages/insertItem/InsertLostItem';
import Mainpage from './components/pages/mainpages/Mainpage';
import EditProfile from './components/pages/profile/EditProfile';
import MyAccount from './components/pages/profile/MyAccount';
import ItemDetails from './components/pages/itemDetails/ItemDetails';
import OpenMap from './components/pages/open-street-map/OpenMap';
import LoginSingUpModal from './components/pages/login-signup/LoginSingUpModal';
import { connect } from 'react-redux';
import { checkUserAuthenticated } from './actions/login-signup';
import config from './config.json';

class App extends Component {
  constructor(props) {
    super(props);
    window.lofoBackend = config.backend;
    window.lofoHost = config.host;
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    if (token && userId) {
      this.props.checkUserAuthenticated(token, userId);
    }
  }

  render() {
    return (
      <Router>
        <div className="app-container" id="app-body-id">
          <Header />

          <LoginSingUpModal />
          <div className="body-content container">
            <Switch>
            <Route exact path="/" component={Mainpage} />
              <Route exact path="/resetpass" component={Mainpage} />
              

              <Route exact path="/mainpage" component={Mainpage} />
              <Route exact path="/myaccount/edit" component={EditProfile} />
              <Route exact path="/itemdetails/:id" component={ItemDetails} />
              <Route path="/showmap" component={OpenMap} />
              <Route path="/about" component={About} />
              {this.props.loggedIn ? (
                <Fragment>
                  <Route
                    path="/insert/found/item"
                    component={InsertFoundItem}
                  />
                  <Route path="/insert/lost/item" component={InsertLostItem} />
                  <Route path="/profile/edit" component={EditProfile} />
                  <Route path="/myaccount" component={MyAccount} />
                </Fragment>
              ) : null}
              <Route component={NotFound} />
            </Switch>
          </div>

          <Footer />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn
});
export default connect(
  mapStateToProps,
  { checkUserAuthenticated }
)(App);
