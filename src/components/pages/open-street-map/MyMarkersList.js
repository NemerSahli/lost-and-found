import React from 'react';
import MyPopupMarker from './MyPopupMarker';

const MyMarkersList = ({ markers }) => {
  if (markers) {
    const items = markers.map(({ key, ...props }) => (
      <MyPopupMarker key={key} {...props} />
    ));

    return <div style={{ display: 'none' }}>{items}</div>;
  } else {
    return <div style={{ display: 'none' }} />;
  }
};

export default MyMarkersList;
