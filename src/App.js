import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
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
import Authorization from './middleware/Authorization';
import history from './BrowserHistory/history';
import config from './config.json';
import { connect } from 'react-redux';
import { checkUserAuthenticated } from './actions/login-signup';

class App extends Component {
  constructor(props) {
    super(props);
    window.lofoBackend = config.backend;
    window.lofoHost = config.host;
  }

  async componentDidMount() {
    let token = await localStorage.getItem('token');
    let userId = await localStorage.getItem('userId');
    if (token && userId) {
      this.props.checkUserAuthenticated(token, userId);
    }
  }

  render() {
    return (
      <Router history={history}>
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

              <Route
                path="/insert/found/item"
                component={Authorization(
                  InsertFoundItem,
                  ['user'],
                  this.props.loggedIn
                )}
              />
              <Route
                path="/insert/lost/item"
                component={Authorization(
                  InsertLostItem,
                  ['user'],
                  this.props.loggedIn
                )}
              />
              <Route
                path="/profile/edit"
                component={Authorization(
                  EditProfile,
                  ['user'],
                  this.props.loggedIn
                )}
              />
              <Route
                path="/myaccount"
                component={Authorization(
                  MyAccount,
                  ['user'],
                  this.props.loggedIn
                )}
              />

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
