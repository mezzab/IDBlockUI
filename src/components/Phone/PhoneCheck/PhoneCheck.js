import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Pages, Keys, IconsType } from "../../../utils/constants";
import TextButton from "../../Button";
import {
  Container,
  InputText,
  InputField,
  BackToHomeButton
} from "../../shared";
import { Keyboard } from "react-native";

export class PhoneCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      isValid: false,
      validCodePhone: this.props.navigation.state.params.codePhone
    };
  }

  onCodeChange = value => {
    /*if (value !== "123123")
      return this.setState({ code: value, isValid: false });
    else {
      this.setState({ code: value, isValid: true });
    }*/
    if (value != this.state.validCodePhone)
      return this.setState({ code: value, isValid: false });
    else {
      this.setState({ code: value, isValid: true });
    }
  };

  goToScannerFront = () => {
    Keyboard.dismiss();
    return this.props.navigation.navigate(Pages.DocumentScannerFront);
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
          name="Ingresá el codigo de verificación"
          value={this.state.code}
          onChange={this.onCodeChange}
          placeholder="XXXXXX"
          type={type}
          keyboardType="numeric"
        />
        <TextButton
          margin="10px 0  10px 0"
          value="Continuar"
          disable={!this.state.isValid}
          onPress={this.goToScannerFront}
        />
        <BackToHomeButton
          goToHome={() => this.props.navigation.navigate(Pages.HomeScreen)}
        />
      </Container>
    );
  }
}
