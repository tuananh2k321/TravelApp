import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, FlatList } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLOR, SIZES } from '../../../constant/Themes'
import { useSelector } from 'react-redux'
import AxiosIntance from '../../../constant/AxiosIntance';
import Item_Booking from '../../../component/Tab_item/Item_Booking'
import { useIsFocused } from '@react-navigation/core'

import Loading from '../../Loading'

const CancelMyBooking = (props) => {
    const { navigation, route } = props;
    const [dataMyBooking, setDataMyBooking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();
    const getNews = async () => {
        try {
            const response = await AxiosIntance().get("/booking/api/get-canceled-booking-app?idUser=" + user.user._id);
            console.log("CHeck response cancel my booking >>>>>>>> ", response)
            setDataMyBooking(response.canceledBooking);
            setIsLoading(false);
        } catch (error) {
            console.log("errr", error)
        }

    }

    useEffect(() => {

        getNews();

    }, [isFocused]);


    const handleRefresh = () => {
        setRefreshing(true);

        // Thực hiện các công việc làm mới dữ liệu ở đây, sau đó cập nhật state data

        // Ví dụ: Sau 2 giây, dừng làm mới và cập nhật dữ liệu

        getNews()
        setRefreshing(false);

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

export default CancelMyBooking

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

