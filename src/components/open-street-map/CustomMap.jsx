import PropTypes from 'prop-types';
import React, { createRef, Component } from 'react';

import {
  Map,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Circle
  // PropTypes as MapPropTypes
} from 'react-leaflet';

// const ReactLeaflet = require("react-leaflet");

const MyPopupMarker = ({ children, position, removeHandler }) => (
  <Marker position={position}>
    <Popup>
      <span>{children}</span>
      <button onClick={removeHandler}>remove me</button>
    </Popup>
  </Marker>
);
// MyPopupMarker.propTypes = {
//   children: MapPropTypes.children,
//   position: MapPropTypes.latlng
// };

const MyMarkersList = ({ markers, removeHandler }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} removeHandler={removeHandler} />
  ));
  return <div style={{ display: 'none' }}>{items}</div>;
};

MyMarkersList.propTypes = {
  markers: PropTypes.array.isRequired
};

export default class CustomMap extends Component {
  state = {
    lat: 52.520008,

    lng: 13.404954,
    zoom: 12,
    markers: [
      // {
      //   key: 'marker1',
      //   position: [52.50856455, 13.410798],
      //   children: 'Nemer 0'
      // },
      // {
      //   key: 'marker2',
      //   position: [52.54856455, 13.380798],
      //   children: 'Nemer 1'
      // }
    ]
  };

  mapRef = createRef();
  handleClick = e => {
    const map = this.mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
      console.log(e.latlng);
      let markers = this.state.markers;
      markers = [
        ...markers,
        {
          key: 'marker' + markers.length + 1,
          position: [e.latlng.lat, e.latlng.lng],
          children: 'Nemer ' + markers.length + 1
        }
      ];

      this.setState({
        markers: markers
      });
    }
  };
  removeMarker = e => {
    alert('ho');
    console.log(e.target);
  };

  render() {
    const center = [this.state.lat, this.state.lng];
    return (
      <Map
        center={center}
        zoom={this.state.zoom}
        ref={this.mapRef}
        onClick={this.handleClick}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <MyMarkersList
          markers={this.state.markers}
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

        <Circle center={[52.520008, 13.404954]} fillColor="blue" radius={500}>
          <Popup>
            {' '}
            <button onClick={this.removeMarker}>x</button>I lost something here
            blue!!!
          </Popup>
        </Circle>
      </Map>
    );
  }
}
