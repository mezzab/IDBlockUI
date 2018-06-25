import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Pages, Keys } from "../../../utils/constants";
import TextButton from "../../Button";
import styled from "styled-components";
import { InputText, Container } from "../../shared";

export class MailInput extends React.Component {
  state = {
    email: "",
    entityJSON: "",
    isValid: false
  };

  validarMail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false)
      return this.setState({ email: text, isValid: false });
    return this.setState({ email: text, isValid: true });
  };

  handleContinue = () => {
    if (!this.state.isValid) return this.showErrorMessage();

    //here we'll call the API to send a mail to the user

    AsyncStorage.setItem(Keys.Mail, this.state.email);
    return this.props.navigation.navigate(Pages.MailCheck);
  };

  showErrorMessage = () => {
    //here we'll show a notification
  };

  render() {
    AsyncStorage.getItem(Keys.EntityJSON).then(entityJSON =>
      this.setState({ entityJSON })
    );

    return (
      <Container>
        <InputText
          ref="mail"
          placeholder="Ingresa tu mail"
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
      </Container>
    );
  }
}
