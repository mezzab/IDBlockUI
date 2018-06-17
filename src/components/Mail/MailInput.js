import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Pages, Keys } from "../../utils/constants";
import TextButton from "../Button";
import { Container } from "../../../App";

const styles = StyleSheet.create({
  button: {
    flex: 1
  }
});

export class MailInput extends React.Component {
  state = { entityJSON: "" };

  render() {
    AsyncStorage.getItem(Keys.EntityJSON).then(entityJSON =>
      this.setState({ entityJSON })
    );
    return (
      <Container>
        <Text> {this.state.entityJSON}</Text>
        <Container>
          <TextButton
            color="black"
            flex={1}
            styles={styles.button}
            margin="10px 10px 10px 10px"
            value="Go back to home"
            onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
          />
        </Container>
      </Container>
    );
  }
}
