import React, {useCallback, useRef} from "react"
import {Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText, Logo} from './styles';
import {
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import Input from "../../components/Input";
import {Button} from "../../components/Button";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import logo from '../../assets/logo.png'
import {useAuth} from "../../hooks/auth";
import {getValidationErrors} from '../../utils/getValidationErrors'

interface SignInFormData {
	email: string;
	password: string;
}

export const SignIn = () => {

	const formRef = useRef<FormHandles>(null)
	const passwordRef = useRef<TextInput>(null);
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

	const {signIn} = useAuth()

	const handleSubmit = useCallback(
		async (data: SignInFormData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					email: Yup.string()
						.required('E-mail obrigatório!')
						.email('Digite um e-mail válido!'),
					password: Yup.string().min(6, 'No mínimo 6 dígitos'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await signIn({...data});

				navigation.navigate('Dashboard');
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
				}
				console.log(err)

				Alert.alert(
					'Erro na autenticação!',
					'Ocorreu um erro ao fazer login, cheque as credenciais.',
				);
			}
		},
		[navigation, signIn],
	);


	return (
		<>
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{flex: 1}}
				>
					<Container>
						<Logo source={logo} />
						<View>
							<Title>Faça seu login</Title>
						</View>

						<Form ref={formRef} onSubmit={handleSubmit}>
							<Input
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								name="email"
								icon="mail"
								placeholder="E-mail"
								returnKeyType="next"
								onSubmitEditing={() => formRef.current?.focus()}
							/>

							<Input
								ref={passwordRef}
								secureTextEntry
								name="password"
								icon="lock"
								placeholder="Senha"
								returnKeyType="send"
								onSubmitEditing={() => formRef.current?.submitForm()}
							/>

							<Button onPress={() => formRef.current?.submitForm()}>
								Entrar
							</Button>
						</Form>

						<ForgotPassword>
							<ForgotPasswordText onPress={() => navigation.navigate('forgotPassword')}>Esqueci minha senha</ForgotPasswordText>
						</ForgotPassword>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<CreateAccountButton onPress={() => navigation.navigate('signUp')}>
				<Icon name="log-in" size={20} color="#FFF" />
				<CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
			</CreateAccountButton>
		</>
	);
}
