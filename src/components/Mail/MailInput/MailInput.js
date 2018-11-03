import React from "react";
import { AsyncStorage } from "react-native";
import { Pages, Keys, Colors, IconsType } from "../../../utils/constants";
import TextButton from "../../Button";
import {
  Container,
  InputField,
  BackToHomeButton
} from "../../shared";
import Expo from "expo";

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

export class MailInput extends React.Component {
  state = {
    email: "",
    isValid: false,
    code: null
  };

  validarMail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false)
      return this.setState({ email: text, isValid: false });
    else return this.setState({ email: text, isValid: true });
  };

  handleContinue = async () => {
    console.log('* * * * * * * * sendEmail * * * * * * * *');
    console.log('Se enviara un codigo de verificacion al siguiente mail: ' + '\n' + this.state.email);
    try {
      let response = await fetch(`http://${api}/sendEmail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `mail=${this.state.email}`
      });
      let responseJson = await response.json();
      this.setState({ code: responseJson.code });
      console.log("Codigo de verificacion: *** ", responseJson.code, " ***");
    } catch (error) {
      //todo: we have to show an error notification here.
      console.error(error);
    }

    await AsyncStorage.setItem(Keys.Mail, this.state.email);
    return this.props.navigation.navigate(Pages.MailCheck, {
      code: this.state.code
    });
    // this is how we send data through pages
  };

  render() {
    AsyncStorage.getItem(Keys.EntityJSON).then(entityJSON =>
      this.setState({ entityJSON })
    );

    const type = !this.state.email
      ? ""
      : this.state.isValid
        ? IconsType.check
        : IconsType.warning;

    return (
      <Container>
        <InputField
          name="Ingresá tu email"
          value={this.state.email}
          onChange={this.validarMail}
          placeholder="tuemail@ejemplo.com"
          type={type}
        />

        <TextButton
          disable={!this.state.isValid}
          margin="10px 0  10px 0"
          value="Continuar"
          onPress={this.handleContinue}
        />

        <BackToHomeButton
          goToHome={() => this.props.navigation.navigate(Pages.HomeScreen)}
        />
      </Container>
    );
  }
}
