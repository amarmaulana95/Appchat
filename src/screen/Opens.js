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
        <View style={styles.imageContainer}>
          <Image source={require('../assets/start.png')} style={styles.image} resizeMode="stretch" />
        </View>
        <Text style={styles.textTitle}>Wellcome back gaes</Text>
        <Text style={styles.textBody}>Nikmati kemudahan dalam mencari teman . . .</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.btn}
          underlayColor='#fff'>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Mulai</Text>
          </View>
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
    backgroundColor: '#FCF6EE'
  },
  imageContainer: {
    width: '50%',
    height: '35%',
    marginVertical: '5%',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textTitle: {
    fontSize: 30,
    fontFamily: 'HelveticaNeue-Bold'
  },
  textBody: {
    width: '75%',
    fontSize: 18,
    fontFamily: 'HelveticaNeue',
    marginVertical: '5%',
    textAlign: 'center'
  },
  button: {
    width: 320,
    height: "auto",
    padding: 15,
    backgroundColor: "#c0392b",
    alignContent: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15
  }
});
