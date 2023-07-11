import React, {useRef, useCallback} from "react";
import {
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Alert,
	Text
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {useNavigation} from "@react-navigation/native";
import {Form} from "@unform/mobile";
import {FormHandles} from "@unform/core";
import * as Yup from "yup";
import {api} from "../../services/api";
import {useAuth} from "../../hooks/auth";
import {getValidationErrors} from "../../utils/getValidationErrors";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as ImagePicker from 'expo-image-picker'

import {
	Container,
	BackButton,
	Title,
	UserAvatarButton,
	UserAvatar,
	BackButtonText,
	Header,
	LogOutButton,
	LogOutButtonText,
} from "./styles";

interface ProfileFormData {
	name: string;
	email: string;
	old_password: string;
	password: string;
	password_confirmation: string;
}

const Profile: React.FC = () => {
	const {user, signOut, updateUser} = useAuth();

	const emailInputRef = useRef<TextInput>(null);
	const oldPasswordInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);
	const confirmPasswordInputRef = useRef<TextInput>(null);
	const formRef = useRef<FormHandles>(null);

	const navigation = useNavigation();

	const handleUpdateUser = useCallback(
		async (data: ProfileFormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					name: Yup.string().required("Nome obrigatório"),
					email: Yup.string()
						.email("Digite um e-mail válido")
						.required("E-mail obrigatório"),
					old_password: Yup.string(),
					password: Yup.string().when("old_password", {
						is: (val: string) => !!val.length,
						then: (schema) => schema.required("Campo obrigatório")
					}),
					password_confirmation: Yup.string().when('old_password', {
						is: (value: string) => !!value.length,
						then: (schema) => schema.required("Campo obrigatório")
					}).oneOf([Yup.ref("password")], "Confirmação incorreta"),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const {
					name,
					email,
					old_password,
					password,
					password_confirmation,
				} = data;

				const formData = {
					name,
					email,
					...(old_password
						? {
							old_password,
							password,
							password_confirmation,
						}
						: {}),
				};


				const response = await api.put("/profile", formData);

				updateUser(response.data);

				Alert.alert("Perfil atualizado com sucesso!");

				navigation.goBack();
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);

					formRef.current?.setErrors(errors);

					return;
				}

				Alert.alert(
					"Erro na atualização do perfil",
					"Ocorreu um erro ao atualizar seu perfil, tente novamente.",
				);
			}
			navigation;
		},
		[navigation, updateUser],
	);

	const handleGoBack = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const handleUpdateAvatar = useCallback(async () => {

		try {

			const response = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true});

			if (response.canceled) {
				return;
			}

			const data = new FormData();

			data.append("avatar", {
				type: "image/jpeg",
				name: `${user.id}.jpeg`,
				uri: response.assets[0].uri,
			});

			api.patch("/users/avatar", data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then((apiResponse) => {
				updateUser(apiResponse.data);
			}).catch(err => console.log(err));



		} catch (err) {
			Alert.alert("Erro ao atualizar sua foto de perfil");
		}


	}, [user.id, updateUser]);

	return (
		<>
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				enabled
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{flex: 1}}
				>
					<Container>
						<Header>
							<BackButton onPress={handleGoBack}>
								<Icon name="chevron-left" size={24} color="#FFF" />
								<BackButtonText>Voltar</BackButtonText>
							</BackButton>

							<LogOutButton onPress={signOut} ><LogOutButtonText>Deslogar</LogOutButtonText></LogOutButton>

						</Header>

						<UserAvatarButton onPress={handleUpdateAvatar}>
							<UserAvatar source={{uri: user.avatar ? `https://my-personal-trainer-api.up.railway.app/files/${user.avatar}` : 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'}} />
						</UserAvatarButton>

						<View>
							<Title>Meu perfil</Title>
						</View>

						<Form initialData={{email: user.email, name: user.name}} ref={formRef} onSubmit={handleUpdateUser}>
							<Input
								autoCapitalize="words"
								name="name"
								icon="user"
								placeholder="Nome"
								returnKeyType="next"
								onSubmitEditing={() => {
									emailInputRef.current?.focus();
								}}
							/>
							<Input
								ref={emailInputRef}
								keyboardType="email-address"
								autoCorrect={false}
								autoCapitalize="none"
								name="email"
								icon="mail"
								placeholder="E-mail"
								returnKeyType="next"
								onSubmitEditing={() => {
									oldPasswordInputRef.current?.focus();
								}}
							/>
							<Input
								ref={oldPasswordInputRef}
								secureTextEntry
								name="old_password"
								icon="lock"
								placeholder="Senha atual"
								textContentType="newPassword"
								containerStyle={{marginTop: 16}}
								returnKeyType="next"
								onSubmitEditing={() => {
									passwordInputRef.current?.focus();
								}}
							/>
							<Input
								ref={passwordInputRef}
								secureTextEntry
								name="password"
								icon="lock"
								placeholder="Nova senha"
								textContentType="newPassword"
								returnKeyType="next"
								onSubmitEditing={() => {
									confirmPasswordInputRef.current?.focus();
								}}
							/>
							<Input
								ref={confirmPasswordInputRef}
								secureTextEntry
								name="password_confirmation"
								icon="lock"
								placeholder="Confirmar nova senha"
								textContentType="newPassword"
								returnKeyType="send"
								onSubmitEditing={() => {
									formRef.current?.submitForm();
								}}
							/>

							<Button
								onPress={() => {
									formRef.current?.submitForm();
								}}
							>
								Confirmar mudanças
							</Button>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
};

export default Profile;
