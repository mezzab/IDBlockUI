import React from "react";
import { Container, InputText, InputField } from "../shared";
import TextButton from "../Button";
import { Pages, Keys, IconsType } from "../../utils/constants";
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Vibration } from 'react-native';
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
  text-align: center;
  align-self: center;
  margin-top: 5%;
  margin-left: -12%;
`;

const BottomLimits = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20%;
  margin-left: -12%;
`;



export class DocumentScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    if (this.camera) {
      Vibration.vibrate(30);
      this.camera.takePictureAsync()
        .then(data => console.log('TSD3')) //TODO guardar foto
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => this.camera = ref} style={{ flex: 1 }} type={this.state.type}
          >
            <StyledView>
              <Text
                style={{
                  fontFamily: "msyi",
                  fontSize: 30,
                  alignSelf: "center",
                  padding: 10,
                  paddingTop: 7,
                  color: '#fff',
                }}
              > Picture your frontal DNI</Text>
              <TopLimits>┌                                                                                     ┐</TopLimits>
              <BottomLimits>└                                                                                     ┘</BottomLimits>
            </StyledView>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
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


              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
                backgroundColor: '#fff',
                borderRadius: 100,
              }}
              onPress={() => this.takePicture()}
            >

            </TouchableOpacity>



          </Camera>
        </View>
      );
    }
  }
}

