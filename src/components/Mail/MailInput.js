import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Pages, Keys } from "../../utils/constants";
import TextButton from "../Button";

export class MailInput extends React.Component {
  state = { entityJSON: "" };

  render() {
    AsyncStorage.getItem(Keys.EntityJSON).then(entityJSON =>
      this.setState({ entityJSON })
    );

    return (
      <View>
        <Text style={{ padding: 25, height: 300 }}>
          {this.state.entityJSON}
        </Text>
        <TextButton
          margin="10px 0  10px 0"
          value="Go back to home"
          style={{ maxWidth: 100 }}
          onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
        />
      </View>
    );
  }
}
