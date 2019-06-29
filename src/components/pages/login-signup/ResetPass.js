import React, { Component, Fragment } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormFeedback
} from 'reactstrap';
import { connect } from 'react-redux';
import { resetPassword } from '../../../actions/login-signup';
import { Link } from 'react-router-dom';
class ResetPass extends Component {
  state = {
    password: '',
    confirmPass: '',
    errors: null
  };

  resetPass = event => {
    event.preventDefault();

    const { password, confirmPass } = this.state;

    if (password === '') {
      this.setState({ errors: { password: 'Password is required' } });
      return;
    }
    if (confirmPass === '') {
      this.setState({
        errors: { confirmPass: 'Confirm password is required' }
      });
      return;
    }
    if (password === '' || confirmPass === '') {
      alert('something wrong');
      return;
    } else {
      if (this.state.password === this.state.confirmPass) {
        let resetPassEmail = {
          resetPasswordKey: this.props.resetPasswordKey,
          password: this.state.password
        };

        this.props.resetPassword(resetPassEmail);
      } else {
        this.setState({ errors: { confirmPass: 'wrong confirmation' } });
      }
    }
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: null
    });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div>
          <h5 className="pl-3">Reset Password</h5>
          <hr />

          {!this.props.resetPasswordSuccessful ? (
            <Fragment>
              <Form onSubmit={this.resetPass} className="p-4">
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="password" className="mr-sm-2">
                        Enter new password:
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        autoComplete="true"
                        invalid={
                          this.state.errors && this.state.errors.password
                        }
                        onChange={this.onChangeHandler}
                      />
                      <FormFeedback>New password is required!</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="password" className="mr-sm-2">
                        Confirm Password:
                      </Label>
                      <Input
                        type="password"
                        name="confirmPass"
                        id="confirmPass"
                        placeholder="********"
                        autoComplete="true"
                        invalid={
                          this.state.errors && this.state.errors.confirmPass
                        }
                        onChange={this.onChangeHandler}
                      />
                      <FormFeedback>
                        {this.state.errors && this.state.errors.confirmPass}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Link
                    to="/"
                    onClick={this.props.displayLoginHandler}
                    className=""
                  >
                    Back
                  </Link>
                </FormGroup>
                <FormGroup check>
                  <Button
                    className="float-right mr-0"
                    color="danger"
                    style={{
                      borderRadius: '25px',
                      minWidth: '100px',
                      maxWidth: '200px'
                    }}
                  >
                    CONFIRM
                  </Button>
                </FormGroup>
              </Form>
              {this.props.resetPassFailedMessage !== '' ? (
                <div className="invalid-feedback d-block">
                  {this.props.resetPassFailedMessage}
                </div>
              ) : null}
            </Fragment>
          ) : (
            <Fragment>
              <h5>Your Password has been successfuly changed!</h5>
              <Link to="/">
                <Button
                  className="mt-5 float-right"
                  color="danger"
                  style={{
                    borderRadius: '25px',
                    minWidth: '100px',
                    maxWidth: '200px'
                  }}
                  onClick={() => {
                    this.props.displayLoginHandler();
                  }}
                >
                  Ok
                </Button>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resetPasswordSuccessful: state.userReducer.resetPasswordSuccessful,
  resetPassFailedMessage: state.userReducer.resetPassFailedMessage
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPass);
