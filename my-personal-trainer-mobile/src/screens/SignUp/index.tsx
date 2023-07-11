import React, {useCallback, useRef} from 'react';
import {
	View,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {Container, Title, BackToSignIn, BackToSignInText, Logo} from './styles';
import logo from '../../assets/logo.png'
import Icon from 'react-native-vector-icons/Feather';
import {getValidationErrors} from '../../utils/getValidationErrors';
import {api} from '../../services/api';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const navigation = useNavigation();
	const formRef = useRef<FormHandles>(null);
	const emailRef = useRef<TextInput>(null);
	const passwordRef = useRef<TextInput>(null);

	const handleSubmit = useCallback(
		async (data: SignUpFormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					name: Yup.string().required("O nome é obrigatório"),
					email: Yup.string()
						.email("Digite um e-mail válido")
						.required("E-mail obrigatório"),
					password: Yup.string().required("Senha obrigatória"),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const response = await api.post("users", data);

				console.log(response)

				Alert.alert(
					"Cadastro realizado com sucesso!",
					"Você já pode fazer logon na aplicação.",
				);

				navigation.goBack();
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);

					formRef.current?.setErrors(errors);

					return;
				}

				Alert.alert(
					"Erro no cadastro",
					"Ocorreu um erro ao fazer o cadastro, cheque as credenciais",
				);
			}
			navigation;
		},
		[navigation],
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
							<Title>Crie sua conta</Title>
						</View>

						<Form ref={formRef} onSubmit={handleSubmit}>
							<Input
								ref={emailRef}
								autoCapitalize="words"
								name="name"
								icon="user"
								placeholder="Nome"
								returnKeyType="next"
								onSubmitEditing={() => emailRef.current?.focus()}
							/>

							<Input
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								name="email"
								icon="mail"
								placeholder="E-mail"
								returnKeyType="next"
								onSubmitEditing={() => passwordRef.current?.focus()}
							/>

							<Input
								ref={passwordRef}
								secureTextEntry
								name="password"
								icon="lock"
								placeholder="Senha"
								returnKeyType="send"
								textContentType="newPassword"
								onSubmitEditing={() => formRef.current?.submitForm()}
							/>

							<Button onPress={() => formRef.current?.submitForm()}>
								Entrar
							</Button>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<BackToSignIn onPress={() => navigation.goBack()}>
				<Icon name="arrow-left" size={20} color="#FFF" />
				<BackToSignInText>Voltar para login</BackToSignInText>
			</BackToSignIn>
		</>
	);
};

export default SignUp;
