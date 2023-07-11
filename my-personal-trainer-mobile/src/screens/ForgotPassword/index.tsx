import {BackToLoginButton, BackToLoginButtonText, Container} from "./styles"
import React, {useState} from "react"
import Icon from "react-native-vector-icons/Feather"
import {ParamListBase, useNavigation} from "@react-navigation/native"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import {FormEmailForgotPassword} from "../../components/FormEmailForgotPassword"

const ForgotPassword: React.FC = () => {


	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

	return (
		<>
			<Container>
				<FormEmailForgotPassword navigation={navigation.navigate} />
			</Container>
			<BackToLoginButton onPress={() => navigation.navigate('signIn')}>
				<Icon name="log-in" size={20} color="#FFF" />
				<BackToLoginButtonText>Voltar para o login</BackToLoginButtonText>
			</BackToLoginButton>

		</>

	)

}

export default ForgotPassword
