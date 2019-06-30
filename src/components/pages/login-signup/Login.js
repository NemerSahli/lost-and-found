import React, { Component } from 'react';
import Spinner from '../../layout/Spinner';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { logIn } from '../../../actions/login-signup';
import { Link } from 'react-router-dom';

class Login extends Component {
  // defined state to save the value of
  // email, password and the errors
  state = {
    email: '',
    password: '',
    errors: null,
    // errorAnimated: false,
    logInSpinner: false
  };

  //login function first read if there is no
  // entry values and show the errors by
  // changing the errors in the state
  logIn = () => {
    // this.state.errorAnimated = true;
    const { email, password } = this.state;
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (password === '') {
      this.setState({ errors: { password: 'Password is required' } });
      return;
    }

    let loginUser = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState({
      logInSpinner: true
    });
    
    setTimeout(() => {
      this.props.logIn(loginUser);
      setTimeout(() => {
        this.setState({
          logInSpinner: false
        });
      }, 700);
    }, 2000);
  };

  // this function save all inputs into state
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: null
    });
  };

  render() {
    return (
      <div
        className={
          this.state.logInSpinner
            ? 'row justify-content-center mb-2  map_bg'
            : 'row justify-content-center mb-2'
        }
      >
        {this.state.logInSpinner ? (
          <Spinner />
        ) : (
          <div className="w-75">
            <h5 className="">Please Sign In</h5>
            <hr />
            {/* </div> */}
            <Form className="">
              <FormGroup className="mb-2">
                <Label for="email">Email:</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  autoComplete="true"
                  onChange={this.onChangeHandler}
                />
                {this.state.errors && (
                  <div className="invalid-feedback d-block">
                    {this.state.errors.email}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="mt-3 mb-2  mb-sm-0">
                <Label for="password">Password:</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  // autoComplete="true"
                  className={
                    this.state.errorAnimated ? 'animated headShake' : ''
                  }
                  onChange={this.onChangeHandler}
                />
                {this.state.errors && (
                  <div className="invalid-feedback d-block">
                    {' '}
                    {this.state.errors.password}{' '}
                  </div>
                )}
              </FormGroup>
              <div className="mt-3 clearfix">
                <Link
                  to="#"
                  className="float-left"
                  onClick={this.props.displayForgetPassHandler}
                >
                  forgot password?
                </Link>
                <Link
                  to="#"
                  className="float-right mr-4"
                  onClick={this.props.displaySignUpHandler}
                >
                  create account
                </Link>
              </div>

              <div className="mt-3">
                <Button
                  className="mt-0 mr-0 float-right"
                  color="danger"
                  onClick={this.logIn}
                  style={{
                    borderRadius: '25px',
                    minWidth: '100px',
                    maxWidth: '200px'
                  }}
                >
                  Sign in
                </Button>
              </div>
            </Form>

            {this.props.loginFailedMessage !== '' ? (
              <div className="invalid-feedback d-block mt-2">
                {this.props.loginFailedMessage}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // loggedIn: state.reducer1.loggedIn,
  loginFailedMessage: state.userReducer.loginFailedMessage
});

export default connect(
  mapStateToProps,
  { logIn }
)(Login);
