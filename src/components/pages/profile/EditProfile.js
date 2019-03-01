// FOOTER needed

import React, { Component } from 'react';
import { Input, Form } from 'reactstrap';
import {
 
  Modal,
  ModalHeader,
  ModalBody,
  
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateProfile } from '../../../actions/userCrud';

class EditProfile extends Component {
  state = {
    collapse: false,
    visible: true,
    clicked: true,
    modal: false
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this); //what happends here?
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  saveChanges = event => {
    event.preventDefault();

    var id = this.props.loggedInUser._id;
    var firstName = event.target.firstName;
    var lastName = event.target.lastName;
    var country = event.target.country;
    var city = event.target.city;
    var zip = event.target.zip;
    var phone = event.target.phone;
    var about = event.target.about;

    let newDataUser = {
      firstName: firstName.value,
      lastName: lastName.value,
      about: about.value,
      country: country.value,
      city: city.value,
      zip: zip.value,
      phone: phone.value
    };
    this.props.updateProfile(newDataUser, id, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <Form onSubmit={this.saveChanges}>
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
                        this.props.loggedInUser.firstName}
                      <small>Helping soul</small>{' '}
                    </h3>

                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />

                    <p className="text-muted">
                      <Input
                        name="about"
                        placeholder="About you"
                        defaultValue={
                          this.props.loggedInUser &&
                          this.props.loggedInUser.about
                        }
                      />
                    </p>
                  </div>
                </div>
              </div>
              {/* User info */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">User info</h4>
                </div>
                <div className="panel-body">
                  <table className="table profile__table">
                    <tbody>
                      <th>
                        <strong>Name</strong>
                      </th>
                      <div className="row justify-content-center">
                        <div className="col-6">
                          <Input
                            name="firstName"
                            className="mt-2 "
                            placeholder="firstName"
                            defaultValue={
                              this.props.loggedInUser &&
                              this.props.loggedInUser.firstName
                            }
                          />
                        </div>{' '}
                        <div className="col-6">
                          <Input
                            name="lastName"
                            className="mt-2 "
                            placeholder="Lastname"
                            defaultValue={
                              this.props.loggedInUser &&
                              this.props.loggedInUser.lastName
                            }
                          />
                        </div>
                      </div>
                      <tr>
                        <th>
                          <strong>Country</strong>
                        </th>
                        <td>
                          <Input
                            name="country"
                            className="mw-50"
                            placeholder="Country"
                            defaultValue={
                              this.props.loggedInUser &&
                              this.props.loggedInUser.country
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <strong>City</strong>
                        </th>
                        <td>
                          <Input
                            name="city"
                            className="mw-50"
                            placeholder="City"
                            defaultValue={
                              this.props.loggedInUser &&
                              this.props.loggedInUser.city
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <strong>ZIP Code</strong>
                        </th>
                        <td>
                          <Input
                            name="zip"
                            className="mw-50 "
                            placeholder="Zip"
                            defaultValue={
                              this.props.loggedInUser &&
                              this.props.loggedInUser.zip
                            }
                          />
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <th>
                        <strong>Change Password</strong>
                      </th>

                      <div className="container">
                        <div className="row">
                          <th>
                            <i
                              className="fas fa-unlock-alt"
                              style={{
                                fontSize: '20px',
                                cursor: 'pointer'
                              }}
                              onClick={this.toggle}
                            >
                              {this.props.buttonLabel}
                            </i>
                          </th>
                          <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                          >
                            <ModalHeader toggle={this.toggle}>
                              Change your password
                            </ModalHeader>
                            <ModalBody>
                              <div className="container">
                                <div className="row justify-content-center">
                                  <header>
                                    Please check your e-mail inbox to enter
                                    below the confirmation key we sent you.{' '}
                                  </header>{' '}
                                  <br />
                                  <div className="align-self-center w-50 m-3">
                                    Enter new password:
                                    <Input
                                      name="password"
                                      className=""
                                      type="password"
                                    />
                                    <br />
                                    Confirm new password:
                                    <Input
                                      name="password"
                                      className=""
                                      type="password"
                                    />
                                    <p>
                                      <small>
                                        Enter the confirmation code here:
                                      </small>
                                    </p>
                                    <div className="row align-items-center">
                                      <div className="col">
                                        <Input name="code" className="w-100" />
                                      </div>
                                      <div className="col">
                                        <button
                                          onClick={this.toggle}
                                          className="profile__edit-btn btn btn-danger"
                                          style={{
                                            borderRadius: '25px'
                                          }}
                                        >
                                          Confirm
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ModalBody>
                          </Modal>
                        </div>
                      </div>
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
                        <td>Jan 01, 2019</td>
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
              {/* Latest posts */}
              <br />
            </div>
            <div className="col-xs-12 col-sm-3">
              {/* Contact info */}
              <div
                className="profile__contact-info"
                style={{ minWidth: '200px' }}
              >
                <div className="profile__contact-info-item">
                  <div className="profile__contact-info-icon">
                    <i className="fa fa-phone" />
                  </div>{' '}
                  <div className="profile__contact-info-body">
                    <h5 className="profile__contact-info-heading">
                      Mobile number
                    </h5>
                    {this.state.clicked ? (
                      <Input
                        name="phone"
                        className="mt-2 mw-50"
                        placeholder="Phone"
                        defaultValue={
                          this.props.loggedInUser &&
                          this.props.loggedInUser.phone
                        }
                      />
                    ) : null}
                  </div>
                </div>
                <div className="profile__contact-info-item">
                  <div className="profile__contact-info-icon">
                    <i className="fa fa-envelope-square" />
                  </div>
                  <div className="profile__contact-info-body">
                    <h5 className="profile__contact-info-heading">
                      E-Mail address
                    </h5>
                    {this.props.loggedInUser && this.props.loggedInUser.email}
                  </div>
                </div>
                {/* <hr className="profile__contact-hr" /> */}
                <button
                  className="profile__edit-btn btn btn-success"
                  style={{ borderRadius: '25px' }}
                >
                  <i
                    className="fas fa-user-edit text-light"
                    style={{
                      fontSize: '15px'
                    }}
                  >
                    {' '}
                    Save{' '}
                  </i>
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.userReducer.loggedInUser
});

export default connect(
  mapStateToProps,
  { updateProfile }
)(EditProfile);
