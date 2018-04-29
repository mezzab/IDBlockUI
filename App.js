import React, { Component } from "react";
import { Provider } from "react-redux";
import Logo from "./src/components/Logo";
import store from "./store";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Logo />
        </Container>
      </Provider>
    );
  }
}
