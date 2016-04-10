import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class App extends Component {

  componentDidMount(){
    var mountains = require('../assets/mountains.json');

    var map = L.map('map').setView([mountains[0].latitude.value, mountains[0].longitude.value], 8);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    setTimeout( () => {
      map.invalidateSize();
    }, 10)

    // setTimeout(function(){map.invalidateSize();            map.setView([5,-20],3);},1000)


    let markers = mountains.map( mountain => {
      return (
        L.marker([mountain.latitude.value, mountain.longitude.value]).addTo(map).bindPopup(mountain.name)
          .on('click', (e) => {
            map.setView(e.latlng);
          })
      );
    })
    markers[0].openPopup();
  }
  render() {
    const position = [51.505, -0.09];

    return (
      <div id='map'>
        gg
      </div>
    );
  }
}

// {/*<Map center={position} zoom={13}>
//   <TileLayer
//     url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//   />
//   {/*<Marker position={position}>
//     <Popup>
//       <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
//     </Popup>
//   </Marker>*/}
// </Map>*/}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
