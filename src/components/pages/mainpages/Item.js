import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
  render() {
    const {
      _id,
      name,
      comment,
      location,
      time,
      imageUrl,
      type,
      date
    } = this.props.item;
    const path = '/itemdetails/' + _id;
    return (
      <div>
        <Link to={path} className="no-underline">
          <div className="mb-2">
            <i
              className={
                type === 'found'
                  ? 'fas fa-circle text-success d-inline'
                  : 'fas fa-circle text-danger d-inline'
              }
            />
            <strong>{' ' + type.toUpperCase() + ': '}</strong>
            <h4 className="text-dark d-inline">{name}</h4>
          </div>

          <div className="row flex-column-reverse flex-md-row">
            <div className="col-12 col-md-8">
              <p className="lead text-dark">{comment}</p>
              <p className="mt-4 text-dark">
                <strong>Location:</strong> {location}
              </p>
              <p className="">
                <strong>Date:</strong> {date.slice(0, 10)}
              </p>
              <p className="mb-1 text-dark ">
                <strong>Time:</strong> {time}
              </p>
            </div>
            <div className="col-12 col-md-4 text-center mt-2 mb-3">
              <img
                src={'/images/' + imageUrl}
                //  {image}
                alt=""
                height="130px"
                width="130px"
                className="rounded-circle image-fit float-md-right"
              />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Item;
