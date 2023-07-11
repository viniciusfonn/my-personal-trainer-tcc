import styled from "styled-components/native";
import {RectButton} from "react-native-gesture-handler";

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
	align-items: center;
	width:100%
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderData = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
	color: #999591;
`
