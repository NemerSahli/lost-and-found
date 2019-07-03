import React, { Component } from 'react';
import { Table } from 'reactstrap';
import ItemProfile from './ItemProfile';
import { connect } from 'react-redux';
import { loadMyItems } from '../../../actions/itemCrud';

class MyItems extends Component {
  state = {
    collapse: false
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  async componentDidMount() {
    await this.props.loadMyItems(this.props.loggedInUser._id);
  }

  render() {
    return (
      <div>
        <h5 className="text-center">My Items History:</h5>
        <hr className="mb-3" />

        <Table striped>
          <thead className="mb-3">
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
          </thead>

          {!this.state.collapse ? (
            <tbody>
              {this.props.myItems &&
                this.props.myItems.map((item, i) => {
                  if (i <= 3) {
                    return (
                      <ItemProfile
                        key={item._id}
                        item={item}
                        active={item.active}
                      />
                    );
                  }
                })}
            </tbody>
          ) : (
            <tbody>
              {this.props.myItems &&
                this.props.myItems.map(item => {
                  return (
                    <ItemProfile
                      key={item._id}
                      item={item}
                      active={item.active}
                    />
                  );
                })}
            </tbody>
          )}
        </Table>

        {this.state.collapse ? (
          <div className="profile-collapse__item">
            <i
              className="fas fa-arrow-up text-muted"
              onClick={this.toggle}
              style={{ cursor: 'pointer' }}
            >
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
