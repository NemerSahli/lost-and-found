import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import SignUp from './SignUp';
import Login from './Login';
import ResetPass from './ResetPass';
import ForgetPass from './ForgetPass';
import SignUpSuccess from './SingUpSuccess';
import { closeLoginSignUpModal } from '../../../actions/login-signup';
class LoginSingUpModal extends Component {
  state = {
    loginDisplay: true,
    signUpDisplay: false,
    forgetPassDisplay: false,
    resetPassDisplay: false,
    signUpSuccessfull: false,
    errors: {}
  };
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

          {this.state.signUpDisplay ? (
            this.props.signUpSuccessful ? (
              <SignUpSuccess displayLoginHandler={this.displayLogin} />
            ) : (
              <SignUp displayLoginHandler={this.displayLogin} />
            )
          ) : null}

          {this.state.forgetPassDisplay && (
            <ForgetPass displayLoginHandler={this.displayLogin} />
          )}

          {this.state.resetPassDisplay && <ResetPass />}
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modalIsOpen: state.userReducer.modalIsOpen,
  signUpSuccessful: state.userReducer.signUpSuccessful
});
export default connect(
  mapStateToProps,
  { closeLoginSignUpModal }
)(LoginSingUpModal);
