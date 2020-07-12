import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button,
} from 'react-native';
import User from '../User';

export default class Start extends Component {
  static navigationOptions = {
    headerShown: false,
}

render() {
    return (
      <View style={styles.container}>
          <View style={styles.loremIpsumColumn}>
            <Text style={styles.textsatu}>SELAMAT DATANG DI MUBO CHAT..</Text>
            <Text style={styles.textdua}>Jelajahi selagi bisa</Text>
            <TouchableOpacity 
                onPress={()=> this.props.navigation.navigate('Login')}
                style={styles.btn}
                underlayColor='#fff'>
                <Text style={styles.loginText}>Mulai</Text>
            </TouchableOpacity>
             
          </View>

          
          <View style={styles.imageStack}>
            <Image
            source={require("../assets/bo.png")}
            resizeMode="contain"
            style={styles.image}/>
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  textsatu: {
    color: "rgba(22,160,133,1)",
    fontSize: 20,
    top:90,
    textAlign:'left',
    fontWeight: 'bold',
    borderRadius: 30, 
  },
  textdua: {
    color: "rgba(22,160,133,1)",
    fontSize: 14,
    top:90,
    textAlign:'left',
    fontWeight: 'bold',
    borderRadius: 30, 
  },
  btn:{
  marginRight:150,
  marginLeft:0,
  marginTop:150,
  paddingTop:15,
  paddingBottom:15,
  backgroundColor:'#16A085',
  borderRadius:20,
  borderWidth: 1,
  shadowColor: "rgba(105,105,105,1)",
  elevation: 20,
  shadowOpacity: 20,
  shadowRadius: 20,
  borderColor: '#fff',
  position:'relative'
  },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },
  loremIpsumColumn: {
    marginTop: 100,
    marginLeft: 30,
    marginRight: 19
  },
  image: {
    marginTop:50,
    width: "100%",
    position:"absolute"
  },
});
