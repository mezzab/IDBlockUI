import React, { Component } from "react";
import styled from "styled-components";
import { View } from "react-native";
import headerLogoImage from "./logo.png";
import headerLogoText from "./logo-texto.png";
import { darkBackground } from "../../utils/constants";

const StyledHeaderLogo = styled.Image`
  display: flex;
  justify-content: center;
  background-color: ${darkBackground};
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin-top: 25%;
`;

const StyledHeaderText = styled.Image`
  display: flex;
  justify-content: center;
  background-color: ${darkBackground};
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 90%;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${darkBackground};
  width: 100%;
`;

export default class HeaderLogo extends Component {
  render() {
    return (
      <Container>
        <StyledHeaderLogo source={headerLogoImage} resizeMode="contain" />
        <StyledHeaderText source={headerLogoText} resizeMode="contain" />
      </Container>
    );
  }
}

// const Title = styled.Text`
//   color: #fff;
//   font-size: 32px;
//   text-align: center;
// `;

// const SubTitle = styled.Text`
//   color: #fff;
//   font-size: 20px;
//   text-align: center;
// `;
// capaz usemos esto despues, ajustando el tipo de fuente
