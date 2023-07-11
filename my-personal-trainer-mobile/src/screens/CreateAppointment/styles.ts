import styled from "styled-components/native";
import {FlatList} from "react-native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {RectButton} from "react-native-gesture-handler";

import {Provider} from "./index";

interface ProviderContainerProps {
	selected: boolean;
}

interface ProviderNameProps {
	selected: boolean;
}

interface HourProps {
	available: boolean;
	selected: boolean;
}

interface HourTextProps {
	selected: boolean;
}

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
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProviderInfoContainer = styled.View`
	flex-direction:row;
	justify-content: space-between;
	margin: 24px 24px 24px;
	align-items:center;
`;

export const ProviderAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`

export const ProviderInfo = styled.View`
	flex-direction:column;
	gap:12px;
`

export const ProviderText = styled.Text`
	  color: #f4ede8;
	font-weight: semibold;
	font-size: 16px;
`

export const ProviderContainer = styled(RectButton) <ProviderContainerProps>`
  background: ${(props) => (props.selected ? "#890000" : "#3e3b47")};
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;



export const CalenderContainer = styled.View``;

export const DescriptionContainer = styled.View`
`;

export const Description = styled.Text`
	margin: 12px 24px 24px;
	color: #AFAFAF;
`

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  margin: 12px 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #890000;
  border-radius: 10px;
  margin: 0 24px;
  align-items: center;
  justify-content: center;
`;

export const OpenDatePickerButtonText = styled.Text`
  color: #FFF;
  font-size: 16px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  color: #999591;
  font-size: 18px;
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
	contentContainerStyle: {paddingHorizontal: 24},
	horizontal: true,
	showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton) <HourProps>`
  padding: 12px;
  background: ${(props) => (props.selected ? "#890000" : "#3e3b47")};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${(props) => (props.selected ? "#FFF" : "#f4ede8")};
  font-size: 16px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: #890000;
  border-radius: 10px;
  margin: 0 24px 24px;
  align-items: center;
  justify-content: center;
`;

export const CreateAppointmentButtonText = styled.Text`
  color: #FFF;
  font-size: 18px;
`;
