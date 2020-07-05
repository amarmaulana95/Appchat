import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../User';

export default class AuthLoading extends Component  {
    constructor(props){
        super(props);
        this.CekLogin();
    }

    CekLogin = async () => {
        User.phone = await AsyncStorage.getItem('userPhone');
        this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
    };

  render() {
    return (
      <View>
        <ActivityIndicator style={styles.loding} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container : {
      flex: 1,
    },
    loding : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});