import React, { Component } from "react";
import { Provider } from "react-redux";
import { Font } from "expo";
import { View } from "react-native";
import Logo from "./src/components/Logo";
import QRScanner from "./src/components/QRScanner";
import store from "./store";
import styled from "styled-components";
import { StackNavigator } from "react-navigation";
import TextButton from "./src/components/Button";
import MailInput from "./src/components/Mail/MailInput";
import MailCheck from "./src/components/Mail/MailCheck";
import PhoneInput from "./src/components/Phone/PhoneInput";
import PhoneCheck from "./src/components/Phone/PhoneCheck";
import DocumentScanner from "./src/components/DocumentScanner";
import { Pages } from "./src/utils/constants";
import { Container } from "./src/components/shared";

class HomeScreen extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      msyi: require("./msyi.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Provider store={store}>
        <Container>
          <Logo />
          {this.state.fontLoaded ? (
            <TextButton
              flex={0.5}
              margin="10px 10px 0px 10px"
              value="ESCANEAR CODIGO"
              // onPress={() => this.props.navigation.navigate(Pages.QRScanner)}
              onPress={() => this.props.navigation.navigate(Pages.MailInput)} //this is how we can avoid do all the cicle in development
            />
          ) : null}
        </Container>
      </Provider>
    );
  }
}

const App = StackNavigator(
  {
    [Pages.HomeScreen]: {
      screen: HomeScreen
    },
    [Pages.QRScanner]: {
      screen: QRScanner
    },
    [Pages.MailInput]: {
      screen: MailInput
    },
    [Pages.MailCheck]: {
      screen: MailCheck
    },
    [Pages.PhoneInput]: {
      screen: PhoneInput
    },
    [Pages.PhoneCheck]: {
      screen: PhoneCheck
    },
    [Pages.DocumentScanner]: {
      screen: DocumentScanner
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default App;
