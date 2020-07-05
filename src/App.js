import React, { Component } from 'react';
import {  StyleSheet,  View, StatusBar } from 'react-native';
import AppContainer from './Routing';

StatusBar.setBackgroundColor("#ee5253");

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },

});