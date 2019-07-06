import axios from 'axios';

export const loadItems = () => async dispatch => {
  try {
    const result = await axios(window.lofoBackend + '/api/items/itemList', {
      method: 'get'
      // withCredentials: true
    });

    if (result.data) {
      dispatch({
        type: 'LOAD_ITEMS',
        payload: result.data.items.reverse() // display the last item in array on top
      });
    }
  } catch (e) {
    console.log('error in loading items:' + e);
  }
};

export const loadMyItems = id => async dispatch => {
  try {
    let token = localStorage.getItem('token');

    const result = await axios(
      window.lofoBackend + '/api/items/my/items/' + id,
      {
        method: 'get',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      }
    );

    if (result.data) {
      dispatch({
        type: 'LOAD_My_ITEMS',
        payload: result.data.items.reverse() // display the last item in array on top
      });
    }
  } catch (e) {
    console.log('error in loading items:' + e);
  }
};

export const addItem = (newItem, routeTo) => dispatch => {
  let token = localStorage.getItem('token');
  axios({
    method: 'post',
    url: window.lofoBackend + '/api/items/add/item',
    data: newItem,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  })
    .then(response => {
      if (response.data.error === 0) {
        dispatch({ type: 'DEFAULT' });
        routeTo.push('/');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const deactivateItem = id => dispatch => {
  axios({
    method: 'put',
    url: window.lofoBackend + '/api/items/deactivate/' + id
    // withCredentials: true
  })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: 'DEACTIVATE_CONVERSATION_ITEM', itemId: id });
        dispatch({ type: 'DEACTIVATE_ITEM', itemId: id });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const loadImage = (imgDataUri, route) => dispatch => {
  dispatch({ type: 'LOAD_IMAGE', payload: imgDataUri });
  route.push('/insertFoundItem');
};

export const generateMarkers = () => dispatch => {
  dispatch({ type: 'GENERATE_MARKERS' });
};
