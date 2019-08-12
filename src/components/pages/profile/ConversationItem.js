import React, { Component } from 'react';
import { FormText } from 'reactstrap';

class ConversationItem extends Component {
  render() {
    var displayUserSender = '';
    if (
      this.props.loggedInUser.firstName ===
      this.props.item.fromUser[0].firstName
    ) {
      displayUserSender = this.props.item.toUser[0].firstName;
    } else {
      displayUserSender = this.props.item.fromUser[0].firstName;
    }

    return (
      <a href="#send-message-body-id" className="no-underline">
        <div
          className={this.props.item.item[0].active ? 'active' : 'deactivated'}
        >
          {!this.props.item.item[0].active ? (
            <img src="/images/deactivated.png" alt="" srcset="" />
          ) : null}
        </div>
        <div className="row p-3">
          <div className="col-6 no-underline">
            <h5 className="no-underline">{displayUserSender}</h5>
            {this.props.item.messageContent.slice(0, 25) + '...'}
            <FormText color="muted">
              {this.props.item.date.slice(11, 16)}
            </FormText>
          </div>

          <div className="col-6">
            <div className="float-right">
              <FormText className="text-muted row ">
                {this.props.item.date.slice(0, 10)}
              </FormText>
              <img
                className="image-fit row "
                src={'/images/' + this.props.imageUrl}
                alt="..."
                style={{
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px'
                }}
              />
              <FormText color="muted" className="text-center row ">
                {this.props.item.item[0].name}
              </FormText>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

export default ConversationItem;
