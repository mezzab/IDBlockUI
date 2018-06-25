import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Pages, Keys } from "../../../utils/constants";
import TextButton from "../../Button";
import { TextInput } from "react-native-gesture-handler";

export class MailInput extends React.Component {
  state = {
    email: "",
    entityJSON: "",
    isValid: true
  };

  validarMail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false)
      return this.setState({ email: text, isValid: false });
    return this.setState({ email: text, isValid: true });
  };

  handleContinue = () => {
    //here we'll call the API
    AsyncStorage.setItem(Keys.Mail, this.state.email);
    return this.props.navigation.navigate(Pages.MailCheck);
  };

  render() {
    AsyncStorage.getItem(Keys.EntityJSON).then(entityJSON =>
      this.setState({ entityJSON })
    );

    return (
      <View>
        <TextInput
          ref="mail"
          style={{ height: 40 }}
          placeholder="tumail@mail.com"
          onChangeText={this.validarMail}
          value={this.state.email}
        />

        <TextButton
          margin="10px 0  10px 0"
          value="Continue"
          onPress={this.handleContinue}
        />

        <TextButton
          margin="10px 0  10px 0"
          value="Go back to home"
          onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
        />
      </View>
    );
  }
}
