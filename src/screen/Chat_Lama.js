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
        pesan:'',
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

    timeconvert = () => {
        let a = new Date();
        let b = new Date();
        let result = (a.getHours() < 10 ? '0' : '') + a.getHours() + ':';
        result +=(a.getMinutes() < 10 ? '0' : '' ) + a.getMinutes();
        if(b.getDay() !== a.getDay()){
            result = a.getDay() +' '+ a.getMonth() + ' ' + result;
        }
        return result;
    }

    InputPesan = key => val => {
        this.setState({ [key]: val});
    }


    submitChat =  () =>{
        if(this.state.pesan.length > 0){
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.pesan,
                waktu:firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['messages/'+User.phone+'/'+this.state.person.phone+'/'+msgId] = message;
            updates['messages/'+this.state.person.phone+'/'+User.phone+'/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({pesan:''})

        }
    }

    renderRow = ({item}) => {
        return (
            <View style={{
                flexDirection:'row', width:'60%', alignSelf: item.from===User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from===User.phone ? '#c0392b' : '#2c3e50',
                borderRadius:5,
                marginBottom:10,
            }}>
            <Text style={{color:'#fff', padding:10, fontSize:16}}>
                {item.message}
            </Text>
            <Text style={{color:'#fff', padding:5, fontSize:12}}>
                {this.timeconvert(item.waktu)}
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
                    value={this.state.pesan}
                    placeholder="pesan.."
                    onChangeText={this.InputPesan('pesan')}
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