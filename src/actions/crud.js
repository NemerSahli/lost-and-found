import axios from 'axios';

export const loadUsers = () => async dispatch => {
  try {
    const result = await axios('http://localhost:8000/users', {
      method: 'get',
      withCredentials: true
    });
    if (result.data.error === 0) {
      dispatch({
        type: 'LOAD_USERS',
        users: result.data.users
      });
    }
  } catch (e) {
    alert('error:' + e);
  }
};

export const addUser = newUser => dispatch => {
  axios({
    method: 'post',
    url: 'http://localhost:8000/adduser',
    data: newUser,
    withCredentials: true
  })
    .then(response => {
      if (response.data.error === 0) {
        dispatch({ type: 'ADD_USER', newUser: response.data.newUser });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateUser = newUser => dispatch => {
  axios({
    method: 'put',
    url: 'http://localhost:8000/updateuser',
    data: newUser,
    withCredentials: true
  })
    .then(response => {
      if (response.data.error === 0) {
        dispatch({ type: 'UPDATE_USER', newUser: newUser });
        dispatch({ type: 'CLOSE_UPDATE_MODAL' });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteUser = userId => dispatch => {
  axios('http://localhost:8000/deleteuser/' + userId, {
    method: 'delete',
    withCredentials: true
  })
    .then(response => {
      if (response.data.error === 0) {
        dispatch({ type: 'DELETE_USER', userId: userId });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const openUpdateModal = userId => dispatch => {
  dispatch({ type: 'OPEN_UPDATE_MODAL', userId: userId });
};
