import React, { Component } from "react";
import { Provider } from "react-redux";
import { View } from "react-native";
import Logo from "./src/components/Logo";
import QRScanner from "./src/components/QRScanner";
import store from "./store";
import styled from "styled-components";
import { StackNavigator } from "react-navigation";
import TextButton from "./src/components/Button";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

class HomeScreen extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Logo />
          <TextButton
            color="black"
            flex={0.5}
            margin="10px 10px 10px 10px"
            value="ESCANEAR CODIGO"
            onPress={() => this.props.navigation.navigate("QRScanner")}
          />
        </Container>
      </Provider>
    );
  }
}

const App = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    QRScanner: {
      screen: QRScanner
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
