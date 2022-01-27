import axios from 'axios';

export const openLoginSignUpModal = () => dispatch => {
  dispatch({ type: 'OPEN_LOGIN_SIGNUP_MODAL' });
};

export const closeLoginSignUpModal = () => dispatch => {
  dispatch({ type: 'CLOSE_LOGIN_SIGNUP_MODAL' });
};

export const logIn = loginUser => async dispatch => {
  try {
    const response = await axios(window.lofoBackend + '/api/user/login', {
      method: 'post',
      data: loginUser,
      withCredentials: true
    });

    if (response.data.error === 0) {
      dispatch({ type: 'LOGIN', payload: response.data.loggedInUser });
      localStorage.setItem('token', response.data.tokenId);
      localStorage.setItem('userId', response.data.loggedInUser._id);
    } else {
      dispatch({ type: 'LOGIN_FAILD', error: response.data.message });
    }
  } catch (e) {
    dispatch({
      type: 'LOGIN_FAILD',
      error: 'Either wrong email or passowds'
    });
  }
};

export const checkUserAuthenticated = (tokenId, userId) => async dispatch => {
  try {
    const response = await axios(window.lofoBackend + '/api/user/login/auth', {
      method: 'post',
      withCredentials: true,
      data: { userId },
      headers: { 'x-auth-token': tokenId }
    });

    if (response.data.error === 0) {
      dispatch({ type: 'LOGIN', payload: response.data.loggedInUser });
    } else {
      dispatch({ type: 'LOGIN_FAILD', error: response.data.message });
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
    const res = await axios(window.lofoBackend + '/api/user/logout', {
      method: 'get'
      // withCredentials: true
    });

    if (res.data.error === 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      dispatch({ type: 'LOGOUT' });
    }
  } catch (e) {
    console.log(e);
  }
};

export const signUp = (signUpUser, routeTo) => async dispatch => {
  try {
    const result = await axios(window.lofoBackend + '/api/user/register', {
      method: 'post',
      data: signUpUser,
      withCredentials: true
    });
    if (result.data.error === 0) {
      dispatch({ type: 'SIGNUP' });
    } else {
      dispatch({ type: 'SIGN_UP_FAILD', error: result.data.message });
    }
  } catch (e) {
    dispatch({ type: 'SIGN_UP_FAILD', error: 'Internal error!' });
  }
};

export const displaySignUpSuccess = () => dispatch => {
  dispatch({ type: 'SIGN_UP_SUCCESS' });
};

export const forgetPassword = (email, routeTo) => async dispatch => {
  await axios(window.lofoBackend + '/api/user/forget/password/', {
    method: 'post',
    data: { email },
    withCredentials: true
  })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: 'FORGET_PASS_SUCCESS' });
      } else {
        dispatch({ type: 'FORGET_PASS_FAILD', error: response.data.message });
      }
    })
    .catch(error => {
      dispatch({ type: 'FORGET_PASS_FAILD', error: 'Email not found!' });
    });
};

export const resetPassword = resetPassEmail => async dispatch => {
  try {
    const response = await axios(window.lofoBackend + '/api/user/resetpass', {
      method: 'post',
      data: resetPassEmail
    });
    if (response.status === 200 && response.data.error === 0) {
      dispatch({
        type: 'RESET_PASS_SUCCESS',
        payload: 'Your password has been changed!'
      });
    } else {
      dispatch({
        type: 'RESET_PASS_FAILED',
        error: JSON.stringify(response.data.message)
      });
    }
  } catch (error) {
    error.response.data &&
      dispatch({
        type: 'RESET_PASS_FAILED',
        error: error.response.data.message
      });
    console.log('error:' + JSON.stringify(error.response.data));
  }
};

export const startLoadingSpinner = () => dispatch => {
  dispatch({ type: 'START_LOADING_SPINNER' });
};

export const stopLoadingSpinner = () => dispatch => {
  dispatch({ type: 'STOP_LOADING_SPINNER' });
};
