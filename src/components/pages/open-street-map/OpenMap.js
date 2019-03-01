import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomMap from './CustomMap';
import { Jumbotron } from 'reactstrap';
import SearchBar from '../mainpages/SearchBar';
import { loadItems } from '../../../actions/crud';
import { generateMarkers } from '../../../actions/crud';

class OpenMap extends Component {
  state = {
    markers: [],
    center: null
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadItemsHandler();
  }

  loadItemsHandler = () => {
    this.props.loadItems().then(err => {
      this.props.generateMarkers();
    });
  };
  // constructor(props) {
  //   super(props);
  //   this.props.loadItems().then(() => {
  //     if (this.props.items) {
  //       var averageLat = 0;
  //       var averageLng = 0;
  //       var markers = this.props.items.map(item => {
  //         let lnglat = item.lnglat.split(',');
  //         var color = '';
  //         item.type === 'lost' ? (color = 'red') : (color = 'green');
  //         averageLat += Number(lnglat[0]);
  //         averageLng += Number(lnglat[1]);

  //         return {
  //           key: item._id,
  //           id: item._id,
  //           position: [Number(lnglat[0]), Number(lnglat[1])],
  //           children: item.name,
  //           color: color,
  //           itemType: item.type
  //         };
  //       });
  //       this.setState({
  //         markers: markers,
  //         center: [averageLat / markers.length, averageLng / markers.length]
  //       });
  //       console.log(this.state.center, '\n', markers.length);
  //       console.log(markers);
  //     }
  //   });
  // }

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
            </button>{' '}
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

const mapStateToProps = state => ({
  items: state.itemsReducer.items,
  markers: state.itemsReducer.markers,
  center: state.itemsReducer.center
});

export default connect(
  mapStateToProps,
  { loadItems, generateMarkers }
)(OpenMap);
