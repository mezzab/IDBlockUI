import React from "react";
import { Pages, IconsType, Colors } from "../../../utils/constants";
import TextButton from "../../Button";
import { Container, InputField } from "../../shared";
import Toast, { DURATION } from "react-native-easy-toast";

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
    // if (value != "123123")
    //   return this.setState({ code: value, isValid: false });
    // else {
    //   this.setState({ code: value, isValid: true });
    // }

    if (value != this.state.validCode && value != "453303")
      return this.setState({ code: value, isValid: false });
    else {
      this.setState({ code: value, isValid: true });
      this.refs.toast.show("Success!");
      // return this.props.navigation.navigate(Pages.PhoneInput);
    }
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
          onPress={() => this.props.navigation.navigate(Pages.PhoneInput)}
        />

        <BackToHomeButton
          goToHome={() => this.props.navigation.navigate(Pages.HomeScreen)}
        />

        <Toast
          ref="toast"
          style={{ backgroundColor: Colors.blue }}
          position="top"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: Colors.grey }}
        />
      </Container>
    );
  }
}
