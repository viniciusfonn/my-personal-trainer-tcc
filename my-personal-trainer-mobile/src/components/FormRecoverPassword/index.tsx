import React, {useCallback, useRef} from "react"
import {Form} from "@unform/mobile"
import {FormDescription, FormTitle, GoBackDescription, GoBackText} from "./styles"
import Input from '../Input'
import Button from '../Button'
import {FormHandles} from '@unform/core';
import * as Yup from 'yup'
import {getValidationErrors} from "../../utils/getValidationErrors"
import {Alert} from "react-native"
import {api} from "../../services/api"
import {ParamListBase, useNavigation} from "@react-navigation/native"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"

interface FormRecoverPassword {
	navigation: (value: number) => void
}

export const FormRecoverPassword: React.FC<FormRecoverPassword> = ({navigation}) => {

	const formRef = useRef<FormHandles>(null)

	const handleSubmit = useCallback(async (data: {token: string, password: string, password_confirmation: string}) => {
		try {
			formRef.current?.setErrors({});
			const schema = Yup.object().shape({
				token: Yup.string()
					.required('Insira o token.')
					.uuid("Token inválido."),
				password: Yup.string().min(6, 'No mínimo 6 dígitos'),
				password_confirmation: Yup.string().min(6, 'No mínimo 6 dígitos').oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await api.patch('/password/reset', data)

			navigation('signIn')

		} catch (err: any) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err);
				formRef.current?.setErrors(errors);
			}
			console.log(err)

			Alert.alert(
				'Erro ao atualizar a senha!',
				'Ocorreu um erro ao atualizar a senha, cheque as credenciais.',
			);

		}
	}, [])

	return (
		<Form ref={formRef} onSubmit={handleSubmit}>
			<FormTitle>Insira o token e redefina sua senha</FormTitle>
			<FormDescription>Informe a nova senha desejada e a sua confirmação e o token para conseguir acessar a sua conta.</FormDescription>
			<Input returnKeyType="next" name="token" icon="key" placeholder="Token" />
			<Input
				secureTextEntry
				name="password"
				icon="lock"
				placeholder="Senha"
				returnKeyType="next"
			/>
			<Input
				name="password_confirmation"
				icon="lock"
				placeholder="Confirmar senha"
				secureTextEntry
				returnKeyType="send"
				onSubmitEditing={() => formRef.current?.submitForm()}

			/>
			<GoBackDescription>Não recebeu o token? Clique no botão abaixo para enviar novamente.</GoBackDescription>
			<GoBackText onPress={() => navigation('forgotPassword')}>Enviar novamente</GoBackText>

			<Button onPress={() => formRef?.current?.submitForm()}>Enviar</Button>
		</Form>

	)

}
