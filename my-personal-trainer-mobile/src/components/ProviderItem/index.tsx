import {ParamListBase, useNavigation} from "@react-navigation/native"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import {useCallback} from "react"
import Icon from "react-native-vector-icons/Feather"
import {ProviderAvatar, ProviderContainer, ProviderData, ProviderMeta, ProviderMetaText, ProviderName} from "./styles"

export interface ProviderProps {
	name: string
	id: string
	avatar: string
	ProviderInfo: {
		startHour: number;
		endHour: number
		category: {
			category: string
		}
	}
}

export const ProviderItem: React.FC<ProviderProps> = ({name, id, avatar, ProviderInfo}) => {

	const {navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>()

	const navigateToCreateAppointment = useCallback(
		(providerId: string) => {
			navigate("CreateAppointment", {providerId});
		},
		[navigate],
	);

	const avatarImage = avatar !== null ? `https://my-personal-trainer-api.up.railway.app/files/${avatar}` : 'https://museulinguaportuguesa.org.br/wp-content/uploads/2018/02/Personal-Trainer.jpg'

	return (
		<ProviderContainer
			onPress={() => navigateToCreateAppointment(id)}
		>
			<ProviderAvatar source={{uri: avatarImage}} />

			<ProviderData >
				<ProviderName>{name}</ProviderName>

				<ProviderMeta>
					<Icon name="calendar" size={14} color="#d4d4d4" />
					<ProviderMetaText>Segunda a sexta</ProviderMetaText>
				</ProviderMeta>

				<ProviderMeta>
					<Icon name="clock" size={14} color="#d4d4d4" />
					<ProviderMetaText>{ProviderInfo.startHour}h as {ProviderInfo.endHour}h</ProviderMetaText>
				</ProviderMeta>
				<ProviderMeta>
					<Icon name="grid" size={14} color="#d4d4d4" />
					<ProviderMetaText>{ProviderInfo.category.category}</ProviderMetaText>
				</ProviderMeta>

			</ProviderData>
		</ProviderContainer>

	)
}
