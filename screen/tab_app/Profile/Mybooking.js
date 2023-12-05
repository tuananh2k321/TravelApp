import { StyleSheet, Text, View,  } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ConfirmedMyBooking from './ConfirmedMyBooking';
import HandlingMyBooking from './HandlingMyBooking';
import { COLOR } from '../../../constant/Themes';
const Tab = createMaterialTopTabNavigator();

export default function Mybooking(props) {
    const { navigation } = props;
    return (

        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '500',
                    textTransform: 'none',
                },
                tabBarItemStyle: { width: 200 },
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    tabBarActiveTintColor: COLOR.black, // Màu văn bản khi focus
                    tabBarActiveBackgroundColor: COLOR.black,
                },
                tabBarActiveTintColor: COLOR.black, // Màu văn bản khi focus
                tabBarActiveBackgroundColor: COLOR.black,
            }}
        >
            <Tab.Screen name="Tour đang chờ xử lí" component={HandlingMyBooking}>

            </Tab.Screen>
            <Tab.Screen name="Tour đã xác nhận" component={ConfirmedMyBooking}>

            </Tab.Screen>

        </Tab.Navigator>

    )
}

const styles = StyleSheet.create({})