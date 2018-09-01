import React, { Component } from "react";
import { Pages } from "../../../utils/constants";
import { Container } from "../../../components/shared";
import { Text } from "react-native";

export class Results extends Component {
    render() {
        return (
            <Container style={{ paddingTop: 80 }} >
                <Text style={{fontWeight: 'bold', marginTop: '14%', fontSize: 25, color: 'white' }}>
                    Identidad verificada en un 74%!
                </Text>
            </Container>
        );
    }
}

export default Results;
