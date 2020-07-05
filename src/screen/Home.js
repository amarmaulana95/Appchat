import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    padding:10,
    borderWidth:1,
    width:'90%',
    marginBottom:10
  },
});
