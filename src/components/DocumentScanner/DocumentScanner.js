import React from "react";
import { Container, InputText, InputField } from "../shared";
import TextButton from "../Button";
import { Pages, Keys, IconsType } from "../../utils/constants";

import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';



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
    console.log('TSD1')
    if (this.camera) {
      console.log('TSD2')
        this.camera.takePictureAsync()
            .then(data => console.log('TSD3'))
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
            <Camera ref={ref => this.camera = ref} style={{ flex: 1 }} type={this.state.type}>
            
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
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                  
                </TouchableOpacity>  
              </View>

                  <TextButton
                    margin="10px 0  10px 0"
                    value="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                    onPress={() => this.takePicture()}
                    />
              
            </Camera>
          </View>
        );
    }
  }
}
  

