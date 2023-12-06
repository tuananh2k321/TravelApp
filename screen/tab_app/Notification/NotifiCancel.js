import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useEffect } from 'react';
import Loading from '../../Loading';
import ItemComment from '../../../component/Tab_item/ItemComment';
import { useState } from 'react';
import AxiosIntance from '../../../constant/AxiosIntance';
import { COLOR } from '../../../constant/Themes';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
const NotifiCancel = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    console.log("notifi-cancel: ", params.id)
    const [dataTour, setDataTour] = useState()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getTour = async () => {
            const response = await AxiosIntance().get(
                'tour/api/' + params.id + '/detail',
            );
            if (response.result) {
                console.log(response.tour)
                setDataTour(response.tour)
                setLoading(false)
            } else {
                console.log('get tour failed')
            }
        }
        getTour()
    }, [])
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.pop()}
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 50,
                    backgroundColor: COLOR.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <FontAwesome5 name={'arrow-left'} size={16} color="#000000" />
            </TouchableOpacity>
            <View style={styles.group_Content}>
                <Image style={styles.image} source={require('../../../assets/logo/logo.png')} />
                <Text style={styles.title}>Hủy Tour</Text>
                <Text style={[styles.title, { fontSize: 37 }]}> Thành Công</Text>
                <Text style={styles.content}>Bạn sớm đặt lại tour nhé !</Text>
            </View>
            <ItemComment data={dataTour} navigation={navigation} />

        </View>
    )
}

export default NotifiCancel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',



        padding: 15
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        lineHeight: 48,
        letterSpacing: -0.17,
        textAlign: 'center',
        color: 'black'
    },
    content: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: -0.17,
        textAlign: 'center',
        color: "black"
    },
    image: {
        width: 111,
        height: 108,
        marginTop: 100,
        marginBottom: 19,
        tintColor: COLOR.primary
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
        color: COLOR.primary
    }
})