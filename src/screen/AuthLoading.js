import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../User';
import firebase from 'firebase';

export default class AuthLoading extends Component  {
    constructor(props){
        super(props);
        this.CekLogin();
    }

    componentDidMount(){
        var config = {
            apiKey: "AIzaSyBXAnx9yHHpDp4eBlvLwiT8Dxsql2UEmPk",
            authDomain: "reactchat-ffd94.firebaseapp.com",
            databaseURL: "https://reactchat-ffd94.firebaseio.com",
            projectId: "reactchat-ffd94",
            storageBucket: "reactchat-ffd94.appspot.com",
            messagingSenderId: "742388013458",
            appId: "1:742388013458:web:ae3db58692ee91732e494b",
            measurementId: "G-9X3QXQE001"
        };
        if (firebase.apps.length === 0) {
            firebase.initializeApp(config);
        }
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