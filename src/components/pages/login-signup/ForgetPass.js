import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {
  forgetPassword,
  closeLoginSignUpModal
} from '../../../actions/login-signup';
import { Link } from 'react-router-dom';
class ForgetPass extends Component {
  state = {
    userEmail: '',
    errors: null
  };

  forgetPassword = () => {
    const { userEmail } = this.state;
    if (userEmail === '') {
      this.setState({ errors: { userEmail: 'Email is required' } });
      return;
    }

    this.props.forgetPassword(userEmail, this.props.history);
    this.setState({ errors: {} });
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="w-75">
          <h5 className="">Forget Password</h5>
          <hr />
          {!this.props.forgetPasswordSuccessful ? (
            <Fragment>
              <Form className="mt-4">
                <FormGroup className="mb-2 mt-3">
                  <Label for="userEmail" className="">
                    Please enter your email
                  </Label>
                  <Input
                    type="email"
                    name="userEmail"
                    id="email"
                    placeholder="example@example.com"
                    autoComplete="true"
                    onChange={this.onChangeHandler}
                  />
                  {this.state.errors && (
                    <div className="invalid-feedback d-block">
                      {' '}
                      {this.state.errors.userEmail}{' '}
                    </div>
                  )}
                </FormGroup>

                <Button
                  className="float-right"
                  color="danger"
                  style={{
                    borderRadius: '25px',
                    minWidth: '100px',
                    maxWidth: '200px'
                  }}
                  onClick={this.forgetPassword}
                >
                  send
                </Button>
                <Link
                  to="#"
                  className="float-left mt-3 mr-2"
                  onClick={this.props.displayLoginHandler}
                >
                  Back
                </Link>
              </Form>

              {this.props.forgetPassFailedMessage !== '' ? (
                <div className="invalid-feedback d-block">
                  {this.props.forgetPassFailedMessage}{' '}
                </div>
              ) : null}
            </Fragment>
          ) : (
            <div>
              <h5>Please check your email to reset your password!</h5>
              <Button
                className="float-right"
                color="danger"
                style={{
                  borderRadius: '25px',
                  minWidth: '100px',
                  maxWidth: '200px'
                }}
                onClick={this.props.closeLoginSignUpModal}
              >
                Ok
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  forgetPasswordSuccessful: state.userReducer.forgetPasswordSuccessful,
  forgetPassFailedMessage: state.userReducer.forgetPassFailedMessage
});

export default connect(
  mapStateToProps,
  { forgetPassword, closeLoginSignUpModal }
)(ForgetPass);
