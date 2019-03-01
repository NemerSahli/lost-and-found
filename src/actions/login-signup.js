import axios from 'axios';

export const openLoginSignUpModal = () => dispatch => {
  dispatch({ type: 'OPEN_LOGIN_SIGNUP_MODAL' });
};

export const closeLoginSignUpModal = () => dispatch => {
  dispatch({ type: 'CLOSE_LOGIN_SIGNUP_MODAL' });
};

export const logIn = loginUser => async dispatch => {
  try {
    const result = await axios(window.lofoBackend + '/login', {
      method: 'post',
      data: loginUser
      // withCredentials: true
    });
    // console.log(result);
    if (result.data.error === 0) {
      dispatch({ type: 'LOGIN', payload: result.data.loggedInUser });
    } else {
      dispatch({ type: 'LOGIN_FAILD', error: result.data.message });
    }
  } catch (e) {
    dispatch({
      type: 'LOGIN_FAILD',
      error: 'Error during login, check your connection and try again later'
    });
  }
};

export const logOut = () => async dispatch => {
  try {
    dispatch({ type: 'LOGOUT' });
    const res = await axios(window.lofoBackend + '/logout', {
      method: 'get'
      // withCredentials: true
    });

    // console.log(res);
    if (res.data.error === 0) {
      dispatch({ type: 'LOGOUT' });
    }
  } catch (e) {
    console.log(e);
  }
};

export const signUp = (signUpUser, routeTo) => async dispatch => {
  try {
    const result = await axios(window.lofoBackend + '/register', {
      method: 'post',
      data: signUpUser,
      withCredentials: true
    });
    // console.log(result);
    if (result.data.error === 0) {
      // dispatch({ type: 'LOGIN', payload: result.data.loggedInUser });
      dispatch({ type: 'SIGNUP' });
    } else {
      dispatch({ type: 'SIGN_UP_FAILD', error: result.data.message });
    }
  } catch (e) {
    dispatch({ type: 'SIGN_UP_FAILD', error: 'Error in network!' });
  }
};
export const displaySignUpSuccess = () => dispatch => {
  dispatch({ type: 'SIGN_UP_SUCCESS' });
};

export const forgetPassword = (forgetPassUser, routeTo) => async dispatch => {
  try {
    const result = await axios(window.lofoBackend + '/forgetpass', {
      method: 'post',
      data: forgetPassUser,
      withCredentials: true
    });
    // console.log(result);
    if (result.data.error === 0) {
      dispatch({ type: 'RESET_FAILD_MESSAGES' });
      routeTo.push('/');
    } else {
      dispatch({ type: 'FORGET_PASS_FAILD', error: result.data.message });
    }
  } catch (e) {
    dispatch({ type: 'FORGET_PASS_FAILD', error: 'Error in network!' });
  }
};

export const resetPassword = (forgetPassUser, routeTo) => async dispatch => {
  try {
    const result = await axios(window.lofoBackend + '/resetpass', {
      method: 'post',
      data: forgetPassUser,
      withCredentials: true
    });
    // console.log(result);
    if (result.data.error === 0) {
      dispatch({ type: 'RESET_FAILD_MESSAGES' });
      routeTo.push('/');
    } else {
      dispatch({ type: 'FORGET_PASS_FAILD', error: result.data.message });
    }
  } catch (e) {
    console.log('error:' + e);
  }
};
