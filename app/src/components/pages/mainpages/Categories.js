import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterItems } from '../../../actions/search-filter';

class Categories extends Component {
  filterItemsHandler = filterKeys => {
    this.props.filterItems(filterKeys);
  };

  render() {
    return (
      <div>
        {this.props.categoryList &&
          this.props.categoryList.map(category => {
            return (
              <button
                key={category.value}
                className={'btn btn-sm ' + category.color}
                style={{ borderRadius: '25px' }}
                onClick={this.filterItemsHandler.bind(this, category.value)}
              >
                {category.label}
              </button>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoryList: state.itemsReducer.categoryList
});

export default connect(
  mapStateToProps,
  { filterItems }
)(Categories);
