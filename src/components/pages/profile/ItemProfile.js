import React, { Component } from 'react';
class ItemProfile extends Component {
  render() {
    return (
      <tr>
        <td>
          {' '}
          <img
            className="image-fit"
            src={'/images/' + this.props.item.imageUrl}
            alt=""
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%'
            }}
          />
        </td>
        <td>
          {' '}
          <h5>{this.props.item.name}</h5>
        </td>
        <td>{this.props.item.type}</td>
        <td>
          {' '}
          <small>{this.props.item.time}</small>
        </td>
        <td>{this.props.item.date.slice(0, 10)}</td>

        <td>
          <i className="fas fa-check-circle text-success" />
        </td>
        <td>
          <i class="far fa-pause-circle mr-2 cursor-pointer" />
          <i class="far fa-stop-circle cursor-pointer" />
        </td>
      </tr>
    );
  }
}

export default ItemProfile;
