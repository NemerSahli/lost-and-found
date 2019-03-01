import React, { Component } from 'react';
import ConversationItem from './ConversationItem';
import { connect } from 'react-redux';
import {
  loadConversationItems,
  loadDialogueMessages
} from '../../../actions/messages-handler';

class ConversationItems extends Component {
  componentDidMount() {
    this.props.loadConversationItems(this.props.loggedInUser._id);
  }
  openMessageBox = conversationPort => {
    this.props.loadDialogueMessages(conversationPort);
  };

  render() {
    return (
      <div className="mt-4">
        {this.props.conversationItems ? (
          <table className="col-10">
            <tbody className="col-10">
              {this.props.conversationItems.map(item => {
                return (
                  <tr
                    className="col-10 cursor-pointer"
                    key={item._id}
                    onClick={this.openMessageBox.bind(this, item._id)}
                  >
                    <td className=" col-12">
                      <ConversationItem
                        key={item._id}
                        item={item}
                        imageUrl={item.item[0].imageUrl}
                        loggedInUser={this.props.loggedInUser}
                      />
                      <hr className="p-0 m-0" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h5>You have on messages...</h5>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  conversationItems: state.messageReducer.conversationItems,
  loggedInUser: state.userReducer.loggedInUser
});

export default connect(
  mapStateToProps,
  { loadConversationItems, loadDialogueMessages }
)(ConversationItems);
