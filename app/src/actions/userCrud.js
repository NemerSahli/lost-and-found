import axios from 'axios';

export const updateProfile = (newDataUser, id, route) => dispatch => {
  let token = localStorage.getItem('token');
  axios({
    method: 'put',
    url: window.lofoBackend + '/api/user/updateuser/' + id,
    data: newDataUser,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  })
    .then(response => {
      if (response.data.error === 0) {
        dispatch({ type: 'UPDATE_PROFILE', payload: response.data.newData });
        route.push('/myaccount');
      }
    })
    .catch(error => {
      console.log(error);
    });
};
