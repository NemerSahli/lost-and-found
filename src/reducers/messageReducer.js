const intialState = {
  conversationItems: null,
  conversationUsers: null,
  dialogueMessages: null
};

export default function(state = intialState, action) {
  switch (action.type) {
    case 'ADD_NEW_MESSAGE':
      return {
        ...state,
        dialogueMessages: [...state.dialogueMessages, action.payload]
      };
    case 'LOAD_CONVERSATION_ITEMS':
      // console.log(JSON.stringify(action.payload, null, '\n'));
      return {
        conversationItems: action.payload
      };
    case 'LOAD_DIALOGUE_MESSAGES':
      // console.log(action.users);
      return {
        ...state,
        dialogueMessages: action.payload,
        conversationUsers: action.users
      };
    default:
      return state;
  }
}
