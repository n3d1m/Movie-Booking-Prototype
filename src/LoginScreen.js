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

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null
    };
  }

  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.handleHome())
      .catch(error => console.log("error"));
  };

  render() {
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
          style={{
            fontFamily: "Avenir Next",
            fontSize: 40,
            paddingBottom: 100
          }}
        >
          MOVIES.JS
        </Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          password={true}
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            height: 30,
            width: 200,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
            backgroundColor: "#4169e1",
            borderColor: "#4169e1"
          }}
          onPress={() => {
            if (this.state.email !== "" && this.state.password !== "") {
              console.log("here");
              this.handleLogin();
            }
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Avenir Next",
            fontSize: 15,
            paddingTop: 175,
            paddingBottom: 10
          }}
        >
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => this.props.handleSignUp()}>
          <Text
            style={{
              fontFamily: "Avenir Next",
              fontSize: 15,
              textDecorationLine: "underline"
            }}
          >
            Sign Up Here
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 15
    //width: 200
  }
});
