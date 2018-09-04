import React, { Component } from "react";
import { Colors, IconsType, Pages } from "../../../../utils/constants";
import { Container } from "../../../shared";
import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export class Results extends Component {
    componentDidMount = () => {
        setTimeout(() => this.props.navigation.navigate(Pages.Legajo), 4000);
    };

    render() {
        return (
            <Container style={{ paddingTop: 200 }} >
                <MaterialIcons
                    name={IconsType.check}
                    size={200}
                    style={{ color: Colors.blue, width: "60%", marginLeft: 40 }}
                />
                <Text style={{ marginTop: '14%', fontFamily: "msyi", fontSize: 28, color: 'white' }}>
                    Felicitaciones!
                </Text>
                <Text style={{ marginTop: '7%', fontFamily: "msyi", fontSize: 28,  maxWidth: '82%', color: 'white' }}>
                    Identidad verificada un 74%
                </Text>
            </Container>
        );
    }
}

export default Results;
