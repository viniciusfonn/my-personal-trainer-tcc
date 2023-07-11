import React, {useCallback, useRef} from "react"
import {Form} from "@unform/mobile"
import {FormDescription, FormTitle} from "./styles"
import Input from "../Input"
import Button from "../Button"
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import {Alert} from "react-native"
import {getValidationErrors} from "../../utils/getValidationErrors"
import {api} from "../../services/api"

interface FormEmailForgotPassword {
	navigation: (value: string) => void
}

export const FormEmailForgotPassword: React.FC<FormEmailForgotPassword> = ({navigation}) => {

	const formRef = useRef<FormHandles>(null)

	const handleSubmit = useCallback(async (data: {email: string}) => {
		try {
			formRef.current?.setErrors({});
			const schema = Yup.object().shape({
				email: Yup.string()
					.required('E-mail obrigatório!')
					.email('Digite um e-mail válido!'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await api.post('/password/forgot', {email: data.email})

			navigation('recoverPassword')

		} catch (err: any) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err);
				formRef.current?.setErrors(errors);
			}
			console.log(err.response.data)

			Alert.alert(
				'Erro ao enviar o email!',
				'Ocorreu um erro ao enviar o email, cheque novamente.',
			);


		}
	}, [])
	return (
		<Form onSubmit={handleSubmit} ref={formRef}>
			<FormTitle>Insira o seu email</FormTitle>
			<FormDescription>Caso você possua uma conta com o email informado, você recebera em sua caixa postal um token para recuperar sua senha.</FormDescription>
			<Input
				name="email"
				icon="mail"
				autoCorrect={false}
				autoCapitalize="none"
				placeholder="Email"
				returnKeyType="send"
				secureTextEntry
				keyboardType="email-address"
				onSubmitEditing={() => formRef.current?.submitForm()}
			/>

			<Button onPress={() => formRef?.current?.submitForm()}>Enviar</Button>
		</Form>

	)

}
