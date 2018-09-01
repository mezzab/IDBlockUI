import React, { Component } from "react";
import { Pages } from "../../../utils/constants";
import { Container } from "../../../components/shared";
import { Text } from "react-native";

export class Loading extends Component {
    render() {
        return (
            <Container style={{ paddingTop: 80 }} >
                <Text style={{fontWeight: 'bold', marginTop: '14%', fontSize: 25, color: 'white' }}>
                    Verificando identidad...
                </Text>
            </Container>
        );
    }
}

export default Loading;
