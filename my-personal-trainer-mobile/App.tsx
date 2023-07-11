import {RobotoSlab_500Medium, RobotoSlab_400Regular, RobotoSlab_700Bold} from '@expo-google-fonts/roboto-slab'
import {useFonts} from 'expo-font';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {StatusBar, View} from 'react-native';
import Routes from './src/routes';
import {NavigationContainer} from '@react-navigation/native';
import AppProvider from './src/hooks';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {

	const [fontsLoaded] = useFonts({
		RobotoSlab_400Regular,
		RobotoSlab_500Medium,
		RobotoSlab_700Bold
	})

	if (!fontsLoaded) {
		return null
	}


	return (
		<NavigationContainer>
			<StatusBar barStyle="light-content" backgroundColor="#312e38" />
			<AppProvider>
				<GestureHandlerRootView style={{flex: 1, backgroundColor: '#312e38'}}>
					<Routes />
				</GestureHandlerRootView>
			</AppProvider>
		</NavigationContainer>
	);
}


