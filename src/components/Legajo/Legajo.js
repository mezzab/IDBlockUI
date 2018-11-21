import React from 'react';
import { AsyncStorage, Image } from 'react-native';
import { Text, ScrollView } from 'react-native';
import { Pages, Keys } from '../../utils/constants';
import TextButton from '../Button';
import { Container, FinalField } from '../shared';
import Expo from 'expo';

const { manifest } = Expo.Constants;
export const api =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:80`)
    : `api.nuestroherokubackend.com`;

export class Legajo extends React.Component {
  state = {
    email: 'marcos32m@gmail.com',
    phone: '1158833086',
    nombre: 'Marcos',
    apellido: 'Mezzabotta',
    fecha_nacimiento: '05/01/1994',
    dni: '37859360',
    sexo: 'Masculino',
    selfieUri: '',
    // dniFrontalUri: '',
    // dniBackUri: '',
    u64DniImage: '',
    isValid: false,
  };

  componentWillMount = async () => {
    // fixme: Hay un metodo para pedir varios items de una...
    const email = await AsyncStorage.getItem(Keys.Mail);
    const phone = await AsyncStorage.getItem(Keys.Phone);
    const selfieUri = JSON.parse(await AsyncStorage.getItem(Keys.Selfie));
    const u64DniImage = JSON.parse(await AsyncStorage.getItem(Keys.DocumentoFrontalBase64));
    const dniInfo = await AsyncStorage.getItem(Keys.DniQR);
    const dataDni = dniInfo.split('@');

    return this.setState({
      email,
      phone,
      selfieUri,
      u64DniImage,
      apellido: dataDni[1],
      nombre: dataDni[2],
      sexo: dataDni[3] == 'M' ? 'Masculino' : 'Femenino',
      dni: dataDni[4],
      fecha_nacimiento: dataDni[6],
    });
  };

  saveLegajo = async () => {
    console.log('* * * * * * * * Guardando legajo en el smart contract. * * * * * * * *');
    stateJSON = JSON.stringify(this.state);
    console.log('Se guardara el siguiente legajo: ' + '\n' + stateJSON.slice(0, 5000) +'...' + '\n');
    const entityAddr = null; //esto viene del QR y esta guardado en el async
    try {
      let response = await fetch(`http://${api}/saveBlock`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `legajo=${stateJSON}&&entityAddr${entityAddr}`,
      });

      console.log('Se guardo el legajo y se genero correctamente la relacion entidad-usuario.')
      // console.log('El hash es:', JSON.parse(response._bodyText)[0].hash)
    } catch (error) {
      //todo: we have to show an error notification here.
      console.error(error);
    }
  };

  onNextPress = () => {
    this.saveLegajo();
    return this.props.navigation.navigate(Pages.LoadingFinal);
  };

  render() {
    return (
      <Container>
        <Text
          style={{
            fontFamily: 'msyi',
            marginTop: '7%',
            fontSize: 35,
            color: 'white',
          }}
        >
          Confirma tus datos
        </Text>
        <ScrollView
          style={{ width: '100%', marginTop: '1%', maxHeight: '80%' }}
        >
          <FinalField name={'Mail:'} value={this.state.email} />
          <FinalField name={'Telefono:'} value={this.state.phone} />
          <FinalField name={'DNI:'} value={this.state.dni} />
          <FinalField name={'Apellido:'} value={this.state.apellido} />
          <FinalField name={'Nombre:'} value={this.state.nombre} />
          <FinalField name={'Sexo:'} value={this.state.sexo} />
          <FinalField
            name={'Fecha de Nacimiento:'}
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
              marginLeft: '7%',
              marginTop: '3%',
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
        <TextButton
          disable={this.state.isValid}
          margin="10px 0  10px 0"
          value="Compartir mi legajo!"
          onPress={() => this.onNextPress()}
        />
        <TextButton
          margin="0"
          value="Volver"
          disable={false}
          onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
        />
      </Container>
    );
  }
}
