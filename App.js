import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Movies from "./src/Movies";
import ConfirmationPage from "./src/ConfirmationPage";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { apiMiddleware, reducer } from "./src/redux";
import LoginScreen from "./src/LoginScreen";
import SignupScreen from "./src/SignupScreen";
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

// Fetch movie data
store.dispatch({ type: "GET_MOVIE_DATA" });

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSignUp = () => {
    this.props.navigation.navigate("SignUp");
  };
  handleHome = () => {
    this.props.navigation.navigate("Home");
  };
  render() {
    return (
      <LoginScreen
        handleSignUp={this.handleSignUp}
        handleHome={this.handleHome}
      />
    );
  }
}

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  login = () => {
    this.props.navigation.navigate("Home");
  };
  render() {
    return <SignupScreen login={this.login} />;
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //popupIsOpen: false,
    };
  }

  switchPages = () => {
    this.props.navigation.navigate("Confirm");
  };
  render() {
    //console.log(what);
    return <Movies switchPages={this.switchPages} />;
  }
}

class ConfirmPage extends React.Component {
  constructor(props) {
    super(props);
  }
  goBack = () => {
    this.props.navigation.navigate("Home");
  };
  render() {
    return <ConfirmationPage goBack={this.goBack} />;
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Confirm: ConfirmPage,
    Login: LoginPage,
    SignUp: SignupPage
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
