import React, { Component } from "react";
import styled from "styled-components";
import { View } from "react-native";
import headerLogoImage from "./logo.png";

const StyledHeaderLogo = styled.Image`
  display: flex;
  justify-content: center;
  background-color: #000;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin-top: 50px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 32px;
  text-align: center;
`;

const SubTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

export default class HeaderLogo extends Component {
  render() {
    return (
      <View>
        <StyledHeaderLogo source={headerLogoImage} resizeMode="contain" />
        <Title style={{ fontWeight: "bold" }}> IDentity Block </Title>
        <SubTitle> Vericador de identidad</SubTitle>
      </View>
    );
  }
}
