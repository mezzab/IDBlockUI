import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Pages, Keys } from "../../../utils/constants";
import TextButton from "../../Button";
import { TextInput } from "react-native-gesture-handler";

export class MailCheck extends React.Component {
  state = {
    checkNumber: ""
  };

  render() {
    return (
      <View>
        <Text> Bla bla bla </Text>
        <TextButton
          margin="10px 0  10px 0"
          value="Go back to home"
          onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
        />
      </View>
    );
  }
}
