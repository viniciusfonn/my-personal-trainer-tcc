import React, {useCallback, useEffect, useState, useMemo} from "react";
import {Platform, Text, Alert, View} from "react-native";
import {useRoute, useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import {addDays, format, formatISO, subDays, subHours} from "date-fns";
import {api} from "../../services/api";
import {useAuth} from "../../hooks/auth";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
	Container,
	Header,
	BackButton,
	HeaderTitle,
	UserAvatar,
	Content,
	ProviderAvatar,
	Title,
	Schedule,
	Section,
	SectionTitle,
	SectionContent,
	Hour,
	HourText,
	CreateAppointmentButton,
	CreateAppointmentButtonText,
	CalenderContainer,
	ProviderInfoContainer,
	ProviderInfo,
	ProviderText,
	DescriptionContainer,
	Description,
} from "./styles";

interface RouteParams {
	providerId: string;
}

export interface Provider {
	id: string;
	name: string;
	avatar: string;
	email: string
	ProviderInfo: {
		description?: string
		category: {
			category: string
		}
	}
}

interface AvailabilityItem {
	hour: number;
	available: boolean;
}


LocaleConfig.locales['br'] = {
	monthNames: [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro'
	],
	monthNamesShort: ["jan.", "fev.", "mar.", "abr.", "maio", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."],
	dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
	dayNamesShort: ['Dom.','Seg.', 'Ter.', 'Quar.', 'Qui.', 'Sex.', 'Sáb.'],
	today: "Hoje"
};
LocaleConfig.defaultLocale = 'br'

const CreateAppointment: React.FC = () => {
	const {user} = useAuth();
	const route = useRoute();
	const {goBack, navigate} = useNavigation();

	const routeParams = route.params as RouteParams;

	const [providerData, setProviderData] = useState<Provider | undefined>(undefined)
	const [selectedProvider, setSelectedProvider] = useState(
		routeParams.providerId,
	);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
	const [selectedHour, setSelectedHour] = useState(6);

	const providerAvatar = providerData?.avatar ? `https://my-personal-trainer-api.up.railway.app/files/${providerData?.avatar}` : 'https://museulinguaportuguesa.org.br/wp-content/uploads/2018/02/Personal-Trainer.jpg'

	useEffect(() => {
		api.get(`/providers/${selectedProvider}`).then((response) => {
			setProviderData(response.data)
		});
	}, []);

	useEffect(() => {
		api
			.get(`/providers/${selectedProvider}/day-availability`, {
				params: {
					year: selectedDate.getFullYear(),
					month: selectedDate.getMonth() + 1,
					day: selectedDate.getDate(),
				},
			})
			.then((response) => {
				setAvailability(response.data);
			});
	}, [selectedDate, selectedProvider]);

	const navigateBack = useCallback(() => {
		goBack();
	}, [goBack]);

	const handleToggleDatePicker = useCallback(() => {
		setShowDatePicker((state) => !state);
	}, []);

	const handleDateChange = useCallback((event: any, date: Date | undefined) => {
		if (Platform.OS === "android") {
			setShowDatePicker(false);
		}

		if (date) {
			setSelectedDate(date);
		}
	}, []);

	const morningAvailability = useMemo(() => {
		return availability
			.filter(({hour}) => hour < 12 &&  hour >= 6)
			.map(({hour, available}) => {
				return {
					hour,
					available,
					hourFormatted: format(new Date().setHours(hour), "HH:00"),
				};
			});
	}, [availability]);

	const afternoonAvailability = useMemo(() => {
		return availability
			.filter(({hour}) => hour >= 12 && hour <=18)
			.map(({hour, available}) => {
				return {
					hour,
					available,
					hourFormatted: format(new Date().setHours(hour), "HH:00"),
				};
			});
	}, [availability]);

	const nightAvailability = useMemo(() => {
		return availability
			.filter(({hour}) => hour > 18)
			.map(({hour, available}) => {
				return {
					hour,
					available,
					hourFormatted: format(new Date().setHours(hour), "HH:00"),
				};
			});
	}, [availability]);
	

	const handleSelectHour = useCallback((hour: number) => {
		setSelectedHour(hour);
	}, []);

	const handleCreateAppointment = useCallback(async () => {
		try {
			const date = new Date(selectedDate);

			date.setHours(selectedHour);
			date.setMinutes(0);

			let formatedDate = formatISO(subHours(date, 3))

			await api.post("/appointments", {
				provider_id: selectedProvider,
				date: formatedDate,
			});

			navigate('AppointmentCreated', {date: date.getTime()});

		} catch (err) {
			console.log(err)
			Alert.alert(
				"Erro ao criar agendamento",
				"Ocorreu um erro ao criar o agendamento",
			);
		}
	}, [selectedDate, selectedHour, selectedProvider, navigate]);

	return (
		<Container>
			<Header>
				<BackButton onPress={navigateBack}>
					<Icon name="chevron-left" size={24} color="#999591" />
				</BackButton>

				<HeaderTitle>Selecionar outro</HeaderTitle>

				<UserAvatar source={{uri: `https://my-personal-trainer-api.up.railway.app/files/${user.avatar}`}} />
			</Header>

			<Content>
				<Title>Treinador selecionado: </Title>
				<ProviderInfoContainer>
					<ProviderAvatar source={{uri: providerAvatar}} />
					<ProviderInfo>
						<ProviderText>Nome: {providerData?.name || 'Carregando...'}</ProviderText>
						<ProviderText>Email: {providerData?.email || 'Carregando...'}</ProviderText>
						<ProviderText>Categoria: {providerData?.ProviderInfo.category.category || 'Carregando...'}</ProviderText>
					</ProviderInfo>
				</ProviderInfoContainer>
				<DescriptionContainer>
					<Title>Descrição:</Title>
					<Description>{providerData?.ProviderInfo.description || 'Nenhuma descrição informada'}</Description>
				</DescriptionContainer>

				<CalenderContainer>
					<Title>Escolha a data</Title>

					<Calendar
						theme={{
							backgroundColor: "#3e3b47",
							textSectionTitleColor: "#FFFFFF",
							calendarBackground: '#3e3b47',
							dayTextColor: "#FFFFFF",
							todayTextColor: '#890000',
							monthTextColor: '#FFFFFF',
							arrowColor: '#FFFFFF'
						}}
						onDayPress={day => setSelectedDate(addDays(new Date(day.dateString), 1))}
						markedDates={{
							[format(selectedDate, 'yyyy-MM-dd')]: {selected: true, disableTouchEvent: true, selectedColor: '#890000'}
						}} />


					{showDatePicker && (
						<DateTimePicker
							mode="date"
							display="calendar"
							onChange={handleDateChange}
							value={selectedDate}
						/>
					)}
				</CalenderContainer>

				<Schedule>
					<Title>Escolha horário</Title>

					<Section>
						<SectionTitle>Manhã</SectionTitle>

						<SectionContent>
							{morningAvailability.map(({hourFormatted, hour, available}) => (
								<Hour
									key={hourFormatted}
									onPress={() => handleSelectHour(hour)}
									enabled={available}
									available={available}
									selected={selectedHour === hour}
								>
									<HourText selected={selectedHour === hour}>
										{hourFormatted}
									</HourText>
								</Hour>
							))}
						</SectionContent>
					</Section>

					<Section>
						<SectionTitle>Tarde</SectionTitle>

						<SectionContent>
							{afternoonAvailability.map(
								({hourFormatted, hour, available}) => (
									<Hour
										key={hourFormatted}
										onPress={() => handleSelectHour(hour)}
										enabled={available}
										available={available}
										selected={selectedHour === hour}
									>
										<HourText selected={selectedHour === hour}>
											{hourFormatted}
										</HourText>
									</Hour>
								),
							)}
						</SectionContent>
					</Section>
					<Section>
						<SectionTitle>Noite</SectionTitle>

						<SectionContent>
							{nightAvailability.map(
								({hourFormatted, hour, available}) => (
									<Hour
										key={hourFormatted}
										onPress={() => handleSelectHour(hour)}
										enabled={available}
										available={available}
										selected={selectedHour === hour}
									>
										<HourText selected={selectedHour === hour}>
											{hourFormatted}
										</HourText>
									</Hour>
								),
							)}
						</SectionContent>
					</Section>
				</Schedule>

				<CreateAppointmentButton onPress={handleCreateAppointment}>
					<CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
				</CreateAppointmentButton>
			</Content>
		</Container>
	);
};

export default CreateAppointment;
