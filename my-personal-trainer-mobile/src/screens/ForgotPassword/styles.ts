import styled from 'styled-components/native'

export const Container = styled.View`
	flex-direction:column;
	justify-content:center;
	align-items:center;	
	padding: 12px;
	flex:1;
`

export const BackToLoginButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0%;
  right: 0;
  background: #8C0000;
  border-top-width: 1px;
  border-color: #8C0000;
  padding: 16px 0 ${18}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToLoginButtonText = styled.Text`
  color: #FFF;
  font-size: 18px;
  margin-left: 16px;
`;
