import React, { Component } from "react";
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";
import { BarCodeScanner, Permissions } from "expo";
import { StackNavigator } from "react-navigation";
import { Pages, Keys } from "../../utils/constants";
import { AsyncStorage } from "react-native";
import { headerLogoImage } from "../Logo/logo.png";

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
    lastScannedData: null
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  componentWillUpdate(nextProps, nextState) {
    const scannedData = nextState.lastScannedData;
    if (scannedData && this.checkValidJson(scannedData)) {
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
      this.setState({ lastScannedData: result.data });
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
        { text: "No", onPress: () => {} }
      ],
      { cancellable: false }
    );
  };

  handlePressCancel = () => {
    this.setState({ lastScannedData: null });
  };

  checkValidJson = scannedData => {
    //Todo: Check if the scannedData is a valid json
    return true;
  };

  maybeRenderData = () => {
    const scannedData = this.state.lastScannedData;
    if (!scannedData) {
      return;
    }

    // return (
    //   <View style={styles.bottomBar}>
    //     <Text numberOfLines={1} style={styles.DataText}>
    //       Invalid QR
    //     </Text>
    //     <TouchableOpacity
    //       style={styles.cancelButton}
    //       onPress={this.handlePressCancel}
    //     >
    //       <Text style={styles.cancelButtonText}>Cancel</Text>
    //     </TouchableOpacity>
    //   </View>
    // );
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
                padding: 10,
                paddingTop: 7,
                color: '#fff',
                marginTop: '15%'
              }}
            > Scan QR Code</Text>
            <TopLimits>┌                                                      ┐</TopLimits>
            <BottomLimits>└                                                      ┘</BottomLimits>
          </StyledView>
        )}

        {this.maybeRenderData()}
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
        > Cancel </Text>
        <StatusBar hidden />
      </Container>
    );
  }
}
