import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage , Image} from "react-native";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Pages, Keys, Colors, IconsType } from "../../utils/constants";
import TextButton from "../Button";
import styled from "styled-components";
import { InputText, Container, InputField,InformativeField, FinalField } from "../shared";
import Expo from "expo";


export class Legajo extends React.Component {
  state = {
    email: 'prueba',
    phone: 'prueba',
    selfieUri: '',
    isValid: false,
    code: null
  };

  getMail = async () => {
      this.setState({email: await AsyncStorage.getItem(Keys.Mail) });
    }

   getPhone = async () => {
      this.setState({phone: await AsyncStorage.getItem(Keys.Phone) });
      //console.log(await AsyncStorage.getItem(Keys.Selfie));
    }

    getSelfie = async() =>{
      var uriSelfie = JSON.parse(await AsyncStorage.getItem(Keys.Selfie));
      this.setState({selfieUri: uriSelfie });
    }


  render() {
    // this.getMail();
    // this.getPhone();
    // this.getSelfie();
    return (
      <Container>

          <Text style={{fontWeight: 'bold', marginTop: '14%', fontSize: 25, color: 'white' }}>
              Confirma tus datos:
          </Text>
          <ScrollView style={{ width: '100%', marginTop: "5%", maxHeight: '70%'}}>
              <FinalField name={'Mail:'} value={'marcos32m@gmail.com'} />
              <FinalField name={'Telefono:'} value={'11-44554455'} />
              <FinalField name={'DNI:'} value={'37859360'} />
              <FinalField name={'Apellido:'} value={'Mezzabotta'} />
              <FinalField name={'Nombre:'} value={'Marcos'} />
              <FinalField name={'Sexo:'} value={'Masculino'} />
              <FinalField name={'Fecha de Nacimiento:'} value={'05/01/1994'} />
              <FinalField name={'Fecha tramite DNI:'} value={'06/05/2001'} />
              <Text style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'flex-start',
                  width: '100%',
                  marginLeft: "10%",
                  marginTop: '1%',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: 'white'
              }}>
                  Foto de rostro:
              </Text>

          </ScrollView>
          <View style={{ height: '20%'}}>
            <TextButton
              margin="0"
              value="Continuar"
              disable={false}
              onPress={() => this.props.navigation.navigate(Pages.Legajo)}
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
