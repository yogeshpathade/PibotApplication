/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var Triangle = React.createClass({
    setNativeProps: function(nativeProps) {
      this._root.setNativeProps(nativeProps);
  },
  render: function() {
    return (
      <View ref={component => this._root = component} style={[styles.triangle, this.props.style]}/>
    )
  }
})

var TriangleUp = React.createClass({
    setNativeProps: function(nativeProps) {
      this._root.setNativeProps(nativeProps);
  },
  render: function() {
    return (
      <Triangle ref={component => this._root = component} style={this.props.style}/>
    )
  }
})

var TriangleLeft = React.createClass({
    setNativeProps: function(nativeProps) {
      this._root.setNativeProps(nativeProps);
  },
  render: function() {
    return (
      <Triangle ref={component => this._root = component} style={[styles.triangleLeft, this.props.style]}/>
    )
  }
})

var TriangleRight = React.createClass({
    setNativeProps: function(nativeProps) {
      this._root.setNativeProps(nativeProps);
  },
  render: function() {
    return (
      <Triangle ref={component => this._root = component} style={[styles.triangleRight,this.props.style]}/>
    )
  }
})

var TriangleDown = React.createClass({
    setNativeProps: function(nativeProps) {
      this._root.setNativeProps(nativeProps);
  },
  render: function() {
    return (
      <Triangle ref={component => this._root = component} style={[styles.triangleDown, this.props.style]}/>
    )
  }
})

function loadApplication(): ReactClass<{}> {
    class PibotApplication extends Component {
      render() {
        return (
          <View style={styles.container}>
            <TouchableHighlight onPress={() => this.move("RIGHT")} style={styles.button}>
              <TriangleUp/>
            </TouchableHighlight>
            <View style={styles.middle}>
                <TouchableHighlight onPress={() => this.move("FOREWARD")} style={styles.button}>
                    <TriangleLeft/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.move("REVERSE")} style={styles.button}>
                  <TriangleRight/>
                </TouchableHighlight>
            </View>
            <TouchableHighlight onPress={() => this.move("LEFT")} style={styles.button}>
              <TriangleDown/>
            </TouchableHighlight>
          </View>
        );
      }

      move(direction) {
          fetch("http://192.168.1.4:3000/bot/cmd?move="+direction, {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
              console.log('moving ',direction,' : ', responseData);
          })
          .done();
      }
    }

    return PibotApplication;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red'
},
triangleLeft: {
  transform: [
    {rotate: '-90deg'}
  ]
},
triangleRight: {
  transform: [
    {rotate: '90deg'}
  ]
},
triangleDown: {
  transform: [
    {rotate: '180deg'}
  ]
},
  button: {
      backgroundColor: '#eeeeee',
      padding: 10,
      marginRight: 5,
      marginLeft: 5,
  }
});

module.exports = loadApplication;
