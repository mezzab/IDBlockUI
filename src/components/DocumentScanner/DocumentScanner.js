import React from "react";
import { Container, InputText, InputField } from "../shared";
import TextButton from "../Button";
import { Pages, Keys, IconsType } from "../../utils/constants";





export class DocumentScanner extends React.Component {



    render() {
      return (
        <Container>           
          <TextButton
            margin="10px 0  10px 0"
            value="Go back to home"
            onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
          />
        </Container>
      );
    }
  }
  

