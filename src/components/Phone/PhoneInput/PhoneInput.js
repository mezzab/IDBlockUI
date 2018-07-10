import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Pages, Keys, Colors, IconsType } from "../../../utils/constants";
import TextButton from "../../Button";
import styled from "styled-components";
import { InputText, Container, InputField } from "../../shared";

export const getColorByIconType = type =>
  type === IconsType.warning ? Colors.caution : Colors.success;

export class PhoneInput extends React.Component {
  state = {
    phone: "",
    isValid: false
  };

  onChange = phone => {
    //TODO: Add validation function.
    if (false) return this.setState({ phone: phone, isValid: false });
    else return this.setState({ phone: phone, isValid: true });
  };

  handleContinue = () => {
    //here we'll call the API to send a sms to the user

    AsyncStorage.setItem(Keys.Phone, this.state.phone);
    return this.props.navigation.navigate(Pages.PhoneCheck);
  };

  render() {
    AsyncStorage.getItem(Keys.EntityJSON).then(entityJSON =>
      this.setState({ entityJSON })
    );

    const type = !this.state.phone
      ? ""
      : this.state.isValid
        ? IconsType.check
        : IconsType.warning;

    return (
      <Container>
        <InputField
          name="Insert your phone:"
          value={this.state.phone}
          onChange={this.onChange}
          placeholder="11-44445555"
          type={type}
          textContentType="telephoneNumber"
          keyboardType="numeric"
        />

        <TextButton
          disable={!this.state.isValid}
          margin="10px 0  10px 0"
          value="Continue"
          onPress={this.handleContinue}
        />

        <TextButton
          margin="10px 0  10px 0"
          value="Go back to home"
          disable={false}
          onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
        />
      </Container>
    );
  }
}
