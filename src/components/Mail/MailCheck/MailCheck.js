import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Pages, Keys } from "../../../utils/constants";
import TextButton from "../../Button";
import { Container, InputText } from "../../shared";

export class MailCheck extends React.Component {
  state = {
    celphone: ""
  };

  render() {
    return (
      <Container>
        <InputText
          ref="celphone"
          placeholder="Ingresa tu celular"
          onChangeText={this.validarMail}
          value={this.state.email}
        />
        <TextButton
          margin="10px 0  10px 0"
          value="Continue"
          onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
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
