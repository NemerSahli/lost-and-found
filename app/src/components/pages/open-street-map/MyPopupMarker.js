import React from 'react';
import { Link } from 'react-router-dom';
import { Marker, CircleMarker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

const MyPopupMarker = ({
  children,
  position,
  color,
  itemType,
  id,
  imageUrl
}) => (
  <div>
    <Circle
      center={position}
      fillColor={color}
      color={color}
      radius={500}
      hasBorder={false}
    />
    />
    <CircleMarker
      title={children}
      center={position}
      color={color}
      radius={15}
      opacity={0.5}
    />
    <Marker
      position={position}
      color={color}
      icon={L.icon({
        iconUrl: '/images/' + color + 'Marker.png',
        iconSize: [160, 90],
        iconAnchor: [80, 68],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
      })}
    >
      <Popup>
        <div className="row p-0 justify-content-center">
          <p className="p-0 m-0">
            {itemType}: {children}
          </p>
          <img
            src={'/images/' + imageUrl}
            width="70px"
            height="70px"
            alt=""
            className="image-fit"
          />
        </div>
        <Link to={'/itemdetails/' + id}>more info...</Link>
      </Popup>
    </Marker>
  </div>
);

export default MyPopupMarker;
