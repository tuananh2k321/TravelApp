import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { COLOR, ICON } from "../constant/Themes";
import Favorite from "./tab_app/Favorite/Favorite";
import Home from "./tab_app/Home/Home";
import Notification from "./tab_app/Notification/Notification";
import Profile from "./tab_app/Profile/Profile";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TourDetail from './tab_app/Home/TourDetail';
import * as Animatable from 'react-native-animatable';
import HotelDetail from './tab_app/Home/HotelDetail';
import DestinationDetail from './tab_app/Home/DestinationDetail';
import TourGuideDetail from './tab_app/Home/TourGuideDetail';
import SearchScreen from './tab_app/Home/SearchScreen';
import Detail_Booking from './booking/Detail_Booking';
import Payment from './booking/Payment';
import Payment_Method from './booking/Payment_Method';
import AddCard from './booking/AddCard';
import Available_Date from './booking/Available_Date';
import Booking_Successfully from './booking/Booking_Successfully';
import SearchTourName from './tab_app/Home/SearchTourName';
import Mybooking from './tab_app/Profile/Mybooking';
import Login from './auth/Login';
import Register from './auth/Register';

import EditProfile from './tab_app/Profile/EditProfile'
import Deal from './tab_app/Deal/Deal';
import AddComment from './comment/AddComment';

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
  const header = (title) => (
    {
      title: title,
      headerTitleAlign: "center",
      headerTitleStyle: {
        color: "#0FA3E2",
      },
      headerShown: true
    }
  )
  return (
    <Stack.Navigator initialRouteName="HomeMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="TourDetail" component={TourDetail} />
      <Stack.Screen name="HotelDetail" component={HotelDetail} />
      <Stack.Screen name="DestinationDetail" component={DestinationDetail} />
      <Stack.Screen name="TourGuideDetail" component={TourGuideDetail} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name='SearchTourName' component={SearchTourName}/>
      {/* stack booking */}
      <Stack.Screen name="Detail_Booking" component={Detail_Booking} options={header("Xác nhận đặt tour")} />
      <Stack.Screen name="Payment" component={Payment} options={header("Thanh Toán")} />
      <Stack.Screen name="Payment_Method" component={Payment_Method} options={header("Xác nhận và thanh toán")} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Available_Date" component={Available_Date} />
      <Stack.Screen name="Booking_Successfully" component={Booking_Successfully} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

const StackBooking = () => {
  return (
    <Stack.Navigator initialRouteName="Detail_Booking" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Detail_Booking" component={Detail_Booking} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Payment_Method" component={Payment_Method} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Available_Date" component={Available_Date} />
      <Stack.Screen name="Booking_Successfully" component={Booking_Successfully} />
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
    <Stack.Navigator initialRouteName="AddComment" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotificationMain" component={Notification} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AddComment" component={AddComment} />
    </Stack.Navigator>
  )
}

const StackProfile = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={Profile} />
      <Stack.Screen name="Mybooking" component={Mybooking} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
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
            } else if (route.name === 'Deal') {
              iconName = ICON.deal_d;
              label = 'Deal'
            }else if (route.name === 'Favorite') {
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
                    fontSize: 12
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
      <Tab.Screen name='Deal' component={Deal}/>
      <Tab.Screen name="Favorite" component={StackFavorites} />
      <Tab.Screen name="Notification" component={StackNotification} />
      <Tab.Screen name="Profile" component={StackProfile} />
    </Tab.Navigator>
  );
}

export default BottomTab