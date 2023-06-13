import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, View, Text } from 'react-native';
import { COLOR, ICON } from "../constant/Themes";
import Favorite from "./tab_app/Favorite";
import Home from "./tab_app/Home";
import Notification from "./tab_app/Notification";
import Profile from "./tab_app/Profile";

const Tab = createBottomTabNavigator();

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
                  width: 30, height: 30, resizeMode: 'stretch',
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTab