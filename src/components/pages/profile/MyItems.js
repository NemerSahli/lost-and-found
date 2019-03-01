import React, { Component } from 'react';
import { Table, Collapse } from 'reactstrap';
import ItemProfile from './ItemProfile';
import { connect } from 'react-redux';
import { loadMyItems } from '../../../actions/crud';

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
    return (
      <div>
        <h5 className="text-center">My Items History:</h5>
        <hr />

        <Collapse isOpen={this.state.collapse}>
          <Table striped>
            <tr>
              <td>
                <b>Image</b>
              </td>
              <td>
                <b>Title</b>
              </td>
              <td>
                <b>Type</b>
              </td>
              <td>
                <b>Time</b>
              </td>
              <td>
                <b>Date</b>
              </td>
              <td>
                <b>Active</b>
              </td>
            </tr>

            <tbody>
              {this.props.myItems &&
                this.props.myItems.map(item => {
                  return <ItemProfile key={item._id} item={item} />;
                })}
            </tbody>
          </Table>
        </Collapse>

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
              Show Items
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
