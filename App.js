import React, { Component } from "react";
import { Provider } from "react-redux";
import Logo from "./src/components/Logo";
import QRScanner from "./src/components/QRScanner";
import store from "./store";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

export default class App extends Component {
  state = { loading: true };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1414);
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.loading ? (
          <Container>
            <Logo />
          </Container>
        ) : (
          <QRScanner />
        )}
      </Provider>
    );
  }
}
