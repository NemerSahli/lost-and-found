import React, {Component } from 'react';
import MyMarkersList from './MyMarkersList';
import {
  Map,
  TileLayer,
  // Marker,
  // Popup,
  // CircleMarker,
  // Circle
  // PropTypes as MapPropTypes
} from 'react-leaflet';

export default class CustomMap extends Component {
  state = {
    zoom: 12,
    markers: [
      // {
      //   key: 'marker1',
      //   // 52.5165133,13.1545545
      //   position: [52.51656455, 13.150798],
      //   children: 'Nemer 0'
      // }
    ]
    // markers: this.props.markers
  };
  componentDidMount() {
    this.setState({
      markers: this.props.markers
    });
  }

  render() {
    // const center = [this.state.lat, this.state.lng];
    return (
      <Map
        className=""
        center={this.props.center}
        zoom={this.state.zoom}
        ref={this.mapRef}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        <MyMarkersList
          markers={this.props.markers}
          removeHandler={this.removeMarker}
        />

        {/* <CircleMarker
          center={[52.55856455, 13.450798]}
          color="red"
          radius={15}
          opacity={0.5}
        >
          <Popup>I lost something here!!!</Popup>
        </CircleMarker> */}

        {/* <Circle center={[52.520008, 13.404954]} fillColor="blue" radius={400}>
          <Popup>I lost something here blue!!!</Popup>
        </Circle> */}
      </Map>
    );
  }
}
