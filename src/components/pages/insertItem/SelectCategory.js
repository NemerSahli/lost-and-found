import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { connect } from 'react-redux';
class SelectCategory extends Component {
  state = {
    inputValue: '',
    selectOptions: this.props.categoryList
  };
  handleInputChange = newValue => {
    // console.log('inputvalue:', newValue);
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  filterOptions = inputValue => {
    return this.state.selectOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(this.filterOptions(inputValue));
    }, 1000);
  };
  handleChange = (newValue, actionMeta) => {
    console.log(newValue.value);
    this.props.selectCategoryHandler(newValue.value);
    console.groupEnd();
  };

  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          onChange={this.handleChange}
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoryList: state.itemsReducer.categoryList
});
export default connect(
  mapStateToProps,
  null
)(SelectCategory);
