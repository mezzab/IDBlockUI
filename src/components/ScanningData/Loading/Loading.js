import React, { Component } from "react";
import { Container } from "../../../components/shared";
import { Text, View } from "react-native";
import { NineCubesLoader } from 'react-native-indicator';


export class Loading extends Component {

    render() {
        return (
            <Container>
                <View style={{ margin: 50, paddingTop: 150 }}>
                    <NineCubesLoader size={70} color={'white'} betweenSpace={10}/>
                </View>

                <Text style={{ fontFamily: "msyi", marginTop: '28%', fontSize: 25, color: 'white', margin: 35, display: 'flex' }}>
                    Verificando identidad, por favor aguarde un instante.
                </Text>
            </Container>
        );
    }
}

export default Loading;
