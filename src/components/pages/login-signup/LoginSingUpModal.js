import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import SignUp from './SignUp';
import Login from './Login';
import ResetPass from './ResetPass';
import ForgetPass from './ForgetPass';
import {
  openLoginSignUpModal,
  closeLoginSignUpModal
} from '../../../actions/login-signup';
class LoginSingUpModal extends Component {
  state = {
    loginDisplay: true,
    signUpDisplay: false,
    forgetPassDisplay: false,
    resetPassDisplay: false,
    errors: {}
  };
  componentDidMount() {
    let splitedUrl = window.location.href.split('resetpass?q=');
    if (splitedUrl && splitedUrl.length === 2) {
      this.props.openLoginSignUpModal();
      this.setState({
        resetPasswordKey: splitedUrl[1],
        loginDisplay: false,
        signUpDisplay: false,
        forgetPassDisplay: false,
        resetPassDisplay: true,
        errors: {}
      });
    } else {
      this.setState({
        loginDisplay: true,
        signUpDisplay: false,
        forgetPassDisplay: false,
        resetPassDisplay: false,
        errors: {}
      });
    }
  }
  displaySignUp = () => {
    this.setState({
      loginDisplay: false,
      signUpDisplay: true,
      forgetPassDisplay: false,
      resetPassDisplay: false
    });
  };
  displayLogin = () => {
    this.setState({
      loginDisplay: true,
      signUpDisplay: false,
      forgetPassDisplay: false,
      resetPassDisplay: false
    });
  };
  displayForgetPass = () => {
    this.setState({
      loginDisplay: false,
      signUpDisplay: false,
      forgetPassDisplay: true,
      resetPassDisplay: false
    });
  };

  handleSubmit = (value, event) => {
    event.preventDefault();
  };

  closeModal = () => {
    this.setState({
      loginDisplay: true,
      signUpDisplay: false,
      forgetPassDisplay: false,
      resetPassDisplay: false
    });
    this.props.closeLoginSignUpModal();
  };
  render() {
    return (
      <Modal
        centered
        isOpen={this.props.modalIsOpen}
        toggle={this.toggle}
        className={this.props.className}
      >
        <div>
          <Button
            onClick={this.closeModal}
            color="white"
            className="float-right m-2 cursor-pointer"
          >
            <i className="fas fa-times" />
          </Button>
        </div>

        <ModalBody>
          {this.state.loginDisplay && (
            <Login
              displaySignUpHandler={this.displaySignUp}
              displayForgetPassHandler={this.displayForgetPass}
            />
          )}

          {this.state.signUpDisplay && (
            <SignUp displayLoginHandler={this.displayLogin} />
          )}

          {this.state.forgetPassDisplay && (
            <ForgetPass displayLoginHandler={this.displayLogin} />
          )}

          {this.state.resetPassDisplay && (
            <ResetPass
              displayLoginHandler={this.displayLogin}
              resetPasswordKey={this.state.resetPasswordKey}
            />
          )}
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modalIsOpen: state.userReducer.modalIsOpen
});
export default connect(
  mapStateToProps,
  { openLoginSignUpModal, closeLoginSignUpModal }
)(LoginSingUpModal);
