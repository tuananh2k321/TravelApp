import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, Button } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Calendar from "react-native-calendar-range-picker";


const CUSTOM_LOCALE = {
    monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    ],
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
    year: '', // letter behind year number -> 2020{year}
  }

  ShowCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    Alert.alert(year + '-' + month + '-' + date);
    // You can turn it in to your desired format
    //return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
}
const Available_Date = (props) => {
    const {navigation} = props;

    return (
        <View style={styles.container}>
            <View style={styles.groupHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.header}>Ngày có sẵn</Text>
            </View>
            <Text style={styles.title}>Chọn đặt phòng của bạn</Text>
            <Calendar style={{
                todayColor: 'blue',
                selectedDayBackgroundColor: '#0FA3E2',
                selectedBetweenDayBackgroundTextColor: '#99E1FF',
            }}
                locale={CUSTOM_LOCALE}
                startDate = "2023-07-01"
                endDate ="2023-07-12"
                onChange={({ startDate, endDate }) => console.log({ startDate, endDate })}
            />

            <View style={styles.groupButton}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#F3F3F3' }]}
                                    onPress={() => navigation.goBack()}>
                    <Text style={[styles.textButton, { color: '#797979' }]}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detail_Booking')}>
                    <Text style={styles.textButton}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>

        </View>



    )
}

export default Available_Date

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 15,
    },
    groupHeader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 18,
        color: '#000000',
        marginStart: 30
    },
    button: {
        width: 161,
        height: 52,
        borderRadius: 15,
        backgroundColor: '#0FA3E2',
    },
    textButton: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 52,
        letterSpacing: -0.17,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    groupButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
        paddingVertical: 11,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        color: '#000000',
        marginTop: 50,
        marginBottom: 15,
    }


})