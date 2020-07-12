import React, { Component } from 'react';
import {  StyleSheet, SafeAreaView, FlatList, View, StatusBar, Dimensions,Text, Keyboard,Animated} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import User from '../User';
const isIOS = Platform.OS === 'ios';

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
        },
        this.keyboardHeight = new Animated.Value(0);
        this.bottomPadding = new Animated.Value(80);
    }

    componentDidMount(){
        this.keyboardShowListener = Keyboard.addListener(
            isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
            e => this.keyboardEvent(e, true),
          );
          this.keyboardHideListener = Keyboard.addListener(
            isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
            e => this.keyboardEvent(e, false),
        );
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
        .on('child_added', (value)=>{
            this.setState((prevState)=>{
                return {
                    messageList:[...prevState.messageList, value.val()]
                }
            })
        })
    }

    
  componentWillUnmount() {
    // this.state.dbRef.ref('messages').off();
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

    keyboardEvent = (event, isShow) => {
        let heightOS = isIOS ? 140 : 80; 
        let bottomOS = isIOS ? 140 : 155; 
        Animated.parallel([
          Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            useNativeDriver: true,
            toValue: isShow ? heightOS : 0,
          }),
          Animated.timing(this.bottomPadding, {
            duration: event.duration,
            toValue: isShow ? bottomOS : 75,
            useNativeDriver: true,
          }),
        ]).start();
      };

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
                {/* <FlatList style={{padding:10, height: height * 0.8}}
                    data={this.state.messageList}
                    renderItem ={this.renderRow}
                    keyExtractor={(item,index)=>index.toString()}
                /> */}
                  <FlatList
                    style={{padding:10, height: height * 0.8}}
                    onContentSizeChange={() =>
                    this.flatList.scrollToEnd({animated: true})
                    }
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                    ref={ref => (this.flatList = ref)}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={
                    <Animated.View style={{height: 40}} />
                    }
                />
                <View style={{ flexDirection :'row', alignItems:'center'}}>
                    <TextInput
                        placeholder="Type message ..."
                        value={this.state.textMessage}
                        style={[
                        styles.input,
                        styles.boxStyleRight,
                        styles.sm,
                        styles.percent,
                        ]}
                        onChangeText={this.InputPesan('pesan')}
                    />
                    <View style={{width:'20%'}}>
                        <TouchableOpacity
                            onPress={this.submitChat}
                            style={[
                                styles.purple,
                                styles.md,
                                styles.boxStyleLeft,
                                styles.btnSend,
                            ]}>
                            <View>
                                <Text style={{color:'#000', textAlign: 'center'}}>
                                    Send
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  boxStyleRight: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 15,
  },
  bg:{
    backgroundColor: '#5a52a5'
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  percent:{
    width: '75%',
  },
  boxStyleLeft: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 5,
  },
  boxStyleMid: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex: 100,
  },
});