import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button
} from 'react-native';
import User from '../User';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import {Database} from '../Config';
YellowBox.ignoreWarnings(['Setting a timer']);
export default class Home extends Component {
    constructor(){
        super();
        this.state = {
        user: []
        }
    }

    componentDidMount(){
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val)=>{
            let data = val.val();
            data.phone = val.key;
            this.setState((prevState)=>{
                return {
                    users: [...prevState.user, data]
                }
            })
        })
    }


    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    renderRow = ({item}) =>{
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)}
            style={{padding:10, borderBottomColor:'#000', borderBottomWidth:1}}>
                <Text style={{fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={this.state.users}
                renderItem={this.renderRow}
                keyExtractor={(item)=> item.phone}
            />
            <TouchableOpacity onPress={this._signOutAsync}>
               <Text>logout</Text> 
            </TouchableOpacity>
      </SafeAreaView> 
        
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
