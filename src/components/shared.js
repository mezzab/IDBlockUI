import React from "react";
import PropTypes from "prop-types";
import { Text, View, TextInput } from "react-native";
import styled from "styled-components";
import { Colors, IconsType } from "../utils/constants";
import { FontAwesome } from "@expo/vector-icons";

///////////////////////////////// Shared Styled ReactNative Component ////////////////////////////////////////////

export const InputText = styled.TextInput`
  height: 42px;
  color: white;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.darkBackground};
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
`;

export const InputBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 42px;
  border: 1px solid white;
  border-radius: 10px;
`;

export const TextBox = styled.View`
  width: 80%;
`;

///////////////////////////////// Shared Custom Components ////////////////////////////////////////////

export class InputField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    name: "",
    placeholder: "",
    type: ""
  };

  render() {
    return (
      <InputContainer>
        <TextBox>
          <Text
            style={{
              fontFamily: "msyi",
              fontSize: 22,
              padding: 10,
              paddingTop: "20%",
              color: "white",
              fontStyle: "italic"
            }}
          >
            {this.props.name}
          </Text>
        </TextBox>
        <InputBox>
          <InputText
            underlineColorAndroid="transparent"
            autoCorrect={false}
            ref="mail"
            style={{
              width: "85%",
              marginLeft: "5%" /*,*/
              /*color: getColorByIconType(type)*/
            }}
            placeholder="yourName@xxx.com"
            onChangeText={this.props.onChange}
            value={this.props.value}
          />
          <InputIcon type={this.props.type} />
        </InputBox>
      </InputContainer>
    );
  }
}

export class InputIcon extends React.Component {
  render() {
    switch (this.props.type) {
      case IconsType.warning:
        return (
          <FontAwesome
            name={IconsType.warning}
            size={20}
            style={{ color: Colors.caution, width: "15%" }}
          />
        );
      case IconsType.check:
        return (
          <FontAwesome
            name={IconsType.check}
            size={20}
            style={{ color: Colors.success, width: "15%" }}
          />
        );
      default:
        return <View style={{ width: "15%" }} />;
    }
  }
}
