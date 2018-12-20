import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

var code;

export default class ConfirmationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  codeGenerator = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    code = text;
  };

  render() {
    {
      this.codeGenerator();
    }
    return (
      <View
        style={{
          paddingTop: 20,
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{ fontFamily: "Avenir Next", fontSize: 25, marginTop: "50%" }}
        >
          Your Confirmation Code is:
        </Text>
        <Text
          style={{ fontFamily: "Avenir Next", fontSize: 25, marginTop: 25 }}
        >
          {code}
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderRadius: 7.5,
            borderColor: "#4169e1",
            backgroundColor: "#4169e1",
            width: 110,
            height: 40,
            marginTop: 25,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => this.props.goBack()}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
