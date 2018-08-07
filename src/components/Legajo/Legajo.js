import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Pages, Keys, Colors, IconsType } from "../../utils/constants";
import TextButton from "../Button";
import styled from "styled-components";
import { InputText, Container, InputField,InformativeField } from "../shared";
import Expo from "expo";


export class Legajo extends React.Component {
  state = {
    email: '',
    phone: '',
    isValid: false,
    code: null
  };

  getMail = async () => {
      this.setState({email: await AsyncStorage.getItem(Keys.Mail) });
    }

   getPhone = async () => {
      this.setState({phone: await AsyncStorage.getItem(Keys.Phone) });
    }


  render() {
    this.getMail();
    this.getPhone();
    return (
      <Container>
        <InformativeField
          name="Mail:"
          value={this.state.email}
        />

        <InformativeField
          name="Phone:"
          value={this.state.phone}
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
