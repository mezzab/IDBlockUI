import React, { Component } from "react";
import { Container } from "../../../shared";
import { Text, View, ActivityIndicator } from "react-native";
import { Pages } from "../../../../utils/constants";

export class LoadingValidation extends Component {
  // componentDidMount = async () => {  
  // const faceIDSelfie = await this.checkFaceIdSelfie();
  // const faceIdDni = await this.checkFaceIdDNI();
  // this.checkFaceIds(faceIDSelfie,faceIdDni);
  // };

  componentDidMount() {
    setTimeout(() => this.props.navigation.navigate(Pages.Results), 7000);
  }

  //Selfie
  checkFaceIdSelfie = async () => {
    console.log("Face - Detect de Selfie");
    try {
      let response = await fetch("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "747b1996849f4b5f9ee8fb1a1d23420c"
        },
        body: JSON.stringify({
          "url": "https://image.shutterstock.com/image-photo/piraeus-greece-october-31-2017-450w-752955112.jpg"
        })
      });

      console.log(response);
      return response;

    } catch (error) {
      //todo: we have to show an error notification here.
      console.error(error);
    }
  };


  //Foto DNI
  checkFaceIdDNI = async () => {
    console.log("Face - Detect de Foto DNI");
    try {
      let response = await fetch(`https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "747b1996849f4b5f9ee8fb1a1d23420c"
        },
        body: JSON.stringify({
          "url": "https://image.shutterstock.com/image-photo/piraeus-greece-october-31-2017-450w-752955112.jpg"
        })
      });
      console.log(response);
      return response;
    } catch (error) {
      //todo: we have to show an error notification here.
      console.error(error);
    }
  };


  //Face Verify (FaceId Selfie vs FaceId Dni)
  checkFaceIds = async (faceIDSelfie, faceIdDni) => {
    console.log("Comparando FaceId Selfie vs FaceId Dni");
    try {
      let response = await fetch(`https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "747b1996849f4b5f9ee8fb1a1d23420c"
        },
        body: JSON.stringify({
          "faceId1": JSON.parse(faceIDSelfie._bodyText)[0].faceId,
          "faceId2": JSON.parse(faceIdDni._bodyText)[0].faceId
        })
      });
      console.log(response);
      this.props.navigation.navigate(Pages.Results);
    } catch (error) {
      //todo: we have to show an error notification here.
      console.error(error);
    }
  };

  render() {
    return (
      <Container>
        <View style={{ margin: 50, paddingTop: 100 }}>
          {/* <NineCubesLoader size={70} color={"white"} betweenSpace={10} /> */}
          <ActivityIndicator
            style={{
              paddingTop: 50,
              paddingBottom: 30,
              transform: [{ scale: 4 }]
            }}
            size="large"
            color="white"
          />
        </View>

        <Text
          style={{
            fontFamily: "msyi",
            marginTop: "25%",
            fontSize: 28,
            color: "white",
            margin: 35,
            display: "flex"
          }}
        >
          Verificando identidad, por favor aguarde un instante.
        </Text>
      </Container>
    );
  }
}

export default LoadingValidation;
