import {Dimensions, FlatList} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native'
import {AppointmentProps} from '.';

export const Container = styled.View`
	flex:1;
`

export const Header = styled.View`
	padding: 24px;
	padding-top: ${getStatusBarHeight() + 24}px;
	background: #28262e;
	justify-content:space-between;
	flex-direction: row;
	align-items: center;
	width:100%;
`;

export const LoadingText = styled.Text`
	color: #FFF;
	text-align:center;
	font-size: 16px;
`

export const UserAvatar = styled.Image`
	width: 56px;
	height: 56px;
	border-radius: 28px;
	margin-left: auto;
`

export const ReturnButton = styled.Text`
	flex-direction: row;
	align-items:center;
	color: #FFF;
`

export const ReturnButtonText = styled.Text`
	margin-left:24px;
	font-size:18px;
`

export const Main = styled.View`
	padding: 16px;	
`

export const MainTitle = styled.Text`
	color: #FFF;
	font-size: 24px;	
	margin-bottom:24px;
`

export const AppointmentsList = styled(FlatList as new () => FlatList<AppointmentProps>)`
	height: ${Dimensions.get('window').height * 0.8}px;
`

