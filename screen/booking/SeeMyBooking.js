import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    TextInput,

} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOR } from '../../constant/Themes';
import { useState } from 'react';
import { useEffect } from 'react';
import AxiosIntance from '../../constant/AxiosIntance';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { Button } from 'react-native-vector-icons/dist/FontAwesome';
import { ScrollView } from 'react-native-virtualized-view';
const SeeMyBooking = ({ navigation, route }) => {
    console.log('route >>>>>', route)
    const { id } = route.params
    console.log('id', id)

    const [bookings, setGetBookings] = useState([])
    const [guestInfo, setGuestInfo] = useState([])

    const [showAlert, setShowAlert] = useState(false);



    useEffect(() => {

        const getMyBooking = async () => {
            try {
                const response = await AxiosIntance().get(`booking/api/getBookingById?id=${id}`,)
                console.log('response >>>>>>>>>>>', response)
                if (response.result == true) {
                    setGetBookings(response.booking)
                    setGuestInfo(response.booking.guestInfo)
                    // console.log('>>>>>> booking', bookings)
                    // console.log('>>>>>> setGuestInfo', guestInfo)
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        getMyBooking()
    }, [])
    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Loại vé: </Text>
                    <Text style={styles.sectionText}>{item.type}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tên: </Text>
                    <Text style={styles.sectionText}>{item.name}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Năm sinh: </Text>
                    <Text style={styles.sectionText}>{item.birthDate}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Giới tính: </Text>
                    <Text style={styles.sectionText}>{item.gender}</Text>
                </View>

            </View>
        );
    };


    const handlePress = () => {
        if (!bookings.confirm) {
            navigation.navigate('Reason', { id: bookings._id });
        }
    };

    return (
        <>
            <ScrollView>
                <SafeAreaView>
                    <View style={styles.header}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                            <TouchableOpacity onPress={() => navigation.pop()}>
                                <Entypo name="chevron-small-left" size={30} color={COLOR.black} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', color: '#0FA3E2' }}>Chi Tiết</Text>
                            <View style={{ marginEnd: 20 }} />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 15 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: COLOR.black, fontSize: 20, fontWeight: '400' }}>Tên: </Text>
                            <Text style={{ color: COLOR.lightBlack1, fontSize: 18 }}>{bookings.name}</Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>

                            <Text style={{ color: COLOR.black, fontSize: 15, fontWeight: '400' }}>Số lượng trẻ em :</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{bookings.children}</Text>

                            <Text style={{ color: COLOR.black, fontSize: 15, fontWeight: '400', marginLeft: 20 }}>Số lượng người lớn :</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{bookings.adult}</Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: COLOR.black, fontSize: 16, fontWeight: '400' }}>Tổng tiền:   </Text>
                            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{bookings.totalPrice}</Text>
                        </View>

                        {bookings.confirm ? (
                            <Text style={{ color: "red" }}>
                                Đã xác nhận
                            </Text>
                        ) : (
                            <View>
                                <Text style={{ color: "black", fontWeight: "bold", marginVertical: 15 }}>
                                    Chưa xác nhận
                                </Text>

                            </View>
                        )}

                        <View style={styles.container}>
                            {guestInfo && guestInfo.length > 0 ? (
                                <FlatList
                                    data={guestInfo}
                                    keyExtractor={(item) => item._id}
                                    renderItem={renderItem}
                                    contentContainerStyle={styles.itemContainer}
                                />
                            ) : (
                                <View >
                                    <Text style={{ color: "black", fontWeight: "bold" }}>Chưa có thông tin</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </SafeAreaView>

            </ScrollView>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 25,
                    position: "absolute",
                    bottom: 10,
                    right: 0,

                }}>
                <TouchableOpacity
                    onPress={handlePress}
                    style={{ flex: 1, marginRight: 10 }}
                    disabled={bookings.confirm} // Disable the TouchableOpacity if confirmed
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: COLOR.border,
                            backgroundColor: bookings.confirm ? 'grey' : 'red', // Change background color based on confirm status
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            opacity: bookings.confirm ? 0.5 : 1, // Change opacity if confirmed
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: bookings.confirm ? 'black' : 'white', // Change text color based on confirm status
                            }}
                        >
                            {bookings.confirm ? 'Đã xác nhận' : 'Hủy'}
                        </Text>
                    </View>
                </TouchableOpacity>



                <TouchableOpacity
                    onPress={() => navigation.navigate("TourDetail", { id: bookings.tour_id })}
                    style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: COLOR.border,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            backgroundColor: COLOR.primary,
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>Chi Tiết Tour</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </>
    )
}

export default SeeMyBooking

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        borderColor: COLOR.detail,
        borderWidth: 0.5
    },
    itemContainer: {
        paddingHorizontal: 10, // Adjust the horizontal spacing between items
    },
    section: {
        flexDirection: "row",
        marginBottom: 5,
    },
    sectionTitle: {
        color: "black",
        fontWeight: 'bold',
    },
    sectionText: {
        fontSize: 16,
        color: COLOR.black
    },
});