import React, { Component } from 'react';
import CustomMap from '../open-street-map/CustomMap';
export default class ItemDetails extends Component {
  state = {
    markers: []
  };
  render() {
    return (
      <div>
        <h1>Item Details</h1>
        <div className="bg-info row">
          <div className="col-6">
            <img src="/images/404.jpeg" alt="" />
          </div>
          <div className="col-6">
            <CustomMap markers={this.state.markers} />
          </div>
        </div>
      </div>
    );
  }
}
