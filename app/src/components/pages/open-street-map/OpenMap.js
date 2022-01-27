import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomMap from './CustomMap';
import { Jumbotron } from 'reactstrap';
import SearchBar from '../mainpages/SearchBar';
import { loadItems, generateMarkers } from '../../../actions/itemCrud';

class OpenMap extends Component {
  state = {
    markers: [],
    center: null,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadItemsHandler();
  }

  loadItemsHandler = () => {
    this.props.loadItems().then((err) => {
      this.props.generateMarkers();
    });
  };

  render() {
    return (
      <div>
        <div className="row flex-column-reverse flex-md-row">
          <div className="col-12 col-md-5 ">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.loadItemsHandler}
              style={{ borderRadius: '25px', minWidth: '100px' }}
            >
              all
            </button>
          </div>
          <div className="col-12 col-md-7 ">
            <SearchBar />
          </div>
        </div>
        <Jumbotron className="mt-3 alarm-secondary p-0">
          <div className="col-12 row big-map">
            <CustomMap
              markers={this.props.markers}
              center={this.props.center}
            />
          </div>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.itemsReducer.items,
  markers: state.itemsReducer.markers,
  center: state.itemsReducer.center,
});

export default connect(mapStateToProps, { loadItems, generateMarkers })(
  OpenMap
);
