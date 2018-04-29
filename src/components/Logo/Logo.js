import React, { Component } from "react";
import styled from "styled-components";
import { View } from "react-native";
import headerLogoImage from "./logo.png";

const StyledHeaderLogo = styled.Image`
  display: flex;
  justify-content: flex-start;
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.Text`
  color: #000000;
  font-size: 32px;
  text-align: center;
`;

const SubTitle = styled.Text`
  color: #000000;
  font-size: 20px;
  text-align: center;
`;

export default class HeaderLogo extends Component {
  render() {
    return (
      <View>
        <StyledHeaderLogo source={headerLogoImage} resizeMode="contain" />
        <Title style={{ fontWeight: "bold" }}> ARGENTICATOR </Title>
        <SubTitle> VERIFICADOR DE IDENTIDAD </SubTitle>
      </View>
    );
  }
}
