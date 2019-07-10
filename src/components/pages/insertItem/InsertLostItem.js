import React, { Component } from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import config from '../../../config.json';

import axios from 'axios';
import { Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../../../actions/itemCrud';
import ImageUploader from 'react-images-upload';
import SelectCategory from './SelectCategory';

class InsertLostItem extends Component {
  state = {
    name: '', //required
    location: '', //required
    date: 'defaultDate',
    time: '12:00',
    category: 'other',
    comment: '', //required
    tags: ['others'],
    lnglat: [52.5065133, 13.1445545], //required
    image: 'No_Image_Available.jpg',
    imageDataUri: '',
    invalidName: false,
    invalidLocation: false,
    invalidDate: false,
    invalidTime: false,
    invalidComment: false,
    pictures: []
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
      type: 'lost',
      date: ''
    };

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
    if (comment === '') {
      this.setState({ invalidComment: true });
      return;
    }

    if (this.state.pictures.length > 0) {
      const data = new FormData();

      if (this.state.pictures.length === 0) return;
      data.append(
        'imageFile',
        this.state.pictures[0],
        this.state.pictures[0].name
      );
      data.append('newItem', JSON.stringify(newItem));
      let token = localStorage.getItem('token');
      axios(window.lofoBackend + '/api/items/add/lost/item', {
        method: 'post',
        data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      })
        .then(result => {
          if (result.data) {
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.log('error to post this item:', err);
        });
    } else {
      this.props.addItem(newItem, this.props.history);
    }
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

  onDropPicture = picture => {
    if (picture.length > 0) {
      let pictures = [picture[picture.length - 1]];
      this.setState({
        pictures: pictures,
        invalidImageSize: ''
      });
    }
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
        <div className="pt-3">
          <h5 className="text-center">
            Have you <em>LOST</em> an item?
          </h5>
          <hr className="mb-5" />
        </div>

        <div className="container row align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-7 ">
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
                    placeholder="I have lost a..."
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
                  <AlgoliaPlaces
                    placeholder="Write an address here"
                    options={{
                      appId: config.algoliaAppId,
                      apiKey: config.algoliaApiKey
                    }}
                    onChange={({
                      query,
                      rawAnswer,
                      suggestion,
                      suggestionIndex
                    }) => this.selectAddressHandler(rawAnswer, suggestion)}
                    onSuggestions={({ rawAnswer, query, suggestions }) =>
                      console.log('You will receive the array of suggestions.')
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

            {/* ==================================== */}
          </div>

          <div className="col-md-5 ">
            <div className=" row   justify-content-center mt-4">
              <div className="col-12 row justify-content-center mt-4">
                <img
                  className="image-fit"
                  style={{
                    borderRadius: '50%',
                    height: '200px',
                    width: '200px'
                  }}
                  src={
                    this.state.pictures.length > 0
                      ? window.URL.createObjectURL(this.state.pictures[0])
                      : '/images/' + this.state.image
                  }
                  alt=""
                />
              </div>
              <FormGroup className="col-12 row mb-0 pb-0 justify-content-center">
                <ImageUploader
                  withIcon={true}
                  buttonClassName="fas fa-image fa-2x btn-danger"
                  buttonStyles={{ padding: '13px' }}
                  buttonText=" CHOOSE IMAGE"
                  onChange={this.onDropPicture}
                  imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
                  maxFileSize={5242880}
                  fileContainerStyle={{
                    border: 'none',
                    boxShadow: 'none'
                  }}
                />
              </FormGroup>
            </div>
          </div>
        </div>
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
)(InsertLostItem);
