import React from "react";
import { Container, InputText, InputField } from "../shared";
import TextButton from "../Button";
import { AsyncStorage } from "react-native";
import { Pages, Keys, IconsType } from "../../utils/constants";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera, Permissions } from "expo";
import { Vibration } from "react-native";
import styled from "styled-components";
import { FaceDetector } from 'expo';

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

export class FacePicture extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    path: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  takePicture = () => {
    if (this.camera) {
      Vibration.vibrate(30);
      this.camera.takePictureAsync().then(data => {
        console.log("Selfie tomada");
        this.setState({ path: data });
        //AsyncStorage.setItem(Keys.DocumentoFrontal, this.state.path);
        //console.log(this.state.path);
        //console.log(AsyncStorage.getItem(Keys.DocumentoFrontal));
        //console.log(data);
        this.props.navigation.navigate(Pages.FacePicture);
      });
    }
  };

  componentDidMount = () => {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  };

  componentWillUnmount = () => {
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
                {" "}
                Take a Selfie
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
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.front
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              />
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
                          <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
          </Camera>
        </View>
      );
    }
  }
}
