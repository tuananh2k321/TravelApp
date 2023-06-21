import { FlatList, ScrollView, TouchableOpacity, } from "react-native"
import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput } from "react-native"
import { SIZES } from "../../../constant/Themes";


import { SliderBox } from "react-native-image-slider-box";
import ItemPopular from "../../../component/Tab_item/ItemPopular";
import ItemMenu from "../../../component/Tab_item/ItemMenu";

this.state ={
    images : [
        'https://cdn.pixabay.com/photo/2018/01/04/07/59/salt-harvesting-3060093_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/10/12/03/03/view-2843338_1280.jpg',
        'https://cdn.pixabay.com/photo/2021/08/04/03/06/hanoi-6520941_1280.jpg',
        'https://cdn.pixabay.com/photo/2021/08/26/15/18/mountain-6576362_1280.jpg',
        'https://cdn.pixabay.com/photo/2017/03/15/08/47/vietnam-2145504_1280.jpg',
    ]
} 


export default function Home(props) {
    const { navigation } = props;

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
                {/* <View style={styles.slider}>
                    <SliderBox
                        images={this.state.images}/>
                </View> */}

                <View style={styles.txtpack1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Gói phổ biến</Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#0FA3E2', fontSize: 18, fontWeight: 'bold' }}>See more</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList style={{ marginTop: 7 }}
                        horizontal
                        data={popular}
                        renderItem={({ item }) => <ItemPopular dulieu={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.txtpack1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Gói mở rộng</Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#0FA3E2', fontSize: 18, fontWeight: 'bold' }}>See more</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList style={{ marginTop: 7 }}
                        horizontal
                        data={explore}
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

const popular = [{
    "_id": 1,
    "image": "https://statics.vinpearl.com/hu%E1%BA%BF_1661248551.jpg",
    "title": "Du lịch Huế",
    "review": 252,
    "detail": "Human Resources"
}, {
    "_id": 2,
    "image": "https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg",
    "title": "Du lịch Vịnh Hạ Long",
    "review": 375,
    "detail": "Business "
}, {
    "_id": 3,
    "image": "https://statics.vinpearl.com/nha-trang-beaches-banner%20-%20Copy_1661247069.jpg",
    "title": "Du lịch Nha Trang",
    "review": 167,
    "detail": "Accounting"
}, {
    "_id": 4,
    "image": "https://statics.vinpearl.com/diem-du-lich-04_1648302905.jpg",
    "title": "Du lịch Hội An",
    "review": 311,
    "detail": "Research an"
}, {
    "_id": 5,
    "image": "https://statics.vinpearl.com/b%C3%A1n%20%C4%91%E1%BA%A3o%20s%C6%A1n%20tr%C3%A0_1661247495.jpg",
    "title": "Du lịch Đà Nẵng",
    "review": 459,
    "detail": "Marketing"
}]
const explore = [{
    "_id": 1,
    "image": "https://statics.vinpearl.com/%C4%90%E1%BB%89nh-phanxipang_1661249040.jpg",
    "title": "Du lịch Sapa",
    "review": 312,
    "detail": "Engineering"
}, {
    "_id": 2,
    "image": "https://statics.vinpearl.com/Hinh-anh-Da-Lat-dep-mong-mo_1661248995.jpeg",
    "title": "Du lịch Đà Lạt",
    "review": 297,
    "detail": "Marketing"
}, {
    "_id": 3,
    "image": "https://statics.vinpearl.com/diem-du-lich-14_1632662986.jpg",
    "title": "Du lịch Mộc Châu",
    "review": 400,
    "detail": "Engineering"
}]


