import React, { Component } from 'react';
import {  StyleSheet, SafeAreaView,  View, StatusBar, Text} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import User from '../User';

export default class Chat extends Component {
    // static navigationOptions = ({navigation}) => {
    //     return {
    //         title: navigation.getParam('name', null);
    //     }
    // }

    constructor(props){
        super(props);
        this.state = {
            person:{
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
            },   
        pesan:''
        }
    }

    handlechange = key => val => {
        this.setState({ [key]: val});
    }

    submitChat =  () =>{
        if(this.state.pesan.length > 0){
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.pesan,
                time:firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['message/'+User.phone+'/'+this.state.person.phone+'/'+msgId] = message;
            updates['message/'+this.state.person.phone+'/'+User.phone+'/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({pesan:''})

        }
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection :'row', alignItems:'center'}}>
                    <TextInput style={styles.input}
                    value={this.state.pesan}
                    placeholder="pesan.."
                    onChangeText={this.handlechange('pesan')}
                    />
                    <TouchableOpacity onPress={this.submitChat}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 10
  },
  input: {
    padding:10,
    borderWidth:1,
    width:'90%',
    marginBottom:10
  },

});