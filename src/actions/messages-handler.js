import axios from 'axios';

export const sendMessage = (
  newMessage,
  messageSource,
  routeTo
) => async dispatch => {
  try {
    const response = await axios({
      method: 'post',
      url: window.lofoBackend + '/message',
      data: newMessage,
      withCredentials: true
    });
    if (response.data.error === 0) {
      // console.log('response', response.data);
      if (messageSource === 'dialogue') {
        dispatch({
          type: 'ADD_NEW_MESSAGE',
          payload: response.data.message
        });
      } else {
        dispatch({
          type: 'SEND_MESSAGE'
        });
        routeTo.push('/');
      }
    }
  } catch (e) {
    console.log('error in loading items:' + e);
  }
};

export const loadConversationItems = loggedInUserId => async dispatch => {
  try {
    const response = await axios({
      method: 'get',
      url: window.lofoBackend + '/conversationitems/' + loggedInUserId,
      withCredentials: true
    });
    if (response.data) {
      dispatch({
        type: 'LOAD_CONVERSATION_ITEMS',
        payload: response.data.documents
      });
      // console.log('response', response.data);
    }
  } catch (e) {
    console.log('error in loading conversation items:' + e);
  }
};

export const loadDialogueMessages = conversationPort => async dispatch => {
  try {
    const response = await axios({
      method: 'get',
      url: window.lofoBackend + '/load/dialogue/messages/' + conversationPort,
      withCredentials: true
    });
    if (response.data) {
      // console.log('response', response.data);
      dispatch({
        type: 'LOAD_DIALOGUE_MESSAGES',
        payload: response.data.documents,
        users: response.data.users
      });
    }
  } catch (e) {
    console.log('error in loading messages :' + e);
  }
};
