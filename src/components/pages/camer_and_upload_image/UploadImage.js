import React from 'react';
import ImageUploader from 'react-images-upload';


class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
    // console.log(picture);
  }

  render() {
    return (
      <div>
        <ImageUploader
          withIcon={false}
          buttonClassName="bg-danger text-white"
          buttonText="Choose image"
          onChange={this.onDrop}
          imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
          maxFileSize={5242880}
          fileContainerStyle={{
            border: 'none',
            boxShadow: 'none'
          }}
        />
        {/* {this.state.pictures &&
          [...this.state.pictures].map(file => (
            <img src={URL.createObjectURL(file)} />
          ))} */}
        {this.state.pictures &&
          this.state.pictures.map(file => (
            <img
              src={URL.createObjectURL(file)}
              style={{
                borderRadius: '50%',
                height: '200px',
                width: '200px'
                // marginBottom: '120px'
              }}
              alt=""
            />
          ))}
      </div>
    );
  }
}
export default UploadImage;
