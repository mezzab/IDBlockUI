import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Pages, Keys, Colors, IconsType } from "../../../utils/constants";
import TextButton from "../../Button";
import styled from "styled-components";
import {InputText, Container, InputField, BackToHomeButton} from "../../shared";

const { manifest } = Expo.Constants;
export const api =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:8000`)
    : `api.nuestroherokubackend.com`;

export const getColorByIconType = type =>
  type === IconsType.warning ? Colors.caution : Colors.success;

export class PhoneInput extends React.Component {
  state = {
    phone: "",
    isValid: false,
    codePhone: ""
  };

  mobilevalidate = text => {
    const reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (reg.test(text) === false) {
      return this.setState({
        isValid: false,
        phone: text,
      });
    } else {
      return this.setState({ phone: text, isValid: true });
    }
  }

   handleContinue = async()=> {
    console.log(this.state.phone);      
       try {
      let response = await fetch(`http://${api}/sendSMS`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `phone=${this.state.phone}`
      });
      let responseJson = await response.json();
      this.setState({ codePhone: responseJson.code });
      console.log("Codigo de verificacion Phone: *** ", responseJson.code, " ***");

    } catch (error) {
      //todo: we have to show an error notification here.
      console.error(error);
    } 

    await AsyncStorage.setItem(Keys.Phone, this.state.phone);
    console.log("El telefono");
    console.log(await AsyncStorage.getItem(Keys.Phone));
    return this.props.navigation.navigate(Pages.PhoneCheck, {
      codePhone: this.state.codePhone || 123123
    });
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
          name="Ingresá tu telefono"
          value={this.state.phone}
          onChange={this.mobilevalidate}
          placeholder="11-44445555"
          type={type}
          textContentType="telephoneNumber"
          keyboardType="numeric"
        />

        <TextButton
          disable={!this.state.isValid}
          margin="10px 0  10px 0"
          value="Continuar"
          onPress={this.handleContinue}
        />

        <BackToHomeButton goToHome={() => this.props.navigation.navigate(Pages.HomeScreen)}/>

      </Container>
    );
  }
}
