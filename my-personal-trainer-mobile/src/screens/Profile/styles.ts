import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
	contentContainerStyle: {paddingHorizontal: 24},
	vertical: true,
	showsHorizontalScrollIndicator: false,
})``;

export const Header = styled.View`
	flex-direction:row;
	justify-content:space-between;
	padding-top: 24px;
	align-items:center;
`

export const LogOutButton = styled.TouchableOpacity`
	width: 78px;
	border-radius: 5px;
	background: #8C0000;
	align-items:center;
	justify-content:center;
	height: 36px;
`
export const LogOutButtonText = styled.Text`
	color: #FFF;
`

export const BackButton = styled.TouchableOpacity`
	flex-direction:row;
	align-items:center;
`;

export const BackButtonText = styled.Text`
	color: #FFF;
	font-size:18px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 96px;
  align-self: center;
`;
