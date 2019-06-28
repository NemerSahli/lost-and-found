const intialState = {
  loggedIn: false,
  modalIsOpen: false,
  loggedInUser: null,
  signUpSuccessful: false,
  forgetPasswordSuccessful: false,
  loginFailedMessage: '',
  forgetPassFailedMessage: '',
  resetPassFailedMessage: '',
  signUpFailedMessage: ''
};

export default function(state = intialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        modalIsOpen: false,
        loggedInUser: action.payload,
        loginFailedMessage: '',
        forgetPassFailedMessage: '',
        resetPassFailedMessage:'',
        signUpFailedMessage: ''
      };
    case 'SIGNUP':
      return {
        ...state,
        signUpSuccessful: true,
        loginFailedMessage: '',
        forgetPassFailedMessage: '',
        signUpFailedMessage: ''
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        signUpSuccessful: false
      };

    case 'RESET_FAILD_MESSAGES':
      return {
        ...state,
        loginFailedMessage: '',
        forgetPassFailedMessage: '',
        signUpFailedMessage: ''
      };
    case 'LOGIN_FAILD':
      return {
        ...state,
        loginFailedMessage: action.error
      };

    case 'FORGET_PASS_FAILD':
      return {
        ...state,
        forgetPassFailedMessage: action.error
      };
    case 'FORGET_PASS_SUCCESS':
      return {
        ...state,
        forgetPasswordSuccessful: true
      };

    case 'SIGN_UP_FAILD':
      return {
        ...state,
        signUpFailedMessage: action.error
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        loggedInUser: null
      };
    case 'OPEN_LOGIN_SIGNUP_MODAL':
      return {
        ...state,
        modalIsOpen: true
      };
    case 'UPDATE_PROFILE':
      // const newDataUser = {
      //   firstName: action.payload.firstName,
      //   lastName: action.payload.lastName,
      //   email: state.loggedInUser.email,
      //   password: state.loggedInUser.password,
      //   country: action.payload.country,
      //   city: action.payload.city,
      //   location: action.payload.location,
      //   zip: action.payload.zip,
      //   phone: action.payload.phone,
      //   about: action.payload.about,
      //   registrationDate: state.loggedInUser.registrationDate
      // };
      return {
        ...state,
        loggedInUser: action.payload
      };

    case 'CLOSE_LOGIN_SIGNUP_MODAL':
      return {
        ...state,
        modalIsOpen: false,
        forgetPasswordSuccessful: false,
        loginFailedMessage: '',
        forgetPassFailedMessage: '',
        signUpFailedMessage: ''
      };
    default:
      return state;
  }
}
