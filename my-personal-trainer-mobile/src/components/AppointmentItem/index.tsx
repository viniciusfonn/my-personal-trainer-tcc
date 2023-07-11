import {Container, DateMeta, DateText, ProviderAvatar, ProviderContainer, ProviderText} from "./styles"
import Icon from "react-native-vector-icons/Feather";
import {AppointmentProps} from "../../screens/ClientAppointments";
import {addHours, format} from "date-fns";

export const AppointmentItem: React.FC<AppointmentProps> = ({date, providedBy}) => {

	const dateObj = new Date(date)

	const avatarImage = providedBy.avatar !== null ? `https://my-personal-trainer-api.up.railway.app/files/${providedBy.avatar}` : 'https://museulinguaportuguesa.org.br/wp-content/uploads/2018/02/Personal-Trainer.jpg'

	return (
		<Container>
			<ProviderContainer>
				<ProviderAvatar source={{uri: avatarImage}} />
				<ProviderText>{providedBy.name}</ProviderText>
			</ProviderContainer>


			<DateMeta>
				<Icon name="clock" color="#BE2727" />
				<DateText>{format(dateObj, 'dd/MM')} às {format(addHours(dateObj, 3), 'HH:mm')}</DateText>
			</DateMeta>
		</Container>

	)

}
