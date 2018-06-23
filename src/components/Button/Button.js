import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { lightBlue, darkBackground, blue } from "../../utils/constants";

const StyledButton = styled.TouchableHighlight`
  background-color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  height: 42px;
  border-radius: 10px;
  max-height: 42px;
  margin-top: 10%;
  ${({ flex }) =>
    flex &&
    css`
      flex: ${flex};
    `};
`;

export class Button extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    margin: PropTypes.string,
    flex: PropTypes.number,
    onPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    color: "#b7b158",
    margin: "10px 0",
    flex: undefined
  };

  render() {
    return (
      <StyledButton
        color={this.props.color}
        flex={this.props.flex}
        underlayColor={this.props.color}
        margin={this.props.margin}
        onPress={this.props.onPress}
      >
        {this.props.children}
      </StyledButton>
    );
  }
}

const StyledText = styled.Text`
  align-self: center;
  color: ${darkBackground};
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
`;

export class TextButton extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

  render() {
    return (
      <Button {...this.props}>
        <StyledText>{this.props.value}</StyledText>
      </Button>
    );
  }
}
