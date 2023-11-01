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
import * as Animatable from 'react-native-animatable';
import HotelDetail from './tab_app/Home/HotelDetail';
import DestinationDetail from './tab_app/Home/DestinationDetail';
import TourGuideDetail from './tab_app/Home/TourGuideDetail';
import SearchTourName from './tab_app/Home/SearchTourName';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// animated
const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  0.5: {
    opacity: 1,
    scale: 0.3,
  },
  1: {
    opacity: 0,
    scale: 0,
  },
};

const StackHomes = () => {
  return (
    <Stack.Navigator initialRouteName="HomeMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="TourDetail" component={TourDetail} />
      <Stack.Screen name="HotelDetail" component={HotelDetail} />
      <Stack.Screen name="DestinationDetail" component={DestinationDetail} />
      <Stack.Screen name="TourGuideDetail" component={TourGuideDetail} />
      <Stack.Screen name="SearchTourName" component={SearchTourName} />
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
              width: '100%',
              borderBottomColor: focused ? COLOR.primary : 'white',
              borderRightColor: 'white',
              borderLeftColor: 'white',
              borderTopColor: 'white',
              borderWidth: focused ? 4 : 0,
              backgroundColor: 'white'
              // position: 'absolute',
              // bottom: 0
            }}>
              {
                focused ? <Animatable.Image 
                animation={'slideInUp'}
                source={iconName}
                style={{
                  width: 25, height: 25, resizeMode: 'stretch',
                  tintColor: focused ? COLOR.primary : COLOR.detail
                }} />
                :
                <Image 
                
                source={iconName}
                style={{
                  width: 25, height: 25, resizeMode: 'stretch',
                  tintColor: focused ? COLOR.primary : COLOR.detail
                }} />
              }
                
              {
                  focused ? <Animatable.Text 
                    animation={'slideInUp'}
                    style={{
                      color: focused ? COLOR.primary : COLOR.detail,
                      fontWeight: 'bold',
                    }}>{label}</Animatable.Text>
                  : 
                  <Text 
                    style={{
                      color: focused ? COLOR.primary : COLOR.detail,
                      display: 'none'
                    }}>{label}</Text>

              }
              

              {/* <View style={{
                width: '80%',
                height: 4,
                
                borderRadius: 48,
                backgroundColor: focused ? COLOR.primary : null
              }} /> */}

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