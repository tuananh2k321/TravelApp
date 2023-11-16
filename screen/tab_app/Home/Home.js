import { FlatList, ImageBackground, ScrollView, TouchableOpacity, ToastAndroid} from "react-native"
import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput } from "react-native"
import { SIZES } from "../../../constant/Themes";

import ItemPopular from "../../../component/Tab_item/ItemPopular";

import AxiosIntance from '../../../constant/AxiosIntance';

import { useDispatch, useSelector } from 'react-redux';
// import { setData } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import ImageOverlay from "react-native-image-overlay-prop-types-fixed";
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from "../../Loading";



export default function Home(props) {
    const { navigation } = props;

    const [loading, setLoading] = useState(false)
    const [TourRating, setTourRating] = useState([])
    const [TourBac, setTourBac] = useState([])
    const [TourTrung, setTourTrung] = useState([])
    const [TourNam, setTourNam] = useState([])

    useEffect(() => {
        try {
            const getTour = async () => {
                setLoading(true)
                const respone = await AxiosIntance().get("tour/api/list/tourRating");
                if (respone.result) {
                    setTourRating(respone.tours);
                    setLoading(false)
                } else {
                    ToastAndroid.show("Lấy dữ liệu không ok", ToastAndroid.SHORT)
                }
                const respone1 = await AxiosIntance().get("tour/api/listDomain/isdomain?keyword=Mien Bac");
                if (respone1.result) {
                    setTourBac(respone1.tours);
                    setLoading(false)
                } else {
                    ToastAndroid.show("Lấy dữ liệu không ok", ToastAndroid.SHORT)
                } const respone2 = await AxiosIntance().get("tour/api/listDomain/isdomain?keyword=Mien Trung");
                if (respone2.result) {
                    setTourTrung(respone2.tours);
                    setLoading(false)
                } else {
                    ToastAndroid.show("Lấy dữ liệu không ok", ToastAndroid.SHORT)
                }
                const respone3 = await AxiosIntance().get("tour/api/listDomain/isdomain?keyword=Mien Nam");
                if (respone3.result) {
                    setTourNam(respone3.tours);
                    setLoading(false)
                } else {
                    ToastAndroid.show("Lấy dữ liệu không ok", ToastAndroid.SHORT)
                }
            }
            getTour();

            return () => { }
        } catch (error) {
            console.log('errrrrrrror', error)
        }

    }, []);




    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (text) => {
        setSearchValue(text);
        // Xử lý tìm kiếm
    };

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{ flex: 1,  }}>
                <View>
                    <Image style={styles.image_logo} source={require('../../../assets/images/imgstart.jpg')} />
                    <Text style={styles.txt1}>Khám phá thế giới {"\n"}hôm nay</Text>
                    <Text style={styles.txt2}>{<Text style={{ fontWeight: 'bold' }}>Khám phá</Text>} - du lịch đến muôn nơi</Text>

                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Nhập từ khóa"
                            onChangeText={handleSearch}
                            value={searchValue}
                        />
                        <Icon name="search" size={20} color="gray" />
                    </View>
                </View>

                <View style={styles.txtpack1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Tour được yêu thích nhất</Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#0FA3E2', fontSize: 18, fontWeight: 'bold' }}>See more</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList style={{ marginTop: 10 }}
                        horizontal
                        data={TourRating.slice(0, 6)}
                        renderItem={({ item }) => <ItemPopular dulieu={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.txtpack1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Các tour đặc trưng trong khu vực</Text>
                    </View>
                    <View style={styles.viewOverlay}>
                        <ImageOverlay source={require('../../../assets/images/mienbac.png')}
                            title='Miền Bắc'
                            overlayAlpha={13}
                            contentPosition="bottom"
                            titleStyle={{ fontSize: 20, color: 'white', fontWeight: '500' }}
                            containerStyle={styles.imgoverlay} />

                        <View style={{ borderRadius: 20 }}>
                            <ImageBackground imageStyle={{ borderRadius: 20 }} style={{ justifyContent: 'center', width: 175, height: 185, alignItems: "center", }} source={require('../../../assets/images/mienbac1.jpg')}>
                                <TouchableOpacity style={styles.viewdomain} onPress={() => navigation.navigate('SearchTourName', { nameDomain: 'Hà Nội' })}>
                                    <Image style={styles.img_domain} source={require('../../../assets/images/hanoi.jpg')} />
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Hà Nội</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewdomain} onPress={() => navigation.navigate('SearchTourName', { nameDomain: 'Hải phòng' })}>
                                    <Image style={styles.img_domain} source={require('../../../assets/images/haiphong.png')} />
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Hải phòng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewdomain} onPress={() => navigation.navigate('SearchTourName', { nameDomain: 'Quảng Ninh' })}>
                                    <Image style={styles.img_domain} source={require('../../../assets/images/quangninh.jpg')} />
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Quảng Ninh</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    </View>
                    <FlatList style={{ marginTop: 10 }}
                        horizontal
                        data={TourBac}
                        renderItem={({ item }) => <ItemPopular dulieu={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}

                    />


                    <View style={styles.viewOverlay}>
                        <View style={{ justifyContent: 'center' }}>
                            <ImageBackground imageStyle={{ borderRadius: 20 }} style={{ justifyContent: 'center', width: 175, height: 185, alignItems: "center", }} source={require('../../../assets/images/mientrung2.png')}>
                                <TouchableOpacity style={styles.viewdomain} onPress={() => navigation.navigate('SearchTourName', { nameDomain: 'Đà Nẵng' })}>
                                    <Image style={styles.img_domain} source={require('../../../assets/images/danang.jpg')} />
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Đà Nẵng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewdomain} onPress={() => navigation.navigate('SearchTourName', { nameDomain: 'Nha Trang' })}>
                                    <Image style={styles.img_domain} source={require('../../../assets/images/nhatrang.jpg')} />
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Nha Trang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewdomain} onPress={() => navigation.navigate('SearchTourName', { nameDomain: 'Huế' })}>
                                    <Image style={styles.img_domain} source={require('../../../assets/images/hue.jpg')} />
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Huế</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>



                        <ImageOverlay source={require('../../../assets/images/mientrung.png')}
                            title='Miền Trung'
                            overlayAlpha={1}
                            contentPosition="bottom"
                            titleStyle={{ fontSize: 20, color: 'white', fontWeight: '500' }}
                            containerStyle={[styles.imgoverlay, { marginLeft: 10 }]} />
                    </View>
                    <FlatList style={{ marginTop: 10 }}
                        horizontal
                        data={TourTrung}
                        renderItem={({ item }) => <ItemPopular dulieu={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                    />


                    <View style={styles.viewOverlay}>
                        <ImageOverlay source={require('../../../assets/images/miennam.png')}
                            title='Miền Nam'
                            overlayAlpha={1}
                            contentPosition="bottom"
                            titleStyle={{ fontSize: 20, color: 'white', fontWeight: '500' }}
                            containerStyle={styles.imgoverlay} />
                        <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                            <ImageBackground imageStyle={{ borderRadius: 20 }} style={{ justifyContent: 'center', width: 175, height: 185, alignItems: "center", }} source={require('../../../assets/images/miennam1.jpg')}>
                                <TouchableOpacity style={styles.viewdomain} onPress={() => navigation.navigate('SearchTourName', { nameDomain: 'HCM' })}>
                                    <Image style={styles.img_domain} source={require('../../../assets/images/tphcm.jpg')} />
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>TP.HCM</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewdomain} onPress={() => navigation.navigate('SearchTourName', { nameDomain: 'Cần Thơ' })}>
                                    <Image style={styles.img_domain} source={require('../../../assets/images/cantho.png')} />
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Cần Thơ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewdomain} onPress={() => navigation.navigate('SearchTourName', { nameDomain: 'Vũng Tàu' })}>
                                    <Image style={styles.img_domain} source={require('../../../assets/images/vungtau.jpg')} />
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Vũng Tàu</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    </View>
                    <FlatList style={{ marginTop: 10 }}
                        horizontal
                        data={TourNam}
                        renderItem={({ item }) => <ItemPopular dulieu={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}

                    />
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}



const styles = StyleSheet.create({
    image_logo: {
        height: SIZES.height * 0.3,
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
    searchContainer: {
        width: 350,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchBar: {
        flex: 1,
        height: 40,
        marginLeft: 5,
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
        marginTop:15 ,
        marginStart: 15, marginEnd: 15
    },
    viewOverlay: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between',
    },
    imgoverlay: {
        width: 175,
        height: 185,
        borderRadius: 20
    },
    viewdomain: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 0.19,
        borderRadius: 9,
        width: 150,
        alignItems: 'center',
        borderColor: 'gray',
        marginVertical: 5,
    },
    img_domain: {
        width: 35,
        height: 35,
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        marginRight: 5
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
