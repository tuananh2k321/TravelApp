import { FlatList, ScrollView, TouchableOpacity, } from "react-native"
import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput } from "react-native"
import { SIZES } from "../../../constant/Themes";

import ItemPopular from "../../../component/Tab_item/ItemPopular";
import ItemMenu from "../../../component/Tab_item/ItemMenu";

import AxiosIntance from '../../../constant/AxiosIntance';

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";


// const disPath = useDispatch()







export default function Home(props) {
    const { navigation } = props;


    const [TourAll, setTourAll] = useState([]);
    useEffect(() => {
        try {
            const getTourAll = async () => {
            const respone = await AxiosIntance().get("tour/api/get-all-tour");
            if (respone.result) {
                setTourAll(respone.tours);
                
            } else {
                ToastAndroid.show("Lấy dữ liệu không ok", ToastAndroid.SHORT)
            }
        }
        getTourAll();

        return () => { }
        } catch (error) {
            console.log('errrrrrrror', error)
        }
        
    }, []);

    const [TourRating, setTourRating] = useState([])
    useEffect(() => {
        try {
            const getTourRating = async () => {
            const respone = await AxiosIntance().get("tour/api/tourRating");
            if (respone.result) {
                setTourRating(respone.tours);
                
            } else {
                ToastAndroid.show("Lấy dữ liệu không ok", ToastAndroid.SHORT)
            }
        }
        getTourRating();

        return () => { }
        } catch (error) {
            console.log('errrrrrrror', error)
        }
        
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <Image style={styles.image_logo} source={require('../../../assets/image/anhbien.jpg')} />
                    <Text style={styles.txt1}>Khám phá thế giới {"\n"}hôm nay</Text>
                    <Text style={styles.txt2}>{<Text style={{ fontWeight: 'bold' }}>Khám phá</Text>} - du lịch đến muôn nơi</Text>
                    <TextInput style={styles.txtsearch}></TextInput>
                    <View style={styles.press_menu}>
                        <FlatList
                            horizontal
                            data={menu}
                            renderItem={({ item }) => <ItemMenu menud={item} />}
                            keyExtractor={item => item._id}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={styles.txtpack1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Gói phổ biến</Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#0FA3E2', fontSize: 18, fontWeight: 'bold' }}>See more</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <FlatList style={{ marginTop: 7 }}
                        horizontal
                        data={popular}
                        renderItem={({ item }) => <ItemPopular dulieu={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                    /> */}
                </View>

                <View style={styles.txtpack1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Tour đánh giá cao</Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#0FA3E2', fontSize: 18, fontWeight: 'bold' }}>See more</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList style={{ marginTop: 7 }}
                        horizontal
                        data={TourRating}
                        renderItem={({ item }) => <ItemPopular dulieu={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.txtpack1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Tất cả Tour</Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#0FA3E2', fontSize: 18, fontWeight: 'bold' }}>See more</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <FlatList style={{ marginTop: 7 }}
                        horizontal
                        data={TourAll.slice(0, 6)}
                        renderItem={({ item }) => <ItemPopular dulieu={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                    /> */}
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}



const styles = StyleSheet.create({
    slider: {
        width: SIZES.width,
        height: SIZES.height * 0.25,
        padding: 10
    },
    reviewImage2: {
        width: SIZES.width - 20,
        height: SIZES.height * 0.25 - 10,
    },
    slideDot: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center'
    },
    dotActive: {
        color: 'black',
        margin: 3
    },
    dot: {
        color: 'white',
        margin: 3
    },
    image_logo: {
        height: SIZES.height * 0.4,
        width: SIZES.width
    },
    txt1: {
        position: "absolute",
        color: "white",
        fontSize: 35,
        fontWeight: 'bold',
        top: 35,
        left: 25
    },
    txt2: {
        color: 'white',
        position: 'absolute',
        top: 120,
        left: 25
    },
    txtsearch: {
        width: 350,
        height: 50,
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 20,
        left: 25,
        bottom: 90
    },
    press_menu: {
        width: 390,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    txtpack1: {
        margin: 24
    }
})


const menu = [
    {
        _id: 1,
        image: "https://cdn-icons-png.flaticon.com/128/9791/9791716.png",
        title: 'Khách sạn'
    },
    {
        _id: 2,
        image: "https://cdn-icons-png.flaticon.com/128/5269/5269011.png",
        title: 'Chuyến bay'
    },
    {
        _id: 3,
        image: "https://cdn-icons-png.flaticon.com/128/8108/8108991.png",
        title: 'Vé thưởng'
    },
    {
        _id: 4,
        image: "https://cdn-icons-png.flaticon.com/128/9325/9325671.png",
        title: 'Tour'
    }
]
