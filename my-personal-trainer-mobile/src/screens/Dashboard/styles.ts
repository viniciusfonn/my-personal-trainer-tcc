import styled from "styled-components/native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Dimensions, FlatList} from "react-native";
import {ProviderProps} from "../../components/ProviderItem";
import {RectButton} from "react-native-gesture-handler";

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
	align-items: center;
	width:100%;
`;

export const AppointmentsLink = styled.TouchableOpacity`
		background-color: #890000;
	padding:8px;
	border-radius:7px;
`

export const AppointmentsLinkText = styled.Text`
color: #FFF;
	text-align: center;
`

export const NotFoundText = styled.Text`
	color: #FFF;
	text-align:center;
	font-size: 18px;
`

export const HeaderTitle = styled.Text`
	color: #f4ede8;
  font-size: 20px;
  line-height: 28px;
`;

export const HeaderUserInfo = styled(RectButton)`
	flex-direction:row;
	gap:16px;
`

export const UserName = styled.Text`
	color: #8C0000;
	font-weight: bold;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const Main = styled.View`
	padding: 0 16px
`

export const ProvidersList = styled(FlatList as new () => FlatList<ProviderProps>)`
	height: ${Dimensions.get('window').height * 0.6}px;
`;

export const SearchProviders = styled.TextInput`
	background-color: #3e3b47;
	border-radius:8px;
	color: #FFF;
	margin: 0px 24px 16px;
	padding: 5px 10px;

	::placeholder{
		color: #FFF;
	}
`


