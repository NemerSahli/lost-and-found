import React, { Component } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { connect } from 'react-redux';
import { loadImage } from '../../../actions/itemCrud';
class CameraComponent extends Component {
  onTakePhoto(imgDataUri) {
    this.props.onTakePhotoHandler(imgDataUri);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="">
        <Camera
          onTakePhoto={dataUri => {
            this.onTakePhoto(dataUri);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          imageCompression={1}
          isMaxResolution={false}
          isImageMirror={false}
          sizeFactor={1}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { loadImage }
)(CameraComponent);
