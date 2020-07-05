import React, { Component } from 'react';
import {  StyleSheet, SafeAreaView, FlatList, View, StatusBar, Dimensions,Text} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import User from '../User';

export default class Chat extends React.Component {
        static navigationOptions = ({ navigation }) => {
            return {
                title: navigation.getParam('name', null),
            }
          };
        

    constructor(props){
        super(props);
        this.state = {
            person:{
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
            },   
        textMessage:'',
        messageList:[]
        }
    }

    componentDidMount(){
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
        .on('child_added', (value)=>{
            this.setState((prevState)=>{
                return {
                    messageList:[...prevState.messageList, value.val()]
                }
            })
        })
    }

    handlechange = key => val => {
        this.setState({ [key]: val});
    }


    submitChat =  () =>{
        if(this.state.textMessage.length > 0){
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time:firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            console.log(msgId);
            updates['messages/'+User.phone+'/'+this.state.person.phone+'/'+msgId] = message;
            updates['messages/'+this.state.person.phone+'/'+User.phone+'/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({textMessage:''})

        }
    }

    renderRow = ({item}) => {
        return (
            <View style={{
                flexDirection:'row', width:'60%', alignSelf: item.from===User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from===User.phone ? '#eee' : '#000',
                borderRadius:5,
                marginBottom:10,
            }}>
            <Text style={{color:'#fff', padding:7, fontSize:16}}>
                {item.message}
            </Text>
            <Text style={{color:'#999', padding:3, fontSize:12}}>
                {item.time}
            </Text>
            </View>
        )
    }


    render() {
        let {height, weight} = Dimensions.get('window');
        return (
            <SafeAreaView style={styles.container}>
                <FlatList style={{padding:10, height: height * 0.8}}
                    data={this.state.messageList}
                    renderItem ={this.renderRow}
                    keyExtractor={(item,index)=>index.toString()}
                />
                <View style={{ flexDirection :'row', alignItems:'center'}}>
                    <TextInput style={styles.input}
                    value={this.state.textMessage}
                    placeholder="pesan.."
                    onChangeText={this.handlechange('textMessage')}
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