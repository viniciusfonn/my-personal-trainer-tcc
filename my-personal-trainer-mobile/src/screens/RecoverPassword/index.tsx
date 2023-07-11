import {BackToLoginButton, BackToLoginButtonText, Container} from "./styles"
import React, {useState} from "react"
import Icon from "react-native-vector-icons/Feather"
import {ParamListBase, useNavigation} from "@react-navigation/native"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import {FormRecoverPassword} from "../../components/FormRecoverPassword"

const RecoverPassword: React.FC = () => {


	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

	return (
		<>
			<Container>
				<FormRecoverPassword navigation={navigation.navigate} />
			</Container>
			<BackToLoginButton onPress={() => navigation.navigate('signIn')}>
				<Icon name="log-in" size={20} color="#FFF" />
				<BackToLoginButtonText>Voltar para o login</BackToLoginButtonText>
			</BackToLoginButton>

		</>

	)

}

export default RecoverPassword
