import React, { Component } from 'react';
import Spinner from '../../layout/Spinner';
import {
  Col,
  Button,
  Alert,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Row
} from 'reactstrap';
import { connect } from 'react-redux';
import { signUp, startLoadingSpinner } from '../../../actions/login-signup';
import { Link } from 'react-router-dom';
class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: '',
    agree: false,
    firstNameValidError: false,
    lastNameValidError: false,
    emailValidError: false,
    passwordValidError: false,
    confirmPasswordValidError: false,
    agreeValidError: false,
    errors: {}
  };

  submitSignUp = event => {
    event.preventDefault();

    const { firstName, lastName, email, password, confirmPass } = this.state;
    if (firstName === '') {
      this.setState({ firstNameValidError: true });
      return;
    } else {
      this.setState({ firstNameValidError: false });
    }

    if (lastName === '') {
      this.setState({ lastNameValidError: true });
      return;
    } else {
      this.setState({ lastNameValidError: false });
    }

    if (email === '') {
      this.setState({ emailValidError: true });
      return;
    } else {
      this.setState({ emailValidError: false });
    }

    if (password === '' || password.length < 6) {
      this.setState({ passwordValidError: true });
      return;
    } else {
      this.setState({ passwordValidError: false });
    }

    if (confirmPass === '') {
      this.setState({ confirmPasswordValidError: true });
      return;
    } else {
      this.setState({ confirmPasswordValidError: false });
    }
    if (this.state.agree === false) {
      this.setState({ agreeValidError: true });
      return;
    } else {
      this.setState({ agreeValidError: false });
    }
    if (email === '' || password === '' || confirmPass === '') {
      return;
    } else {
      if (password === confirmPass) {
        let newUser = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          about: '',
          country: '',
          city: '',
          zip: '',
          phone: ''
        };
        this.props.startLoadingSpinner();
        setTimeout(() => {
          this.props.signUp(newUser);
        }, 1000);
      } else {
        this.setState({
          errors: { confirmPass: 'Password wrong confirmation' }
        });
      }
    }
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggleAgreement = () => {
    this.setState({
      agree: !this.state.agree
    });
  };

  render() {
    return (
      <div className="row justify-content-center">
        {!this.props.signUpSuccessful ? (
          <div>
            <h5 className="pl-4">Please fill your information to sign up</h5>
            <hr />
            {this.props.loadingSpinner && !this.props.signUpSuccessful ? (
              <Spinner />
            ) : (
              <Form onSubmit={this.submitSignUp} className="p-4">
                {!this.props.signUpFailedMessage === '' ? (
                  <Row>
                    <Alert color="danger" className="col-12">
                      {this.props.signUpFailedMessage}
                    </Alert>
                  </Row>
                ) : null}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name" className="mr-sm-2">
                        First Name:
                      </Label>
                      <Input
                        invalid={this.state.firstNameValidError}
                        type="text"
                        name="firstName"
                        placeholder="Enter you first name..."
                        autoComplete="true"
                        onChange={this.onChangeHandler}
                      />
                      <FormFeedback>Oh no first name required</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="last-name">Last Name</Label>
                      <Input
                        invalid={this.state.lastNameValidError}
                        type="text"
                        name="lastName"
                        placeholder="Enter you name..."
                        autoComplete="true"
                        onChange={this.onChangeHandler}
                      />
                      <FormFeedback>Oh no last name required</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="">
                  <Label for="email" className="">
                    Email:
                  </Label>
                  <Input
                    invalid={this.state.emailValidError}
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    autoComplete="true"
                    onChange={this.onChangeHandler}
                  />
                  <FormFeedback>Email is required</FormFeedback>
                </FormGroup>
                <Row form>
                  <Col md={6}>
                    <FormGroup className="">
                      <Label for="password">Password:</Label>
                      <Input
                        invalid={this.state.passwordValidError}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        onChange={this.onChangeHandler}
                      />
                      <FormFeedback>
                        Password is required and at least 6 characters
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className=" ">
                      <Label for="password" className="">
                        Confirm Password:
                      </Label>
                      <Input
                        invalid={this.state.confirmPasswordValidError}
                        type="password"
                        name="confirmPass"
                        id="confirmPass"
                        placeholder="********"
                        onChange={this.onChangeHandler}
                      />
                      {this.state.errors && (
                        <div className="invalid-feedback d-block">
                          {this.state.errors.confirmPass}
                        </div>
                      )}
                      <FormFeedback>Confirm Password is required</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <span>
                    {/* added file for testing the download 
              and later will be replace with pdf file, its content all the terms and conditions of the app and the data policy inside EU */}
                    <a
                      href="/terms-and-conditions/Fuburo-terms-and-conditions.pdf"
                      download
                    >
                      <i className="fas fa-download" />
                      Terms & conditions
                    </a>
                  </span>
                  <Link
                    to="#"
                    onClick={this.props.displayLoginHandler}
                    className="float-right mr-2"
                  >
                    Back
                  </Link>
                </FormGroup>
                <FormGroup check>
                  <Input
                    invalid={this.state.agreeValidError}
                    onClick={this.toggleAgreement}
                    className="mt-3"
                    type="checkbox"
                    name="agree"
                    id="agree-check-box"
                  />
                  <Label for="check" className="mt-2" check>
                    I agree the terms and conditions
                  </Label>
                  <FormFeedback>agreement is required</FormFeedback>

                  <Button
                    className="float-right pr-0 mr-0"
                    color="danger"
                    style={{
                      borderRadius: '25px',
                      minWidth: '100px',
                      maxWidth: '200px'
                    }}
                    onClick={this.signUp}
                  >
                    Signup
                  </Button>
                </FormGroup>
              </Form>
            )}
          </div>
        ) : (
          <div className="w-75">
            <h5 className="">Your Email has been registered please login</h5>
            <hr />
            <Button
              className="float-right"
              color="danger"
              style={{
                borderRadius: '25px',
                minWidth: '100px',
                maxWidth: '200px'
              }}
              onClick={this.props.displayLoginHandler}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signUpSuccessful: state.userReducer.signUpSuccessful,
  loadingSpinner: state.userReducer.loadingSpinner,
  signUpFailedMessage: state.userReducer.signUpFailedMessage
});

export default connect(
  mapStateToProps,
  { signUp, startLoadingSpinner }
)(SignUp);
