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
import { BarCodeScanner, Permissions } from "expo";
import { StackNavigator } from "react-navigation";
import { Pages, Keys } from "../../utils/constants";
import { AsyncStorage } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const opacity = "rgba(0, 0, 0, .6)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    flexDirection: "row"
  },
  Data: {
    flex: 1
  },
  DataText: {
    position: "absolute",
    color: "#fff",
    fontSize: 20
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  cancelButtonText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 18
  },
  topOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: windowHeight * 0.1,
    flexDirection: "row"
  },
  bottomOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: windowHeight * 0.2,
    flexDirection: "row"
  },
  leftOverlay: {
    position: "absolute",
    right: 0,
    bottom: windowHeight * 0.4,
    top: windowHeight * 0.2,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: windowWidth * 0.1,
    flexDirection: "row"
  },
  rightOverlay: {
    position: "absolute",
    left: 0,
    bottom: windowHeight * 0.4,
    top: windowHeight * 0.2,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: windowWidth * 0.1,
    flexDirection: "row"
  }
});

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
    //Todo: check if the scannedData is a valid json
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
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: "#fff" }}>
            Camera permission is not granted
          </Text>
        ) : (
          <View>
            <BarCodeScanner
              onBarCodeRead={this.handleBarCodeRead}
              style={{
                height: windowHeight,
                width: windowWidth
              }}
            />

            <View style={styles.topOverlay} />
            <View style={styles.leftOverlay} />
            <View style={styles.rightOverlay} />
            <View style={styles.bottomOverlay} />
            <Text style={styles.DataText}> Scan QR Code</Text>
          </View>
        )}

        {this.maybeRenderData()}

        <StatusBar hidden />
      </View>
    );
  }
}
