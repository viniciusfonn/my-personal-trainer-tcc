import styled from 'styled-components/native'


export const Container = styled.View`
	flex-direction:row;
	align-items:center;
	justify-content:space-between;
	border-radius:10px;
	background: #3e3b47;
	padding: 14px;
	margin-bottom:8px;
`

export const ProviderAvatar = styled.Image`
	width: 36px;
	height: 36px;
	border-radius: 36px;
	margin-right:16px;
`

export const ProviderContainer = styled.View`
	flex-direction:row;
	align-items:center;
`

export const ProviderText = styled.Text`
	color:#FFF;
	font-size:14px;
`

export const DateMeta = styled.View`
	flex-direction: row;
	align-items:center;
`

export const DateText = styled.Text`
	font-size: 12px;
	margin-left: 12px;
	color: #FFF;
`
