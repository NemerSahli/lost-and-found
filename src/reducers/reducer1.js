const intialState = {
  users: null,
  loggedIn: false,
  modalOpen: false,
  currentUser: '',
  loginFailedMessage: '',
  forgetPassFailedMessage: '',
  signUpFailedMessage: ''
};

export default function(state = intialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        loginFailedMessage: '',
        forgetPassFailedMessage: '',
        signUpFailedMessage: ''
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

    case 'SIGN_UP_FAILD':
      return {
        ...state,
        signUpFailedMessage: action.error
      };

    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false
      };

    case 'LOAD_USERS':
      return {
        ...state,
        users: action.users
      };

    case 'ADD_USER':
      let newUsers = [];
      if (state.users === null) {
        newUsers = [action.newUser];
      } else {
        newUsers = [...state.users, action.newUser];
      }
      return {
        ...state,
        users: newUsers
      };

    case 'DELETE_USER':
      let newUsers2 = state.users.filter(user => user._id !== action.userId);
      return {
        ...state,
        users: newUsers2
      };

    case 'UPDATE_USER':
      const users = [...state.users];
      const index = users.findIndex(user => user._id === action.newUser._id);
      users.splice(index, 1, action.newUser);
      return {
        ...state,
        users: users
      };

    case 'OPEN_UPDATE_MODAL':
      let currentUser = state.users.filter(user => user._id === action.userId);
      return {
        ...state,
        modalOpen: true,
        currentUser: currentUser[0]
      };

    case 'CLOSE_UPDATE_MODAL':
      return {
        ...state,
        modalOpen: false,
        currentUserId: ''
      };

    default:
      return state;
  }
}
