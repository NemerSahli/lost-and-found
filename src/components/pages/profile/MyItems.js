import React, { Component } from 'react';
import { Table, Collapse } from 'reactstrap';
import ItemProfile from './ItemProfile';
import { connect } from 'react-redux';
import { loadMyItems } from '../../../actions/itemCrud';

class MyItems extends Component {
  state = {
    collapse: false,
    visible: true
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  componentDidMount() {
    this.props.loadMyItems(this.props.loggedInUser._id);
  }

  render() {
    let tableBodyLess =
      this.props.myItems &&
      this.props.myItems.map((item, i) => {
        if (i <= 3) {
          return <ItemProfile key={item._id} item={item} />;
        }
      });
    let tableBodyMore =
      this.props.myItems &&
      this.props.myItems.map(item => {
        return <ItemProfile key={item._id} item={item} />;
      });

    return (
      <div>
        <h5 className="text-center">My Items History:</h5>
        <hr />

        <Table striped>
          <tr>
            <th>
              <b>Image</b>
            </th>
            <th>
              <b>Title</b>
            </th>
            <th>
              <b>Type</b>
            </th>
            <th>
              <b>Time</b>
            </th>
            <th>
              <b>Date</b>
            </th>
            <th>
              <b>Status</b>
            </th>
            <th>
              <b>Stop</b>
            </th>
          </tr>

          {!this.state.collapse ? (
            <tbody>{tableBodyLess}</tbody>
          ) : (
            <tbody>{tableBodyMore}</tbody>
          )}
        </Table>

        {this.state.collapse ? (
          <div className="profile-collapse__item">
            <i
              className="fas fa-arrow-up text-muted"
              onClick={this.toggle}
              style={{ cursor: 'pointer' }}
            >
              {' '}
              Show less
            </i>
          </div>
        ) : (
          <div className="profile-collapse__item">
            <i
              className="fas fa-arrow-down text-muted"
              onClick={this.toggle}
              style={{ cursor: 'pointer' }}
            >
              {' '}
              Show more ...
            </i>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myItems: state.itemsReducer.myItems,
  loggedInUser: state.userReducer.loggedInUser
});

export default connect(
  mapStateToProps,
  { loadMyItems }
)(MyItems);
