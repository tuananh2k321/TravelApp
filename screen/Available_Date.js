import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, Button } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CalendarList } from 'react-native-calendars';
import { MaterialDatetimePickerAndroid } from 'react-native-material-datetime-picker';
import RNMaterialDatetimePicker from 'react-native-material-datetime-picker';
import Calendar from "react-native-calendar-range-picker";
const Available_Date = () => {


    return (
        <View style={styles.container}>
            <View style={styles.groupHeader}>
                <Ionicons name="arrow-back" size={20} color="#000000" />
                <Text style={styles.header}>Ngày có sẵn</Text>
            </View>
            <Text style={styles.title}>Chọn đặt phòng của bạn</Text>
            <Calendar style={{
                todayColor: 'blue',
                selectedDayBackgroundColor: '#0FA3E2',
                selectedBetweenDayBackgroundTextColor: '#99E1FF',
            }}
                startDate="2023-05-05"
                endDate="2023-05-12"
                onChange={({ startDate, endDate }) => console.log({ startDate, endDate })}
            />

            <View style={styles.groupButton}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#F3F3F3' }]}>
                    <Text style={[styles.textButton, { color: '#797979' }]}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
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
        fontSize: 12,
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