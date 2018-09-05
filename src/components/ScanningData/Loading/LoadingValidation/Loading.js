import React, { Component } from "react";
import { Container } from "../../../shared";
import { Text, View } from "react-native";
import { Pages } from "../../../../utils/constants";
import { NineCubesLoader } from "react-native-indicator";

export class LoadingValidation extends Component {
  componentDidMount = () => {
    setTimeout(() => this.props.navigation.navigate(Pages.Results), 4000);
  };

  render() {
    return (
      <Container>
        <View style={{ margin: 50, paddingTop: 100 }}>
          <NineCubesLoader size={70} color={"white"} betweenSpace={10} />
        </View>

        <Text
          style={{
            fontFamily: "msyi",
            marginTop: "25%",
            fontSize: 28,
            color: "white",
            margin: 35,
            display: "flex"
          }}
        >
          Verificando identidad, por favor aguarde un instante.
        </Text>
      </Container>
    );
  }
}

export default LoadingValidation;
