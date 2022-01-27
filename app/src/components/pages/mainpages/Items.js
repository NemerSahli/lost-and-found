import React, { Component } from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import { Table, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import { loadItems } from '../../../actions/itemCrud';
class Items extends Component {
  render() {
    return (
      <div className="mt-4">
        <small>Results: {this.props.items && this.props.items.length}</small>

        {this.props.items ? (
          <Table className="m-0 striped">
            <tbody>
              {this.props.items.map(item => {
                return item.active ? (
                  <tr key={item._id} className="animated fadeIn">
                    <td>
                      <Item key={item._id} item={item} />
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </Table>
        ) : (
          <Jumbotron className="mt-5 bg-white">
            <h4 className="text-center">{this.props.searchNoResult}</h4>
            <div className="text-center mt-5">
              <Link to="/" onClick={this.props.loadItems}>
                Go Back
              </Link>
            </div>
          </Jumbotron>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.itemsReducer.items,
  searchNoResult: state.itemsReducer.searchNoResult
});

export default connect(
  mapStateToProps,
  { loadItems }
)(Items);
