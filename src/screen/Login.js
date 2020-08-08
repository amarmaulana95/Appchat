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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../User';
import firebase from 'firebase';

export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor() {
    super();
    this.state = {
      name: '',
      phone: ''
    }
  }

  handlechange = key => val => {
    this.setState({ [key]: val });
  }

  submit = async () => {
    if (this.state.name.length < 3) {
      alert('minimal 3 huruf');
    } else if (this.state.phone.length < 4) {
      alert('minimal 11 angka');
    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({ name: this.state.name });
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={{ marginTop: 60, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("../assets/mubo2.png")} />
            <Text style={[styles.text, { marginTop: 10, fontSize: 22, fontWeight: "500", color: "#c0392b" }]}>Mu.Bo</Text>
          </View>
          <View style={{ marginTop: 48, flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity>
              <View style={styles.socialButton}>
                <Image source={require("../assets/facebook.png")} style={styles.socialLogo} />
                <Text style={styles.text}>Facebook</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image source={require("../assets/google.png")} style={styles.socialLogo} />
              <Text style={styles.text}>Google</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, { color: "#ABB4BD", fontSize: 15, textAlign: "center", marginVertical: 20 }]}>or</Text>

          <View style={this.props.style}>
            <Text style={styles.inputTitle}>{this.props.title}</Text>
            <TextInput
              placeholder="Nama Kamu"
              style={styles.inputTitle}
              value={this.state.name}
              onChangeText={this.handlechange('name')}
            />
            <TextInput
              placeholder="Telepon"
              style={styles.inputTitle}
              value={this.state.phone}
              onChangeText={this.handlechange('phone')}
            />

            <View style={{ borderBottomColor: "#D8D8D8", borderBottomWidth: 1 }} />
          </View>

          <Text style={[styles.text, styles.link, { textAlign: "right" }]}>Forgot Password?</Text>

          <TouchableOpacity onPress={this.submit} style={styles.submitContainer}>
            <Text
              style={[
                styles.text,
                {
                  color: "#FFF",
                  fontWeight: "600",
                  fontSize: 16
                }
              ]}
            >
              Login
              </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.text,
              {
                fontSize: 14,
                color: "#ABB4BD",
                textAlign: "center",
                marginTop: 24
              }
            ]}
          >
            Don't have an account? <Text style={[styles.text, styles.link]}>Register Now</Text>
          </Text>
        </View>
      </ScrollView>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30
  },
  text: {
    fontFamily: "Avenir Next",
    color: "#1D2029"
  },
  socialButton: {
    flexDirection: "row",
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(171, 180, 189, 0.65)",
    borderRadius: 4,
    backgroundColor: "#fff",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5
  },
  socialLogo: {
    width: 16,
    height: 16,
    marginRight: 8
  },
  link: {
    color: "#c0392b",
    fontSize: 14,
    fontWeight: "500"
  },
  submitContainer: {
    backgroundColor: "#c0392b",
    fontSize: 16,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    shadowColor: "rgba(255, 22, 84, 0.24)",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5
  },
  inputTitle: {
    color: "#ABB4BD",
    fontSize: 14
  },
  input: {
    paddingVertical: 12,
    color: "#1D2029",
    fontSize: 14,
    fontFamily: "Avenir Next"
  }
});

// export default App;