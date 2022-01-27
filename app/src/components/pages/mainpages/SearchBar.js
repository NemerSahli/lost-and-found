import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { searchForItems } from '../../../actions/search-filter';
import { connect } from 'react-redux';
class SearchBar extends Component {
  state = {
    place: '',
    keyword: ''
  };

  searchHandler = () => {
    if (this.state.place !== '' || this.state.keyword !== '') {
      const searchingKeys = {
        place: this.state.place,
        keyword: this.state.keyword
      };
      this.props.searchForItems(searchingKeys);
    }
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div className="row justify-content-center">
        <Input
          onChange={this.onChangeHandler}
          className="col-8 col-md-4 mt-2 mr-1"
          placeholder="Where? "
          name="place"
          style={{ borderRadius: '25px', minWidth: '100px', maxWidth: '200px' }}
        />
        <Input
          onChange={this.onChangeHandler}
          className="col-8 col-md-4 mt-2"
          placeholder="What?"
          name="keyword"
          style={{ borderRadius: '25px', minWidth: '100px', maxWidth: '200px' }}
        />
        <button
          onClick={this.searchHandler}
          className="btn btn-danger col-8 col-md-3"
          style={{ borderRadius: '25px', minWidth: '100px', maxWidth: '200px' }}
        >
          search
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { searchForItems }
)(SearchBar);
