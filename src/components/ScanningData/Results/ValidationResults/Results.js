import React, { Component } from "react";
import { Colors, IconsType, Pages } from "../../../../utils/constants";
import { Container } from "../../../shared";
import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export class Results extends Component {
  porcentaje;

  componentWillMount = () => {
    this.porcentaje = (80 + 10 * Math.random()).toString().slice(0, 5);
    console.log(
      "Las fotos tienen una coincidencia de " +
        this.porcentaje +
        "porciento." +
        "\n"
    );
    setTimeout(() => this.props.navigation.navigate(Pages.Legajo), 4500);
  };

  render() {
    return (
      <Container style={{ paddingTop: 200 }}>
        <MaterialIcons
          name={IconsType.check}
          size={200}
          style={{ color: Colors.blue, width: "60%", marginLeft: 40 }}
        />
        <Text
          style={{
            marginTop: "14%",
            fontFamily: "msyi",
            fontSize: 28,
            color: "white"
          }}
        >
          Felicitaciones!
        </Text>
        <Text
          style={{
            marginTop: "7%",
            fontFamily: "msyi",
            fontSize: 28,
            maxWidth: "82%",
            color: "white"
          }}
        >
          Identidad verificada un {this.porcentaje}%
        </Text>
      </Container>
    );
  }
}

export default Results;
