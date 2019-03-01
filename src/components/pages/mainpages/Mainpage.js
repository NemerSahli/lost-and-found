import React, { Component } from 'react';
import Items from './Items';

import SearchBar from './SearchBar';
import Filter from './Filter';
import { connect } from 'react-redux';
import { loadItems } from '../../../actions/crud';
class Mainpage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadItems();
  }

  render() {
    return (
      <div>
        <div className="row flex-column-reverse flex-md-row">
          <div className="col-12 col-md-5 ">
            <Filter />
          </div>
          <div className="col-12 col-md-7 ">
            <SearchBar />
          </div>
        </div>
        <div>
       
          <Items />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { loadItems }
)(Mainpage);
