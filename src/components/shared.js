import React from "react";
import PropTypes from "prop-types";
import { Text, View, TextInput } from "react-native";
import styled from "styled-components";
import {Colors, IconsType, Pages} from "../utils/constants";
import { FontAwesome } from "@expo/vector-icons";
import TextButton from "./Button";

///////////////////////////////// Shared Styled ReactNative Component ////////////////////////////////////////////

export const InputText = styled.TextInput`
  text-align: center;
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
  margin-top: 10%;
`;

export const InputBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 82%;
  height: 42px;
  border: 1px solid white;
  border-radius: 10px;
`;

export const TextBox = styled.View`
  width: 82%;
`;

///////////////////////////////// Shared Custom Components ////////////////////////////////////////////

export class InputField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    keyboardType: PropTypes.string,
    textContentType: PropTypes.string
  };

  static defaultProps = {
    name: "",
    placeholder: "",
    type: "",
    keyboardType: "default",
    textContentType: "none"
  };

  render() {
    return (
      <InputContainer>
        <TextBox>
          <Text
            style={{
              fontFamily: "msyi",
              fontSize: 26,
              padding: 5,
              paddingTop: "25%",
              color: "white",
              width: "100%",
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
              fontFamily: "msyi",
              fontSize: 18,
              width: "85%",
              marginLeft: "5%" /*,*/
              /*color: getColorByIconType(type)*/
            }}
            autoFocus
            placeholder={this.props.placeholder}
            placeholderTextColor={Colors.placeholder}
            onChangeText={this.props.onChange}
            value={this.props.value}
            keyboardType={this.props.keyboardType}
            textContentType={this.props.textContentType}
          />
          <InputIcon type={this.props.type} />
        </InputBox>
      </InputContainer>
    );
  }
}

export const BackToHomeButton = ({ goToHome }) => {
    return  (
        <TextButton
            margin="10px 0  10px 0"
            value="Volver al Inicio"
            onPress={goToHome}
        />
    )
};


export class InformativeField extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    keyboardType: PropTypes.string,
    textContentType: PropTypes.string
  };

  static defaultProps = {
    name: "",
    placeholder: "",
    type: "",
    keyboardType: "default",
    textContentType: "none"
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
              color: "white",
              paddingTop: "20%",
              fontStyle: "italic"
            }}
          >
            {this.props.name}
          </Text>
          </TextBox>
        <InputBox>      
        <Text
            style={{
              fontFamily: "msyi",
              fontSize: 22,
              padding: 10,
              paddingTop: "5%",
              color: "white",
              fontStyle: "italic"
            }}
          >
           {this.props.value}
          </Text>
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


export class FinalField extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
    };

    static defaultProps = {
        name: "Nombre",
        value: "Marcos",
    };

    render() {
        return (
            <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems:'center', height: 30, width: '100%', marginLeft: "7%", marginTop: '0%' }}>
                <Text style={{  fontFamily: "msyi", fontSize: 25, color: '#fff' }}>
                    {this.props.name}
                </Text>
                <Text style={{ fontSize: 22, fontFamily: "msyi", color: '#ccc', marginLeft: 5, height: 20 }}>
                    {this.props.value}
                </Text>
            </View>
    );
    }
}