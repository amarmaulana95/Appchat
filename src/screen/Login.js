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
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  
  constructor(){
    super();
    this.state = {
     name : '',
     phone: ''
    }
  }

  handlechange = key => val => {
    this.setState({[key]: val});
  }
  
  submit = () => {
    if(this.state.name.length < 3){
      alert('minimal 3 huruf');
    }else if(this.state.phone.length < 10){
      alert('minimal 11 angka');
    }else{
     AsyncStorage.setItem('userPhone',this.state.phone);
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <TextInput
            placeholder="youre name"
            style={styles.input}
            value={this.state.name}
            onChangeText={this.handlechange('name')}
          />
          <TextInput
            placeholder="number phone"
            style={styles.input}
            value={this.state.phone}
            onChangeText={this.handlechange('phone')}
          />
        <TouchableOpacity onPress={this.submit}>
          <Text>Masuk</Text>
        </TouchableOpacity>
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

// export default App;