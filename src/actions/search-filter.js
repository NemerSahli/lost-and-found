import axios from 'axios';

export const searchForItems = searchingKeys => async dispatch => {
  try {
    const response = await axios({
      method: 'get',
      url:
        window.lofoBackend +
        '/search?p=' +
        searchingKeys.place +
        '&k=' +
        searchingKeys.keyword

      // withCredentials: true
    });
    if (response.data) {
      dispatch({
        type: 'SEARCH_FOR_ITEMS',
        payload: response.data.documents
      });
      // console.log('response', response.data);
    }
  } catch (e) {
    console.log('error in loading items:' + e);
  }
};

export const filterItems = filterKeys => dispatch => {
  dispatch({ type: 'FILTER_ITEMS', payload: filterKeys });
};
