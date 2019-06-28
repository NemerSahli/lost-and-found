import React, { Component } from 'react';
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
    resetPasswordKey: '',
    password: '',
    confirmPass: '',
    errors: null
  };
  constructor() {
    super();
    this.state.resetPasswordKey = window.location.href.split('q=')[1];
  }

  resetPass = () => {
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
      return;
    } else {
      if (this.state.password === this.state.confirmPass) {
        let resetPassEmail = {
          resetPasswordKey: this.state.resetPasswordKey,
          password: this.state.password
        };

        this.props.resetPassword(resetPassEmail, this.props.history);
        this.setState({ errors: {} });
      } else {
        this.setState({ errors: { confirmPass: 'wrong confirmation' } });
      }
    }
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div>
          <h5 className="pl-4">Reset Password</h5>
          <hr />

          <Form onSubmit={this.submitSignUp} className="p-4">
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
                    invalid={this.state.errors}
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
                    invalid={this.state.errors}
                    onChange={this.onChangeHandler}
                  />
                  <FormFeedback>Confirm password is required!</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Link
                to="#"
                onClick={this.props.displayLoginHandler}
                className=""
              >
                Back
              </Link>
            </FormGroup>
            <FormGroup check>
              <Button
                className="float-right pr-0 mr-0"
                color="danger"
                style={{
                  borderRadius: '25px',
                  minWidth: '100px',
                  maxWidth: '200px'
                }}
              >
                Submit
              </Button>
            </FormGroup>
          </Form>
          {this.props.resetPassFailedMessage !== '' ? (
            <div className="invalid-feedback d-block">
              {this.props.resetPassFailedMessage}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resetPassFailedMessage: state.userReducer.resetPassFailedMessage
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPass);
