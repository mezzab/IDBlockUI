import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Pages, Keys, IconsType } from "../../../utils/constants";
import TextButton from "../../Button";
import { Container, InputText, InputField } from "../../shared";

export class MailCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validCode: this.props.navigation.state.params.code,
      code: "",
      isValid: false
    };
  }

  onCodeChange = value => {
    if (value != '123123')
      return this.setState({ code: value, isValid: false });
    else {
      this.setState({ code: value, isValid: true });
    }
    /* if (value != this.state.validCode)
      return this.setState({ code: value, isValid: false });
    else {
      this.setState({ code: value, isValid: true });
    } */
  };

  render() {
    const type = !this.state.code
      ? ""
      : this.state.isValid
        ? IconsType.check
        : IconsType.warning;

    return (
      <Container>
        <InputField
          name="Insert the verification code:"
          value={this.state.code}
          onChange={this.onCodeChange}
          placeholder="XXXXXX"
          type={type}
          keyboardType="numeric"
        />

        <TextButton
          margin="10px 0  10px 0"
          value="Continue"
          disable={!this.state.isValid}
          onPress={() => this.props.navigation.navigate(Pages.PhoneInput)}
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
