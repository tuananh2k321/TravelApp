import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLOR, SIZES } from '../../../constant/Themes'
import { useSelector } from 'react-redux'
import AxiosIntance from '../../../constant/AxiosIntance';
import Item_Booking from '../../../component/Tab_item/Item_Booking'
import Loading from '../../Loading'

const Mybooking = (props) => {
    const { navigation } = props;
    const [dataMyBooking, setDataMyBooking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    useEffect(() => {
        const getNews = async () => {
            const response = await AxiosIntance().get("/booking/api/getListBooking?userID=" + user.user._id);
            setDataMyBooking(response.booking);
            setIsLoading(false);
        }
        getNews();
        return () => {

        }
    }, []);

    const onDeleteBooking = (bookingID) => {
        return Alert.alert(
            "Gỡ thẻ?",
            "Bạn có chắc chắn muốn gỡ thẻ này không?",
            [
                // The "Yes" button
                {
                    text: "Có",
                    onPress: async () => {
                        const response = await AxiosIntance().delete("/booking/api/deleteBooking/" + bookingID);
                        navigation.push("Mybooking");
                    }

                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Không",
                },
            ]
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading == true ? (<Loading/>) :
                (<View>
                    <View style={styles.wishlist_list}>
                        <SwipeListView style={{ bottom: 20 }}
                            showsVerticalScrollIndicator={false}
                            data={dataMyBooking}
                            renderItem={({ item }) => <Item_Booking item={item} />}
                            renderHiddenItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => { onDeleteBooking(item._id) }}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        width: 75,
                                        height: 80,
                                        backgroundColor: '#FFFFFF',
                                        marginTop: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Ionicons name='trash' size={30} color={"red"} />
                                </TouchableOpacity>
                            )}
                            rightOpenValue={-75}
                            keyExtractor={item => item._id}
                        />
    
                    </View>
                </View>)
            }
            
        </SafeAreaView>
    )
}

export default Mybooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        width: SIZES.width,
        backgroundColor: COLOR.white,
        paddingBottom: 50
    },
    wishlist: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 38,
        color: '#000000'
    },
    wishlist_list: {
        marginTop: 33,
        display: 'flex',
        flexDirection: 'column',
    },

})

const data = [
    {
        title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start: 4,
        view: 100,
        image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days: '2 ngay 1 dem',
        price: 10,
        address: 'songlong'
    },
    {
        title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start: 3,
        view: 100,
        image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days: '2 ngay 1 dem',
        price: 10,
        address: 'songlong'
    },
    {
        title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start: 2,
        view: 100,
        image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days: '2 ngay 1 dem',
        price: 10,
        address: 'songlong'
    },
    {
        title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start: 1,
        view: 100,
        image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days: '2 ngay 1 dem',
        price: 10,
        address: 'songlong'
    },
    {
        title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start: 4.8,
        view: 100,
        image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days: '2 ngay 1 dem',
        price: 10,
        address: 'songlong'
    },

]