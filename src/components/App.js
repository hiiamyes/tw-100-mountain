import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/fuelSavingsActions';

import L from 'leaflet';

class App extends Component {

  componentDidMount(){
    this.mountains = require('../assets/mountains.json');

    this.map = L.map('map').setView([this.mountains[0].latitude.value, this.mountains[0].longitude.value], 8);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    setTimeout( () => {
      this.map.invalidateSize();
    }, 10)

    var largeicon = L.icon({
        iconUrl: '../images/marker.png',
        iconSize: [25, 41]
    });

    this.markerGroup = L.layerGroup().addTo(this.map);

    this.markers = this.mountains.map( mountain => {
      let marker = L.marker(
                    [mountain.latitude.value, mountain.longitude.value],
                    {
                      icon: largeicon,
                      title: mountain.name
                    }
                  )
      this.markerGroup.addLayer(marker);
      return marker;
    })
  }

  onShowAllClick(){
    this.markers.forEach( marker => {
      this.markerGroup.addLayer(marker);
    })
    this.map.setView([this.mountains[0].latitude.value, this.mountains[0].longitude.value], 8);
  }

  onMountainClick(mountainId){
    this.markerGroup.eachLayer( layer => {
      this.map.removeLayer(layer);
    });
    this.map.setView([this.mountains[mountainId-1].latitude.value, this.mountains[mountainId-1].longitude.value], 8);
    this.markerGroup.addLayer(this.markers[mountainId-1]);
  }

  onRouteClick(index){
    this.markerGroup.eachLayer( layer => {
      this.map.removeLayer(layer);
    });
    switch (index) {
    case 0:
      [8, 13, 32, 22, 83, 10, 29, 73].forEach( i => {
        this.markerGroup.addLayer(this.markers[i-1]);
      })
      this.map.setView([this.mountains[8-1].latitude.value, this.mountains[8-1].longitude.value], 10);
      break;
    case 1:
      [31, 61, 80, 81].forEach( i => {
        this.markerGroup.addLayer(this.markers[i-1]);
      })
      this.map.setView([this.mountains[31-1].latitude.value, this.mountains[31-1].longitude.value], 10);
      break;
    case 2:
      [19, 42, 58, 74, 92].forEach( i => {
        this.markerGroup.addLayer(this.markers[i-1]);
      })
      this.map.setView([this.mountains[19-1].latitude.value, this.mountains[19-1].longitude.value], 10);
      break;
    case 3:
      [15, 30, 47, 71, 60, 67].forEach( i => {
        this.markerGroup.addLayer(this.markers[i-1]);
      })
      this.map.setView([this.mountains[15-1].latitude.value, this.mountains[15-1].longitude.value], 10);
      break;
    default:

    }
  }

  render() {

    var mountains = require('../assets/mountains.json');

    return (
      <div id='root'>
        <div id='header'>
          <div>
            台灣百岳資料庫
          </div>
        </div>
        <div id='content'>
          <div id='map'></div>
          <div id='control-panel'>
            <div id='mountain-container'>
              <div className='title'>百岳列表</div>
              <div
                className='mountain'
                onClick={this.onShowAllClick.bind(this)}>顯示全部</div>
              {mountains.map( (mountain) => {
                return(
                  <div
                    className='mountain'
                    onClick={this.onMountainClick.bind(this, mountain.index)}>
                    {`${mountain.index}. ${mountain.name}`}
                  </div>
                )
              })}
            </div>
            <div id='router-container'>
              <div className='title'>常見路線</div>
              <div
                className='route'
                onClick={this.onRouteClick.bind(this, 0)}>北一段</div>
              <div
                className='route'
                onClick={this.onRouteClick.bind(this, 1)}>北二段</div>
              <div
                className='route'
                onClick={this.onRouteClick.bind(this, 2)}>南二段</div>
              <div
                className='route'
                onClick={this.onRouteClick.bind(this, 3)}>南三段</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
