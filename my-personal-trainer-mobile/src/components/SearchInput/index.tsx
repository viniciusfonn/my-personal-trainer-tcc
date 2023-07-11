import {TextInput} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import {Container} from "./styles"
import {Input} from "./styles"

export const SearchInput: React.FC<TextInput> = ({...rest}) => {
	return (
		<Container>
			<Icon name="search" color={'#b8b4b4'} />
			<Input {...rest} placeholder="Pesquisar" placeholderTextColor={'#b8b4b4'} />
		</Container>
	)
}
