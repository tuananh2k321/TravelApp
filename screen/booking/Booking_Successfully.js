import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const Booking_Successfully = (props) => {
    const {navigation} = props;
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0FA3E2', '#49C9FF']} style={{ flex: 2 }}>
                <View style={styles.group_Content}>
                    <Image style={styles.image} source={require('../../assets/logo/logo.png')} />
                    <Text style={styles.title}>Đặt Trước</Text>
                    <Text style={[styles.title, { fontSize: 37 }]}>Thành Công</Text>
                    <Text style={styles.content}>Chuẩn bị sẵn sàng mọi thứ trước ngày đi của bạn</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BottomTab')}>
                    <Text style={styles.textButton}>Quay lại trang chủ</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default Booking_Successfully

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0FA3E2',
        position: 'relative',
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        lineHeight: 48,
        letterSpacing: -0.17,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    content: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: -0.17,
        textAlign: 'center',
        color: "#FFFFFFCC"
    },
    image: {
        width: 111,
        height: 108,
        marginTop: 250,
        marginBottom: 19
    },
    group_Content: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        position: 'absolute',
        bottom: 44,
        left: 40,
        right: 40,
        height: 52,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    },
    textButton: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 52,
        letterSpacing: -0.17,
        textAlign: 'center',
        color: "#000000"
    }
})