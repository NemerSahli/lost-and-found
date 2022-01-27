const intialState = {
  loggedIn: false,
  modalIsOpen: false,
  loggedInUser: null,
  signUpSuccessful: false,
  forgetPasswordSuccessful: false,
  resetPasswordSuccessful: false,
  loginFailedMessage: '',
  forgetPassFailedMessage: '',
  resetPassFailedMessage: '',
  signUpFailedMessage: '',
  loadingSpinner: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case 'START_LOADING_SPINNER':
      return {
        ...state,
        loadingSpinner: true
      };
    case 'STOP_LOADING_SPINNER':
      return {
        ...state,
        loadingSpinner: false
      };

    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        modalIsOpen: false,
        loadingSpinner: false,
        loggedInUser: action.payload,
        loginFailedMessage: '',
        forgetPassFailedMessage: '',
        resetPassFailedMessage: '',
        signUpFailedMessage: ''
      };

    case 'LOGIN_FAILD':
      return {
        ...state,
        loadingSpinner: false,
        loginFailedMessage: action.error
      };

    case 'SIGNUP':
      return {
        ...state,
        signUpSuccessful: true,
        loadingSpinner: false,
        loginFailedMessage: '',
        forgetPassFailedMessage: '',
        signUpFailedMessage: ''
      };

    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        loadingSpinner: false,
        signUpSuccessful: false
      };

    case 'SIGN_UP_FAILD':
      return {
        ...state,
        loadingSpinner: false,
        signUpFailedMessage: action.error
      };

    case 'RESET_FAILD_MESSAGES':
      return {
        ...state,
        loadingSpinner: false,
        loginFailedMessage: '',
        forgetPassFailedMessage: '',
        signUpFailedMessage: '',
        resetPassFailedMessage: ''
      };

    case 'FORGET_PASS_FAILD':
      return {
        ...state,
        loadingSpinner: false,
        forgetPassFailedMessage: action.error
      };

    case 'FORGET_PASS_SUCCESS':
      return {
        ...state,
        loadingSpinner: false,
        forgetPasswordSuccessful: true
      };

    case 'RESET_PASS_SUCCESS':
      return {
        ...state,
        loadingSpinner: false,
        resetPasswordSuccessful: true,
        resetPassFailedMessage: ''
      };

    case 'RESET_PASS_FAILED':
      return {
        ...state,
        loadingSpinner: false,
        resetPassFailedMessage: action.error
      };

    case 'LOGOUT':
      return {
        ...state,
        loadingSpinner: false,
        loggedIn: false,
        loggedInUser: null
      };
    case 'OPEN_LOGIN_SIGNUP_MODAL':
      return {
        ...state,
        modalIsOpen: true
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        loggedInUser: action.payload
      };

    case 'CLOSE_LOGIN_SIGNUP_MODAL':
      return {
        ...state,
        modalIsOpen: false,
        loadingSpinner: false,
        forgetPasswordSuccessful: false,
        loginFailedMessage: '',
        forgetPassFailedMessage: '',
        signUpFailedMessage: ''
      };
    default:
      return state;
  }
}
