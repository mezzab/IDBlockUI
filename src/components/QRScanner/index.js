import React, { Component } from "react";
import {
    Alert,
    Linking,
    Dimensions,
    LayoutAnimation,
    Text,
    StatusBar,
    TouchableOpacity
} from "react-native";
import styled from "styled-components";
import { BarCodeScanner, Permissions } from "expo";
import { Pages, Keys, EntityQRKeys, Colors } from "../../utils/constants";
import { AsyncStorage } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const opacity = "rgba(0, 0, 0, .6)";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const StyledView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: red;
`;

const StyledText = styled.Text`
  color: #fff;
  margin-top: 20%;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

const TopLimits = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 22%;
  margin-bottom: 30%;
`;

const BottomLimits = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 30%;
`;

export default class QRScanner extends Component {
    state = {
        hasCameraPermission: null,
        lastScannedData: null,
        isInvalid: true,
    };

    componentDidMount() {
        this.requestCameraPermission();
    }

    componentWillUpdate(nextProps, nextState) {
        const scannedData = nextState.lastScannedData;
        if (nextState.isInvalid && scannedData) this.refs.toast.show("El codigo escaneado es invalido. Vuelve a intentarlo!");
        if (!nextState.isInvalid) {
            AsyncStorage.setItem(Keys.EntityJSON, scannedData);
            return this.props.navigation.navigate(Pages.MailInput);
        }
    }

    requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === "granted"
        });
    };

    handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedData) {
            LayoutAnimation.spring();
            const isInvalid = !this.isValidData(result.data);
            console.log('La informacion que contenia el QR es la siguiente: ')
            console.log(result.data)
            console.log('Por lo tanto, el QR es ', isInvalid ? 'Invalido' : 'Valido')
            this.setState({ lastScannedData: result.data, isInvalid });
        }
    };

    handlePressData = () => {
        Alert.alert(
            "Open this Data?",
            this.state.lastScannedData,
            [
                {
                    text: "Yes",
                    onPress: () => Linking.openData(this.state.lastScannedData)
                },
                { text: "No", onPress: () => { } }
            ],
            { cancellable: false }
        );
    };

    isValidData = scannedData => {
        try {
            scannedObject = JSON.parse(scannedData);
        } catch (e) {
            this.setState({ isInvalid: true })
            return false;
        }
        return scannedObject && Object.keys(scannedObject).sort().toString() == EntityQRKeys.sort().toString();
    };

    render() {
        return (
            <Container>
                {this.state.hasCameraPermission === null ? (
                    <Text>Requesting for camera permission</Text>
                ) : this.state.hasCameraPermission === false ? (
                    <Text style={{ color: "#fff" }}>
                        Camera permission is not granted
          </Text>
                ) : (
                            <StyledView>
                                <BarCodeScanner
                                    onBarCodeRead={this.handleBarCodeRead}
                                    style={{
                                        position: "absolute",
                                        height: windowHeight,
                                        width: windowWidth
                                    }}
                                />
                                <Text
                                    style={{
                                        fontFamily: "msyi",
                                        fontSize: 30,
                                        alignSelf: "center",
                                        paddingTop: 7,
                                        color: '#fff',
                                        marginTop: '15%'
                                    }}
                                > Escanea el codigo QR </Text>
                                <Text
                                    style={{
                                        fontFamily: "msyi",
                                        fontSize: 30,
                                        alignSelf: "center",
                                        paddingTop: 7,
                                        color: '#fff',
                                    }}
                                > de la web de la entidad </Text>
                                <TopLimits>┌                                                      ┐</TopLimits>
                                <BottomLimits>└                                                      ┘</BottomLimits>
                            </StyledView>
                        )}
                <Toast
                    ref="toast"
                    style={{ backgroundColor: 'red' }}
                    position="top"
                    positionValue={10}
                    fadeInDuration={800}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: Colors.grey }}
                />
                <Text
                    style={{
                        fontFamily: "msyi",
                        fontSize: 30,
                        alignSelf: "center",
                        padding: 10,
                        paddingTop: 7,
                        color: '#fff',
                        marginTop: '20%'
                    }}
                    onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
                > Cancelar </Text>
                <StatusBar hidden />
            </Container>
        );
    }
}
