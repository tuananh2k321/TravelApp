import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, View, Text } from 'react-native';
import { COLOR, ICON } from "../constant/Themes";
import Favorite from "./TabApp/Favorite";
import Home from "./TabApp/Home";
import Notification from "./TabApp/Notification";
import Profile from "./TabApp/Profile";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
          screenOptions={
            ({ route }) => ({
              tabBarIcon: ({ focused, label }) => {
    
                let iconName = focused
                if (route.name === 'Home') {
                  iconName = focused ? ICON.home_d : ICON.home
                  label = 'Home'
                } else if (route.name === 'Favorite') {
                  iconName = focused ? ICON.heart_d : ICON.heart;
                  label = 'Favorites'
                } else if (route.name === 'Notification') {
                  iconName = focused ? ICON.notification_d : ICON.notification;
                  label = 'Notification'
                } else if (route.name === 'Profile') {
                  iconName = focused ? ICON.user_d : ICON.user;
                  label = 'Profile'
                }
                
                // You can return any component that you like here!
                return <View style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80
                }}>
                  <Image source={iconName}
                    style={{
                      width: 30, height: 30, resizeMode: 'stretch',
                      tintColor: focused ? COLOR.primary : COLOR.detail
                    }} />
                  <Text style={{
                    color: focused ? COLOR.primary : COLOR.detail,
    
                  }}>{label}</Text>
                </View>;
              },
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: {
                height: 70,
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