import React from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import firebase from "../firebase";

var passwordArray = [];
starArray = [];
var stars = null;

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null
    };
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.login())
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    console.log("Password: " + this.state.password);
    return (
      <View
        style={{
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          paddingTop: 70
        }}
      >
        <Text
          style={{ fontFamily: "Avenir Next", fontSize: 30, paddingBottom: 25 }}
        >
          Sign Up
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            alignItems: "center",
            borderWidth: 0.5,
            borderRadius: 10,
            width: 300,
            height: 50,
            paddingLeft: 5,
            marginBottom: 20,
            marginTop: 60
          }}
        >
          <Text style={{ fontFamily: "Avenir Next", fontSize: 15 }}>
            Email:
          </Text>
          <TextInput
            placeholder="john_doe@email.com"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            style={{ paddingLeft: 35 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            alignItems: "center",
            borderWidth: 0.5,
            borderRadius: 10,
            width: 300,
            height: 50,
            paddingLeft: 5,
            marginBottom: 30
          }}
        >
          <Text style={{ fontFamily: "Avenir Next", fontSize: 15 }}>
            Password:
          </Text>
          <TextInput
            type="password"
            placeholder="*********"
            autoCapitalize="none"
            keyboardType="default"
            secureTextEntry={true}
            password={true}
            onChangeText={password => {
              this.setState({ password });
            }}
            value={this.state.password}
            style={{ paddingLeft: 10, width: 225 }}
          />
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            backgroundColor: "#4169e1",
            borderColor: "#4169e1",
            height: 50,
            width: 200,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            if (this.state.email !== "" && this.state.password !== "") {
              console.log("here");
              this.handleSignUp();
            } else {
              null;
            }
          }}
        >
          <Text
            style={{
              fontFamily: "Avenir Next",
              fontSize: 15,
              color: "white"
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
