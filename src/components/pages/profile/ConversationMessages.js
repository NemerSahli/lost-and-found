import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConversationMessages extends Component {
  componentDidUpdate() {
    var scrollHeight = 1000;
    if (this.props.dialogueMessages) {
      scrollHeight = this.props.dialogueMessages.length * 100;
    }
    document
      .getElementById('convesation-messages-id')
      .scrollTo(0, scrollHeight);
    return true;
  }

  render() {
    return (
      <div
        id="convesation-messages-id"
        className="pre-scrollable"
        style={{ height: '300px' }}
      >
        <div className="p-1" style={{ background: 'none' }}>
          {this.props.dialogueMessages &&
            this.props.dialogueMessages.map(message => {
              return (
                <p
                  key={message._id}
                  className={
                    message.toUserId !== this.props.loggedInUser._id
                      ? 'p-4 col-9 offset-1 left-in'
                      : 'p-4 col-9 offset-2 right-in'
                  }
                  style={{ background: '#f5f5f5', borderRadius: '5px' }}
                >
                  {message.messageContent}
                  <small className="float-right">
                    {message.date.split('T')[1].slice(0, 5)}
                  </small>
                </p>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dialogueMessages: state.messageReducer.dialogueMessages,
  loggedInUser: state.userReducer.loggedInUser
});

export default connect(
  mapStateToProps,
  null
)(ConversationMessages);
