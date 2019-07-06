import React, { Component } from 'react';
import ConversationMessages from './ConversationMessages';
import { connect } from 'react-redux';
import { FormGroup, Label, Input } from 'reactstrap';
import { sendMessage } from '../../../actions/messages-handler';
class ConversationBody extends Component {
  state = {
    messageText: ''
  };

  onKeyPressHandler = e => {
    if (e.key === 'Enter') {
      this.sendMessageHandler(e);
    }
  };

  onChangeHandler = event => {
    this.setState({
      messageText: event.target.value
    });
  };

  sendMessageHandler = () => {
    if (this.props.dialogueMessages) {
      if (this.state.messageText !== '') {
        var toUserId = '';

        if (
          this.props.loggedInUser._id ===
          this.props.dialogueMessages[0].toUserId
        ) {
          toUserId = this.props.dialogueMessages[0].fromUserId;
        } else {
          toUserId = this.props.dialogueMessages[0].toUserId;
        }

        let newMessage = {
          messageContent: this.state.messageText,
          itemId: this.props.dialogueMessages[0].itemId,
          fromUserId: this.props.loggedInUser._id,
          toUserId: toUserId,
          date: new Date()
        };
        this.props.sendMessage(newMessage, 'dialogue');
        this.setState({
          messageText: ''
        });
        document.getElementById('message-input').value = '';
      }
    }
  };

  render() {
    return (
      <div id="send-message-body-id" className="mt-4">
        <h5>
          {this.props.conversationUsers && this.props.dialogueMessages ? (
            this.props.conversationUsers ? (
              <div>
                <img
                  src={
                    '/images/' + this.props.conversationUsers.itemId.imageUrl
                  }
                  className="image-fit"
                  alt="..."
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%'
                  }}
                />

                {this.props.conversationUsers.itemId.name}
              </div>
            ) : null
          ) : null}
        </h5>
        <ConversationMessages />
        <FormGroup className="mt-3">
          <Label for="exampleText">
            Message to
            {this.props.conversationUsers && this.props.dialogueMessages
              ? this.props.conversationUsers.fromUserId._id ===
                this.props.loggedInUser._id
                ? this.props.conversationUsers.toUserId.firstName
                : this.props.conversationUsers.fromUserId.firstName
              : '...'}
          </Label>

          <Input
            onKeyPress={this.onKeyPressHandler}
            id="message-input"
            onChange={this.onChangeHandler}
            type="textarea"
            name="messageText"
            disabled={
              this.props.dialogueMessages &&
              this.props.conversationUsers &&
              this.props.conversationUsers.itemId.active
                ? false
                : true
            }
          />
        </FormGroup>
        <button
          className="btn btn-danger float-right"
          style={{ borderRadius: '25px' }}
          onClick={this.sendMessageHandler}
          disabled={this.props.dialogueMessages ? false : true}
        >
          <i
            className="fas fa-send text-light mr-2"
            style={{
              fontSize: '15px'
            }}
          >
            Send
          </i>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dialogueMessages: state.messageReducer.dialogueMessages,
  conversationUsers: state.messageReducer.conversationUsers,
  loggedInUser: state.userReducer.loggedInUser
});

export default connect(
  mapStateToProps,
  { sendMessage }
)(ConversationBody);
