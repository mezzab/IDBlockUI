import React from "react";
import { Container, InputText, InputField } from "../../shared";
import TextButton from "../../Button";
import { AsyncStorage } from "react-native";
import { Pages, Keys, IconsType } from "../../../utils/constants";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera, Permissions } from "expo";
import { Vibration } from "react-native";
import styled from "styled-components";

export const StyledView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopLimits = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const BottomLimits = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-top: 26%;
`;

export class DocumentScannerFront extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    picture: null,
    frontBase64: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  takePicture = async () => {
    if (this.camera) {
      Vibration.vibrate(30);
     const options = { base64: true };
      let data = await this.camera.takePictureAsync(options);
      this.setState({ picture: data.uri });
      this.setState({frontBase64: data.base64})
      await AsyncStorage.setItem(Keys.DocumentoFrontal, JSON.stringify(this.state.picture));
      await AsyncStorage.setItem(Keys.DocumentoFrontalBase64, JSON.stringify(this.state.frontBase64));
      console.log("Foto delantera tomada");
      console.log(await AsyncStorage.getItem(Keys.DocumentoFrontal));
    }
    this.props.navigation.navigate(Pages.DocumentScannerBack);
  };

  componentDidMount = () => {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  };

  componentWillUnmount = () => {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    /* Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
    We should reset to ALL, but now is crashing because of the styles in the home page.
    TODO: Make app visible in all Orientations, this means to ajust the styles to porcentajes instead of pixels.
    */
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => (this.camera = ref)}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <StyledView>
              <Text
                style={{
                  fontFamily: "msyi",
                  fontSize: 30,
                  alignSelf: "center",
                  padding: 10,
                  paddingTop: 7,
                  color: "#fff"
                }}
              >
                Cara Frontal de tu DNI
              </Text>
              <TopLimits>┌                                                                                       ┐</TopLimits>
              <BottomLimits>└                                                                                       ┘</BottomLimits>
            </StyledView>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
            </View>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                backgroundColor: "#fff",
                borderRadius: 100,
                marginBottom: 20
              }}
              onPress={() => this.takePicture()}
            />
          </Camera>
        </View>
      );
    }
  }
}
