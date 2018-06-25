import { Text, View, TextInput } from "react-native";
import styled from "styled-components";
import { darkBackground } from "../utils/constants";

export const InputText = styled.TextInput`
  margin-top: 20%;
  height: 40;
  width: 75%;
  color: white;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${darkBackground};
`;
