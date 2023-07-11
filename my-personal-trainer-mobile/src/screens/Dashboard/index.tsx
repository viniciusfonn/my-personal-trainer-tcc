import React, {useCallback, useEffect, useState} from "react";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {api} from "../../services/api";
import {useAuth} from "../../hooks/auth";
import {Button} from '../../components/Button'

import {
	Container,
	Header,
	HeaderTitle,
	UserName,
	UserAvatar,
	ProvidersList,
	HeaderUserInfo,
	NotFoundText,
	Main,
	AppointmentsLink,
	AppointmentsLinkText
} from "./styles";
import {AxiosResponse} from "axios";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ProviderItem} from "../../components/ProviderItem";
import {ProviderProps} from "../../components/ProviderItem";
import {SearchInput} from "../../components/SearchInput";
import {SelectCategory} from "../../components/SelectCategory";

export const Dashboard: React.FC = () => {
	const [providers, setProviders] = useState<ProviderProps[]>([]);
	const [loading, setLoading] = useState<string | null>(null)
	const {user, signOut} = useAuth();
	const [searchText, setSearchText] = useState('')
	const {navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>()
	const [categoryId, setCategoryId] = useState<string | null>(null)

	useEffect(() => {
		if (categoryId) {
			fetchByCategory()
		} else {
			fetchAll()
		}

	}, [categoryId])

	const fetchAll = useCallback(
		() => {
			setLoading('Carregando...')

			api.get('/providers').then((response: AxiosResponse) => {
				setProviders(response.data)
			}).finally(() => setLoading(null))

		}, [categoryId]
	)

	const fetchByCategory = useCallback(
		() => {
			setLoading('Carregando...')

			api.get(`providers/category/${categoryId}`).then((response: AxiosResponse) => {
				setProviders(response.data)
			}).finally(() => setLoading(null))
		}, [categoryId]
	)

	const navigateToProfile = useCallback(() => {
		navigate("Profile");
	}, [navigate]);

	const navigateToAppointmentsList = useCallback(() => {
		navigate("ClientAppointments");
	}, [navigate]);


	const providerList = searchText ? providers?.filter(provider => provider.name.toLowerCase().includes(searchText.toLowerCase())) : []


	return (
		<Container>
			<Header>
				<HeaderUserInfo onPress={navigateToProfile}>
					<UserAvatar source={{uri: user.avatar ? `https://my-personal-trainer-api.up.railway.app/files/${user.avatar}` : 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'}} />

					<HeaderTitle>
						Bem vindo, {"\n"}
						<UserName>{user.name}</UserName>
					</HeaderTitle>
				</HeaderUserInfo>
				<AppointmentsLink onPress={navigateToAppointmentsList}><AppointmentsLinkText>Agendamentos</AppointmentsLinkText></AppointmentsLink>

			</Header>
			<SelectCategory onValueChange={(text) => setCategoryId(text)} />

			<Main>

				<SearchInput onChangeText={(text: string) => setSearchText(text)} />

				{(searchText && providerList.length === 0) || (!searchText && providers.length === 0) && loading === null ? <NotFoundText>Nenhum treinador encontrado!</NotFoundText> : null}
				{loading ? <NotFoundText>{loading}</NotFoundText> : <ProvidersList
					data={searchText ? providerList : providers}
					renderItem={({item: provider}: {item: ProviderProps}) => <ProviderItem name={provider.name} avatar={provider.avatar} id={provider.id} key={provider.id} ProviderInfo={provider.ProviderInfo} />}
				/>
				}


			</Main>
		</Container>
	);
};


