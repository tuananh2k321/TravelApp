import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, FlatList } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLOR, SIZES } from '../../../constant/Themes'
import { useSelector } from 'react-redux'
import AxiosIntance from '../../../constant/AxiosIntance';
import Item_Booking from '../../../component/Tab_item/Item_Booking'
import Loading from '../../Loading'

const HandleCancelBooking = (props) => {
    const { navigation, route } = props;
    const [dataMyBooking, setDataMyBooking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const [refreshing, setRefreshing] = useState(false);



    const getNews = async () => {
        try {
            const response = await AxiosIntance().get("/booking/api/get-handle-cancel-booking-app?idUser=" + user.user._id);
            console.log("CHeck response ", response)
            setDataMyBooking(response.newBookings);
            setIsLoading(false);
        } catch (error) {
            console.log("errr", error)
        }

    }

    useEffect(() => {

        getNews();

    }, []);


    const handleRefresh = () => {
        setRefreshing(true);

        // Thực hiện các công việc làm mới dữ liệu ở đây, sau đó cập nhật state data

        // Ví dụ: Sau 2 giây, dừng làm mới và cập nhật dữ liệu

        getNews()
        setRefreshing(false);

    };

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
                isLoading == true ? (<Loading />) :
                    (

                        <View>
                            <View style={styles.wishlist_list}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={dataMyBooking}
                                    onRefresh={handleRefresh}

                                    refreshing={refreshing}
                                    renderItem={({ item }) => <Item_Booking item={item} navigation={navigation} route={route} />}
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
                        </View>
                    )
            }

        </SafeAreaView>
    )
}

export default HandleCancelBooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        width: SIZES.width,
        backgroundColor: COLOR.white,
    },
    wishlist: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 38,
        color: '#000000'
    },
    wishlist_list: {
        display: 'flex',
        flexDirection: 'column',
    },

})

