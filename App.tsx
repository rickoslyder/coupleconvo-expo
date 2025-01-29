import { StatusBar } from 'expo-status-bar';
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import HomeScreen from './src/screens/HomeScreen';
    import SettingsScreen from './src/screens/SettingsScreen';
    import QuestionScreen from './src/screens/QuestionScreen';
    import ProfileScreen from './src/screens/ProfileScreen';
    import QuestionHistoryScreen from './src/screens/QuestionHistoryScreen';
    import DoYouStillScreen from './src/screens/DoYouStillScreen';

    const Stack = createNativeStackNavigator();

    export default function App() {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'CoupleConvo' }}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Question" component={QuestionScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="QuestionHistory" component={QuestionHistoryScreen} />
            <Stack.Screen name="DoYouStill" component={DoYouStillScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      );
    }
