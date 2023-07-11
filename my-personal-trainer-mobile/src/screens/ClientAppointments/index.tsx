import {AppointmentsList, Container, Header, LoadingText, Main, MainTitle, ReturnButton, ReturnButtonText, UserAvatar} from "./styles"
import Icon from "react-native-vector-icons/Feather";
import {Text} from 'react-native'
import {useCallback, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../../hooks/auth";
import {AppointmentItem} from "../../components/AppointmentItem";
import {api} from "../../services/api";
import {AxiosResponse} from "axios";
import {compareAsc} from "date-fns";

export interface AppointmentProps {
	date: string
	providedBy: {
		name: string
		avatar: string
	}
}

const ClientAppointments: React.FC = () => {

	const navigator = useNavigation()
	const {user} = useAuth()
	const [appointments, setAppointments] = useState<AppointmentProps[]>([])
	const [loading, setLoading] = useState(false)

	const navigateToDashboard = useCallback(() => navigator.navigate('Dashboard'), [navigator])

	useEffect(() => {
		getAppointments()
	}, [])

	const getAppointments = useCallback(
		() => {
			setLoading(true)
			api.get('/appointments/client/me').then((response: AxiosResponse) => {
				response.data.sort(function (a, b) {
					return new Date(a.date) - new Date(b.date);
				});

				setAppointments(response.data)
			}
			).finally(() => setLoading(false))
		}
		, []
	)



	return (
		<Container>
			<Header>
				<ReturnButton onPress={navigateToDashboard}>
					<Icon name="chevron-left" size={20} color={'#FFF'} />
					<ReturnButtonText>Retornar</ReturnButtonText>
				</ReturnButton>
				<UserAvatar source={{uri: `https://my-personal-trainer-api.up.railway.app/files/${user.avatar}`}} />
			</Header>

			<Main>
				<MainTitle>Meus agendamentos futuros</MainTitle>

				{loading ? <LoadingText>Carrengando...</LoadingText> :
					<AppointmentsList data={appointments} renderItem={({item: appointment}: {item: AppointmentProps}) => <AppointmentItem date={appointment.date} providedBy={appointment.providedBy} />} />

				}
			</Main>

		</Container>

	)
}

export default ClientAppointments
