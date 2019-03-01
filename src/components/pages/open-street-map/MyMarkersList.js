import React from 'react';
import PropTypes from 'prop-types';
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

MyMarkersList.propTypes = {
  markers: PropTypes.array.isRequired
};
export default MyMarkersList;
