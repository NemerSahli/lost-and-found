import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadItems } from '../../../actions/crud';
import { updateProfile } from '../../../actions/userCrud';

class Profile extends Component {
  componentDidMount() {
    this.props.loadItems();
  }

  render() {
 
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-9">
              {/* User profile */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">User profile</h4>
                </div>
                <div className="panel-body">
                  <div className="profile__avatar">
                    <img src="http://picsum.photos/100" alt="..." />
                  </div>
                  <div className="profile__header">
                    <h3>
                      {this.props.loggedInUser &&
                        this.props.loggedInUser.firstName}{' '}
                      <small>Helping soul</small>
                    </h3>

                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />

                    <p className="text-muted">
                      <p>
                        {this.props.loggedInUser &&
                          this.props.loggedInUser.about}
                      </p>
                    </p>
                  </div>
                </div>
              </div>
              {/* User info */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">user info</h4>
                </div>
                <div className="panel-body">
                  <table className="table profile__table">
                    <tbody>
                      <tr>
                        <th>
                          <strong>Name</strong>
                        </th>
                        <td>{this.props.loggedInUser.firstName}</td>{' '}
                        <td>{this.props.loggedInUser.lastName}</td>
                      </tr>
                      <tr>
                        <th>
                          <strong>Country</strong>
                        </th>
                        <td>{this.props.loggedInUser.country}</td>
                      </tr>
                      <tr>
                        <th>
                          <strong>City</strong>
                        </th>
                        <td>{this.props.loggedInUser.city}</td>
                      </tr>
                      <tr>
                        <th>
                          <strong>ZIP Code</strong>
                        </th>
                        <td>{this.props.loggedInUser.zip}</td>
                        <td>
                          {this.props.loggedInUser &&
                            this.props.loggedInUser.location}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Community */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Community</h4>
                </div>
                <div className="panel-body">
                  <table className="table profile__table">
                    <tbody>
                      <tr>
                        <th>
                          <strong>Helping points</strong>
                        </th>
                        <td>58584</td>
                      </tr>
                      <tr>
                        <th>
                          <strong>Member since</strong>
                        </th>

                        <td>
                          {this.props.loggedInUser &&
                            this.props.loggedInUser.registrationDate.slice(
                              0,
                              10
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <strong>Last login</strong>
                        </th>
                        <td>online</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-3">
              <div
                className="profile__contact-info"
                style={{ minWidth: '200px' }}
              >
                <div className="profile__contact-info-item">
                  <div className="profile__contact-info-icon">
                    <i className="fa fa-phone" />
                  </div>
                  <div className="profile__contact-info-body">
                    <h5 className="profile__contact-info-heading">
                      Mobile number
                    </h5>
                    {this.props.loggedInUser && this.props.loggedInUser.phone}
                  </div>
                </div>
                <div className="profile__contact-info-item">
                  <div className="profile__contact-info-icon">
                    <i className="fa fa-envelope-square" />
                  </div>
                  <div className="profile__contact-info-body">
                    <h5 className="profile__contact-info-heading">
                      E-mail address
                    </h5>
                    <a href="mailto:admin@domain.com">
                      {this.props.loggedInUser && this.props.loggedInUser.email}
                    </a>
                  </div>
                </div>
                <Link to={'/myaccount/edit'}>
                  <button
                    className="profile__edit-btn btn btn-danger"
                    style={{ borderRadius: '25px' }}
                    onClick={this.click}
                  >
                    <i
                      className="fas fa-user-edit text-light"
                      style={{
                        fontSize: '15px'
                      }}
                    >
                      {' '}
                      Edit{' '}
                    </i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.userReducer.loggedInUser,
  items: state.itemsReducer.items
});

export default connect(
  mapStateToProps,
  { loadItems, updateProfile },
  null
)(Profile);
