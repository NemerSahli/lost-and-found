import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomMap from '../open-street-map/CustomMap';
import { Jumbotron } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import ItemImageModal from './ItemImageModal';
import { sendMessage } from '../../../actions/messages-handler';
class ItemDetails extends Component {
  state = {
    currentItem: null,
    markers: null,
    modalIsOpen: false,
    messageContent: ''
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    let id = this.props.match.params.id;
    if (this.props.items) {
      let currentItem = this.props.items.filter(item => item._id === id);
      if (currentItem.length === 1) {
        var markers = currentItem.map(item => {
          let lnglat = item.lnglat.split(',');
          var color = '';
          item.type === 'lost' ? (color = 'red') : (color = 'green');
          return {
            key: item._id,
            id: item._id,
            position: [Number(lnglat[0]), Number(lnglat[1])],
            children: item.name,
            color: color,
            itemType: item.type,
            imageUrl: item.imageUrl
          };
        });
        this.setState({
          currentItem: currentItem[0],
          markers: markers,
          center: markers[0].position
        });
      }
    }
  }

  toggleImageModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  };

  onKeyPressHandler = e => {
    if (e.key === 'Enter') {
      this.sendMessageHandler(e);
    }
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  sendMessageHandler = event => {
    event.preventDefault();
    if (this.state.messageContent !== '') {
      let loggedInUser = this.props.loggedInUser;

      let date = new Date();

      let newMessage = {
        fromUserId: loggedInUser._id,
        toUserId: this.state.currentItem.userId,
        messageContent: this.state.messageContent,
        itemId: this.state.currentItem._id,
        date: date
      };
      this.props.sendMessage(newMessage, 'itemDetails', this.props.history);
    }
  };

  render() {
    const { currentItem } = this.state;
    return this.state.currentItem ? (
      <div className="mt-3">
        <div className="mb-2">
          <i
            className={
              currentItem.type === 'found'
                ? 'fas fa-circle text-success d-inline'
                : 'fas fa-circle text-danger d-inline'
            }
          />
          <strong>{' ' + currentItem.type.toUpperCase() + ': '}</strong>
          <h4 className="ml-2  d-inline">{currentItem.name}</h4>
        </div>

        <hr className="my-2" />
        <div className="row item-details mt-4">
          <div className="col-12 col-md-8 mb-3 ">
            <div className="row">
              <div className="col-12 col-md-7 text-center">
                <img
                  onClick={this.toggleImageModal}
                  height="250px"
                  width="250px"
                  src={'/images/' + currentItem.imageUrl}
                  alt=""
                  className="rounded-circle image-fit"
                />
              </div>
              <div className="col-12 col-sm-6  col-md-5 mt-5">
                <p className="mt-4">
                  <strong>Location:</strong> {currentItem.location}
                </p>
                <p className="">
                  <strong>Date:</strong> {currentItem.date.slice(0, 10)}
                </p>
                <p className="">
                  <strong>Time:</strong> {currentItem.time}
                </p>
              </div>
              <div className="col-12">
                <p className="lead mt-3 p-3">{currentItem.comment}</p>
              </div>
              <Form
                onSubmit={this.sendMessageHandler}
                className="col-12 col-md-10"
              >
                <FormGroup className="col-12">
                  <Label color="muted" for="exampleText">
                    Send message
                  </Label>
                  <Input
                    onKeyPress={this.onKeyPressHandler}
                    onChange={this.onChangeHandler}
                    type="textarea"
                    name="messageContent"
                    id="exampleText"
                    disabled={
                      this.props.loggedIn
                        ? this.props.loggedInUser._id === currentItem.userId
                          ? true
                          : false
                        : true
                    }
                    placeholder={
                      this.props.loggedIn
                        ? 'write your message here ...'
                        : 'Please login or sign up to send message...'
                    }
                  />
                  <FormText color="muted" className="row ml-2">
                    By submitting this message, you agree to our Terms of Use
                    and our Privacy Policy.
                  </FormText>
                </FormGroup>
                <div className=" col-12">
                  <Button
                    color="danger"
                    style={{
                      borderRadius: '25px',
                      minWidth: '100px',
                      maxWidth: '200px'
                    }}
                    disabled={
                      this.props.loggedIn
                        ? this.props.loggedInUser._id === currentItem.userId
                          ? true
                          : false
                        : true
                    }
                  >
                    <i className="far fa-paper-plane mr-1" />
                    Send
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-12  col-md-4  row item-details-map">
            <CustomMap
              markers={this.state.markers}
              center={this.state.center}
            />
          </div>
          <div />
        </div>

        <ItemImageModal
          toggeleModalHandler={this.toggleImageModal}
          modalIsOpen={this.state.modalIsOpen}
          imageUrl={'/images/' + currentItem.imageUrl}
        />
      </div>
    ) : (
      <Jumbotron className="mt-5 bg-white">
        <h4 className="text-center">
          Sorry can't show this item details, try again later!!!
        </h4>
        <div className="text-center mt-5">
          <Link to="/mainpage">Go Back</Link>
        </div>
      </Jumbotron>
    );
  }
}

const mapStateToProps = state => ({
  items: state.itemsReducer.items,
  loggedInUser: state.userReducer.loggedInUser,
  loggedIn: state.userReducer.loggedIn
});

export default connect(
  mapStateToProps,
  { sendMessage }
)(ItemDetails);
