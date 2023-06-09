import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../HomeScreen'
import AppLoader from '../AppLoader'
import SplashScreen from '../SplashScreen'
import OnboardingStart from '../OnboardingStart'

const Stack = createNativeStackNavigator();
const screenOptionStyle = {
    headerShown: false,
  };

  const MainNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={screenOptionStyle}
          initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            options={{animationEnabled: false, header: () => null}}
            component={SplashScreen}
          />
          <Stack.Screen
            name="Home"
            options={{
              animationEnabled: true,
              header: () => null,
              navigationOptions: {header: null},
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Onboarding"
            options={{animationEnabled: true, header: () => null}}
            component={OnboardingStart}
          />
     
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default MainNavigator;