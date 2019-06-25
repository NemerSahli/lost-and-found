import React, { Component } from 'react';
import Categories from './Categories';
import { Collapse } from 'reactstrap';
import { connect } from 'react-redux';
import { loadItems } from '../../../actions/itemCrud';

class Filter extends Component {
  state = {
    collapse: false,
    popoverOpen: false
  };

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  render() {
    return (
      <div>
        <div className="d-flex d-md-inline-block justify-content-center">
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.props.loadItems}
            style={{ borderRadius: '25px', minWidth: '100px' }}
          >
            all
          </button>{' '}
          <button
            onClick={this.toggleCollapse}
            className="btn btn-danger"
            style={{
              borderRadius: '25px',
              minWidth: '100px'
            }}
          >
            filter <i className="fas fa-filter" />
          </button>
        </div>

        <div className="row">
          <Collapse isOpen={this.state.collapse} className="m-3 bg">
            <Categories />
          </Collapse>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { loadItems }
)(Filter);
