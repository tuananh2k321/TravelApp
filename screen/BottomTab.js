import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, View, Text } from 'react-native';
import { COLOR, ICON } from "../constant/Themes";
import Favorite from "./tab_app/Favorite/Favorite";
import Home from "./tab_app/Home/Home";
import Notification from "./tab_app/Notification/Notification";
import Profile from "./tab_app/Profile/Profile";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TourDetail from './tab_app/Home/TourDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackHomes = () => {
  return (
    <Stack.Navigator initialRouteName="HomeMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="TourDetail" component={TourDetail} />
    </Stack.Navigator>
  )
}

const StackFavorites = () => {
  return (
    <Stack.Navigator initialRouteName="FavoriteMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoriteMain" component={Favorite} />
    </Stack.Navigator>
  )
}


const StackNotification = () => {
  return (
    <Stack.Navigator initialRouteName="NotificationMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotificationMain" component={Notification} />
    </Stack.Navigator>
  )
}

const StackProfile = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={Profile} />
    </Stack.Navigator>
  )
}

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, label }) => {

            let iconName = focused
            if (route.name === 'Home') {
              iconName = ICON.home
              label = 'Home'
            } else if (route.name === 'Favorite') {
              iconName = ICON.heart;
              label = 'Favorite'
            } else if (route.name === 'Notification') {
              iconName = ICON.notification_d;
              label = 'Notification'
            } else if (route.name === 'Profile') {
              iconName = ICON.user;
              label = 'Profile'
            }

            // You can return any component that you like here!
            return <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              position: 'absolute',
              bottom: 0
            }}>
              <Image source={iconName}
                style={{
                  width: 25, height: 25, resizeMode: 'stretch',
                  tintColor: focused ? COLOR.primary : COLOR.detail
                }} />
              <Text style={{
                color: focused ? COLOR.primary : COLOR.detail,

              }}>{label}</Text>

              <View style={{
                width: '80%',
                height: 4,
                marginTop: 5,
                borderRadius: 48,
                backgroundColor: focused ? COLOR.primary : null
              }} />

            </View>;
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 67,
          },
        })}
    >
      <Tab.Screen name="Home" component={StackHomes} />
      <Tab.Screen name="Favorite" component={StackFavorites} />
      <Tab.Screen name="Notification" component={StackNotification} />
      <Tab.Screen name="Profile" component={StackProfile} />
    </Tab.Navigator>
  );
}

export default BottomTab