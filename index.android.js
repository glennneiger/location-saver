/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ListView
} from 'react-native';
import LocationList from './components/LocationList';


export default class reactNativeProject extends Component {

  state = {
    buttonDisable: true,
    buttonTitle: 'Loading you location....',
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    locationsArray: {
      locations: [
        'row 3',
        'row 2'
      ]
    }
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 100000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
      this.setState({
        buttonDisable: false,
        buttonTitle: 'Add my location'
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _getLocation = () => {
    // Alert.alert(
    //   'Alert Title',
    //   this.state.lastPosition,
    //   [
    //     {text: 'OK'},
    //   ]
    // )
    console.log(this.state.locationsArray.locations);
    var locations = this.state.locationsArray.locations;
    locations.push(this.state.lastPosition);
    this.setState({
      locations: locations
    });
    console.log(this.state.locationsArray.locations, this.state.lastPosition);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <View>
          <Button title={this.state.buttonTitle} style={styles.button} onPress={this._getLocation} ref="button" disabled={this.state.buttonDisable} />
        </View>
        <View>
          <LocationList dataSource={this.state.locationsArray.locations} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    width: 100
  }
});

AppRegistry.registerComponent('reactNativeProject', () => reactNativeProject);
