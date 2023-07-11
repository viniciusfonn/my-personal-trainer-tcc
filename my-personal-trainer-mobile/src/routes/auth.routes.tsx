import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SignIn} from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import React from "react";
import ForgotPassword from "../screens/ForgotPassword";
import RecoverPassword from "../screens/RecoverPassword";

const Auth = createNativeStackNavigator()

export type RootStackNavigationList = 'signIn' | 'dashboard' | 'signUp'


export const AuthRoutes = () => {
	return (
		<Auth.Navigator screenOptions={{
			headerShown: false,
			contentStyle: {backgroundColor: '#312e38'}
		}}>
			<Auth.Screen name='signIn' component={SignIn} />
			<Auth.Screen name='forgotPassword' component={ForgotPassword} />
			<Auth.Screen name='recoverPassword' component={RecoverPassword} />
			<Auth.Screen name='signUp' component={SignUp} />
		</Auth.Navigator>
	)
}
