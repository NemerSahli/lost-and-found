import React from 'react';

export default function Spinner() {
  return (
    <div className="row justify-content-center">
      <div className="spinner-block">
        <div className="spinner spinner-3 row justify-content-center">
          <img
            className="marker-spinner image-fit"
            src="/images/redMarker.png"
            alt=""
            style={{
              width: '200px',
              height: '120px'
            }}
          />
        </div>
      </div>
    </div>
  );
}
