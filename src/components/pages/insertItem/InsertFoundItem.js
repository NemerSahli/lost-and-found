import React, { Component } from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import SelectCategory from './SelectCategory';

import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from './../../../actions/itemCrud';
import CameraComponent from '../camer_and_upload_image/CameraComponent';

class InsertFoundItem extends Component {
  state = {
    name: '',
    location: '',
    date: 'defaultDate',
    time: '12:00',
    comment: '',
    category: 'other',
    lnglat: [52.5065133, 13.1445545],
    image: 'No_Image_Available.jpg',
    imageDataUri: '',
    invalidName: false,
    invalidLocation: false,
    invalidDate: false,
    invalidTime: false,
    invalidComment: false,
    showCamera: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  submitNewItem = event => {
    event.preventDefault();

    const {
      name,
      date,
      time,
      category,
      comment,
      tags,
      location,
      lnglat,
      image
    } = this.state;
    let loggedInUser = this.props.loggedInUser;

    const newItem = {
      userId: loggedInUser._id,
      name: name,
      time: time,
      category: category,
      comment: comment,
      tags: tags,
      location: location,
      lnglat: [lnglat[0], lnglat[1]],
      image: image,
      type: 'found',
      date: ''
    };

    /* image should have a default placeholder.  */
    if (name === '') {
      this.setState({ invalidName: true });
      return;
    }
    if (location === '') {
      this.setState({ invalidLocation: true });
      return;
    }

    if (event.target.date === '') {
      this.setState({ invalidDate: true });
      return;
    }

    if (date === '') {
      this.setState({ invalidDate: true });
      return;
    }
    if (time === '') {
      this.setState({ invalidTime: true });
      return;
    }
    this.props.addItem(newItem, this.props.history);
  };

  toggleShowCamera = () => {
    this.setState({ showCamera: !this.state.showCamera });
  };

  onTakePhoto = imgDataUri => {
    this.setState({
      image: imgDataUri,
      showCamera: false
    });
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
      invalidLocation: false,
      invalidName: false,
      invalidDate: false,
      invalidTime: false,
      invalidComment: false
    });
  };

  selectAddressHandler = (rawAnswer, suggestion) => {
    let location = '';
    if (suggestion.name) {
      location = suggestion.name;
    }
    if (suggestion.administrative) {
      location += ', ' + suggestion.administrative;
    }
    if (suggestion.city) {
      location += ', ' + suggestion.city;
    }
    if (suggestion.country) {
      location += ', ' + suggestion.country;
    }
    this.setState({
      location: location,
      lnglat: [suggestion.latlng.lat, suggestion.latlng.lng]
    });
  };
  render() {
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);

    return (
      <div>
        {this.state.showCamera ? (
          <CameraComponent onTakePhotoHandler={this.onTakePhoto} />
        ) : (
          <div>
            <div className="pt-3">
              <h5 className="text-center">
                Have you <em>FOUND</em> a lost item?
              </h5>
              <hr className="mb-5" />
            </div>

            <div className="container row align-items-center mt-3 flex-column-reverse flex-md-row">
              <div className="col-md-7 p-2">
                <Form onSubmit={this.submitNewItem}>
                  <FormGroup row>
                    <Label for="name" sm={2}>
                      Item:
                    </Label>
                    <Col sm={10}>
                      <Input
                        invalid={this.state.invalidName}
                        type="text"
                        name="name"
                        defaultValue={this.state.name}
                        placeholder="I have found a..."
                        onChange={this.onChangeHandler}
                      />
                      <FormFeedback>This is a required field!</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="location" sm={2}>
                      Location:
                    </Label>
                    <Col sm={10}>
                     
                      {/* this part is to get location address by selecting one of the suggestions */}
                      <AlgoliaPlaces
                        placeholder="Write an address here"
                        options={{
                          appId: 'plV7FOH0L4TX',
                          apiKey: '5f07d771e38fc7ec02c89334c69d8fa1'
                        }}
                        onChange={({
                          query,
                          rawAnswer,
                          suggestion,
                          suggestionIndex
                        }) => this.selectAddressHandler(rawAnswer, suggestion)}
                        onSuggestions={({ rawAnswer, query, suggestions }) =>
                          console.log(
                            'You will receive the array of suggestions that are displayed.'
                          )
                        }
                      />
                      <FormFeedback>This is a required field!</FormFeedback>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="date" sm={2}>
                      Date:
                    </Label>
                    <Col sm={10}>
                      <Input
                        invalid={this.state.invalidDate}
                        type="date"
                        name="date"
                        onChange={this.onChangeHandler}
                        defaultValue={date}
                      />
                      <FormFeedback>This is a required field!</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="time" sm={2}>
                      Time:
                    </Label>
                    <Col sm={10}>
                      <Input
                        invalid={this.state.invalidTime}
                        type="time"
                        name="time"
                        defaultValue={this.state.time}
                        onChange={this.onChangeHandler}
                      />
                      <FormFeedback>This is a required field!</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="time" sm={2}>
                      Category:
                    </Label>
                    <Col sm={10}>
                      <SelectCategory
                        selectCategoryHandler={inputValue => {
                          this.setState({ category: inputValue });
                        }}
                      />
                      <FormFeedback>This is a required field!</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="comment" sm={2}>
                      Comment:
                    </Label>
                    <Col sm={10}>
                      <Input
                        invalid={this.state.invalidComment}
                        type="textarea"
                        name="comment"
                        placeholder="comment?"
                        defaultValue={this.state.comment}
                        onChange={this.onChangeHandler}
                      />
                      <FormFeedback>
                        Please include a comment about the item.
                      </FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup className="float-right mb-0 pb-0">
                    <button
                      className=" btn btn-danger m-0"
                      style={{
                        borderRadius: '25px',
                        minWidth: '100px',
                        maxWidth: '200px'
                      }}
                    >
                      submit
                    </button>
                  </FormGroup>
                </Form>
              </div>
              {/* ==================================== */}
              <div className="col-md-5 p-0   ">
                <div className=" row  p-0 justify-content-center ">
                  <div className="col-12 row justify-content-center mb-3">
                    <img
                      style={{
                        borderRadius: '50%',
                        height: '200px',
                        width: '200px'
                      }}
                      src={
                        this.state.image === 'No_Image_Available.jpg'
                          ? '/images/' + this.state.image
                          : this.state.image
                      }
                      alt=""
                    />
                  </div>
                  <div className="col-12 row mb-0 pb-0 justify-content-center">
                    <FormText className="text-muted">Take a picture</FormText>
                  </div>
                  <FormGroup className="col-12 row mb-0 pb-0 justify-content-center">
                    <button
                      onClick={this.toggleShowCamera}
                      className="btn btn-danger m-0 p-1"
                      style={{
                        borderRadius: '25px',
                        minWidth: '100px',
                        maxWidth: '200px'
                      }}
                    >
                      <i
                        className="fas fa-camera"
                        style={{ fontSize: '25px' }}
                      />
                    </button>
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  imgDataUri: state.itemsReducer.imgDataUri,
  loggedInUser: state.userReducer.loggedInUser
});
export default connect(
  mapStateToProps,
  { addItem }
)(InsertFoundItem);
