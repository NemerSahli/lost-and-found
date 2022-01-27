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
      return {
        ...state,
        conversationItems: action.payload
      };
    case 'DEACTIVATE_CONVERSATION_ITEM':
      return {
        ...state,
        conversationItems: deactivateConversationItem(
          state.conversationItems,
          action.itemId
        ),
        dialogueMessages: null,
        conversationUsers: null
      };
    case 'LOAD_DIALOGUE_MESSAGES':
      return {
        ...state,
        dialogueMessages: action.payload,
        conversationUsers: action.users
      };
    default:
      return state;
  }
}

function deactivateConversationItem(items, id) {
  let newItems = items.map(item => {
    if (item.itemId === id) {
      item.item[0].active = false;
      return item;
    } else {
      return item;
    }
  });
  return newItems;
}
