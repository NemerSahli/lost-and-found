import React, { Component, Fragment } from 'react';
import { deactivateItem } from './../../../actions/itemCrud';
import { connect } from 'react-redux';
class ItemProfile extends Component {
  render() {
    const { item } = this.props;
    return (
      <tr>
        <td>
          {' '}
          <img
            className="image-fit"
            src={'/images/' + item.imageUrl}
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
          <h5>{item.name}</h5>
        </td>
        <td>{item.type}</td>
        <td>
          {' '}
          <small>{item.time}</small>
        </td>
        <td>{item.date.slice(0, 10)}</td>

        {item.active ? (
          <Fragment>
            <td>
              <i className="fas fa-check-circle text-success">Active</i>
            </td>
            <td>
              <i
                class="far fa-stop-circle cursor-pointer"
                onClick={() => {
                  this.props.deactivateItem(item._id);
                }}
              />
            </td>
          </Fragment>
        ) : (
          <Fragment>
            <td>
              <i className="fas fa-minus-circle text-danger">Deactivated</i>
            </td>
            <td>
              <i className="fas fa-ban text-danger" />
            </td>
          </Fragment>
        )}
      </tr>
    );
  }
}

export default connect(
  null,
  { deactivateItem }
)(ItemProfile);
