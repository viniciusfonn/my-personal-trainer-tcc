import styled from "styled-components/native";

export const Container = styled.View`
	background-color: #3e3b47;
	color: #FFF;
	margin: 26px 0;
	padding: 5px 10px;
	flex-direction: row;
	border-radius: 10px;
	align-items:center;
	width:100%;
	gap: 16px;	
`

export const Input = styled.TextInput`
	color: #FFF;
	flex:1;

	::placeholder{
		color: #FFF
	}
`
