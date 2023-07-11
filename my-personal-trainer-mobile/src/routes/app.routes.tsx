import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppointmentCreated from '../screens/AppointmentCreated';
import ClientAppointments from '../screens/ClientAppointments';
import CreateAppointment from '../screens/CreateAppointment';

import {Dashboard} from '../screens/Dashboard';
import ForgotPassword from '../screens/ForgotPassword';
import Profile from '../screens/Profile';

const App = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
	<App.Navigator
		screenOptions={{
			headerShown: false,
			contentStyle: {backgroundColor: '#312e38'},
		}}
	>
		<App.Screen name="Dashboard" component={Dashboard} />
		<App.Screen name="Profile" component={Profile} />
		<App.Screen name="CreateAppointment" component={CreateAppointment} />
		<App.Screen name="ClientAppointments" component={ClientAppointments} />
		<App.Screen name="AppointmentCreated" component={AppointmentCreated} />
	</App.Navigator>

);

export default AppRoutes;

