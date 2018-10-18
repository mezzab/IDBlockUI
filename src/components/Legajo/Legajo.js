import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage, Image } from "react-native";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Pages, Keys, Colors, IconsType } from "../../utils/constants";
import TextButton from "../Button";
import styled from "styled-components";
import {
  InputText,
  Container,
  InputField,
  InformativeField,
  FinalField
} from "../shared";
import Expo from "expo";

export class Legajo extends React.Component {
  state = {
    email: "prueba",
    phone: "prueba",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    dni: "",
    sexo: "",
    selfieUri: "",
    dniFrontalUri: "",
    dniBackUri: "",
    isValid: false,
    code: null
  };

  getMail = async () => {
    this.setState({ email: await AsyncStorage.getItem(Keys.Mail) });
  };

  getPhone = async () => {
    this.setState({ phone: await AsyncStorage.getItem(Keys.Phone) });
    //console.log(await AsyncStorage.getItem(Keys.Selfie));
  };

  getSelfie = async () => {
    var uriSelfie = JSON.parse(await AsyncStorage.getItem(Keys.Selfie));
    return this.setState({ selfieUri: uriSelfie });
  };

  getFrontalDNI = async () => {
    var dniFrontalUri = JSON.parse(
      await AsyncStorage.getItem(Keys.DocumentoFrontal)
    );
    return this.setState({ dniFrontalUri });
  };

  getBackDNI = async () => {
    var dniBackUri = JSON.parse(
      await AsyncStorage.getItem(Keys.DocumentoAnterior)
    );
    return this.setState({ dniBackUri });
  };

  getQRCodeDni = async () => {
    var dniInfo = await AsyncStorage.getItem(Keys.DniQR);
    const dataDni = dniInfo.split("@");
    return this.setState({
      apellido: dataDni[1],
      nombre: dataDni[2],
      sexo: dataDni[3] == "M" ? "Masculino" : "Femenino",
      dni: dataDni[4],
      fecha_nacimiento: dataDni[6]
    });
  };

  onNextPress = () => {
    return this.props.navigation.navigate(Pages.LoadingFinal);
  };

  render() {
    this.getMail();
    this.getPhone();
    this.getQRCodeDni();
    this.getSelfie();
    // this.getBackDNI();
    // this.getFrontalDNI();
    // This should be in the componentWillMount(), but I'm not going to move it. ¯\_(ツ)_/¯

    return (
      <Container>
        <Text
          style={{
            fontFamily: "msyi",
            marginTop: "7%",
            fontSize: 35,
            color: "white"
          }}
        >
          Confirma tus datos
        </Text>
        <ScrollView
          style={{ width: "100%", marginTop: "1%", maxHeight: "80%" }}
        >
          <FinalField name={"Mail:"} value={this.state.email} />
          <FinalField name={"Telefono:"} value={this.state.phone} />
          <FinalField name={"DNI:"} value={this.state.dni} />
          <FinalField name={"Apellido:"} value={this.state.apellido} />
          <FinalField name={"Nombre:"} value={this.state.nombre} />
          <FinalField name={"Sexo:"} value={this.state.sexo} />
          <FinalField
            name={"Fecha de Nacimiento:"}
            value={this.state.fecha_nacimiento}
          />
          {/* <FinalField name={'Fecha tramite DNI:'} value={'06/05/2001'} /> */}
          {/* <Text style={{
                  display: 'flex',
                  flexDirection: 'row',
                  fontFamily: "msyi",
                  alignContent: 'flex-start',
                  width: '100%',
                  marginLeft: "7%",
                  marginTop: '1%',
                  fontSize: 25,
                  color: 'white'
              }}>
                  Foto de rostro:
              </Text> */}
          <Image
            style={{
              width: 300,
              height: 310,
              marginLeft: "7%",
              marginTop: "3%"
            }}
            source={{ uri: this.state.selfieUri.uri }}
          />

          {/* <Text style={{
                  display: 'flex',
                  flexDirection: 'row',
                  fontFamily: "msyi",
                  alignContent: 'flex-start',
                  width: '100%',
                  marginLeft: "7%",
                  marginTop: '1%',
                  fontSize: 25,
                  color: 'white'
              }}>
                  Foto Frontal DNI:
              </Text>
              <Image
                style={{ width: '86%', height: 400, marginLeft: '7%', marginTop: '1%'}}
                source={{uri: this.state.dniFrontalUri.uri}}
              />

              <Text style={{
                  display: 'flex',
                  flexDirection: 'row',
                  fontFamily: "msyi",
                  alignContent: 'flex-start',
                  width: '100%',
                  marginLeft: "7%",
                  marginTop: '1%',
                  fontSize: 25,
                  color: 'white'
              }}>
                  Foto Tracera DNI:
              </Text>
              <Image
                style={{ width: '86%', height: 400, marginLeft: '7%', marginTop: '1%'}}
                source={{uri: this.state.dniBackUri.uri}}
              /> */}
        </ScrollView>

        <View style={{ height: "18%" }} onPress={this.onNextPress}>
          <TextButton
            margin="0"
            value="Acepto"
            disable={false}
            onPress={this.onNextPress}
          />
          <TextButton
            margin="0"
            value="Volver"
            disable={false}
            onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
          />
        </View>
      </Container>
    );
  }
}
