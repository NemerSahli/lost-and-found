import React, { Component } from 'react';
import { Button} from 'reactstrap';
import { connect } from 'react-redux';
import { displaySignUpSuccess } from '../../../actions/login-signup';
// import { Link } from 'react-router-dom';
class SingUpSuccess extends Component {
  signUpsuccesHandler = () => {
    this.props.displaySignUpSuccess();
    this.props.displayLoginHandler();
  };
  render() {
    return (
      <div className="row justify-content-center">
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
            onClick={this.signUpsuccesHandler}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // loggedIn: state.reducer1.loggedIn,
  // forgetPassFailedMessage: state.reducer1.forgetPassFailedMessage
});

export default connect(
  mapStateToProps,
  { displaySignUpSuccess }
)(SingUpSuccess);
