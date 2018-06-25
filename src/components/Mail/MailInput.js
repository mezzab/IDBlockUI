import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Pages, Keys } from "../../utils/constants";
import TextButton from "../Button";
import { TextInput } from "react-native-gesture-handler";

export class MailInput extends React.Component {
  state = {
    email :'',
    entityJSON: "" };

  validarMail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    console.log("Email is Not Correct");
    this.setState({email:text})
    return false;
      }
    else {
      this.setState({email:text})
      console.log("Email is Correct");
      console.log(this.state.email);
    }
    }

  render() {
    AsyncStorage.getItem(Keys.EntityJSON).then(entityJSON =>
      this.setState({ entityJSON })
    );

    return (
      <View>
        <Text style={{ padding: 25, height: 300 }}>
          {this.state.entityJSON}
        </Text>

        <TextInput
          ref = "mail"
          style={{height: 40}}
          placeholder="tumail@mail.com"
          onChangeText={(text) => this.validarMail(text)}
          value={this.state.email}
        />

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
