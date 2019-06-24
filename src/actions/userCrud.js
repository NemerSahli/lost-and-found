import axios from 'axios';
// import { runInContext } from 'vm';

export const updateProfile = (newDataUser, id, route) => dispatch => {
  axios({
    method: 'put',
    url: window.lofoBackend + '/api/user/updateuser/' + id,
    data: newDataUser,
    withCredentials: true
  })
    .then(response => {
      if (response.data.error === 0) {
        // console.log(response.data);
        dispatch({ type: 'UPDATE_PROFILE', payload: response.data.newData });
        route.push('/myaccount');
      }
    })
    .catch(error => {
      console.log(error);
    });
};
