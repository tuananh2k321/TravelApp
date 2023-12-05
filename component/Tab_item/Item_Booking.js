import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { ICON } from '../../constant/Themes';
import { useState } from 'react';
import { useEffect } from 'react';
import { Rating } from 'react-native-ratings';
import AxiosIntance from '../../constant/AxiosIntance';

const Item_Booking = (props) => {
    const { item, navigation, route } = props;
    const { params } = route;
    const dateReplace = (item.bookingDate);
    const [rating, setrating] = useState(0);
    let price = item.totalPrice;
    price = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    let dateSlice = "";
    if (dateReplace.length > 10) {
        dateSlice = dateReplace.slice(0, 10);
    } else {
        dateSlice = dateReplace;
    }
    let str = dateSlice;
    let arr = str.split('-');

    function getTotalDate(orders) {
        var tong = "";
        var ordersLength = orders.length;

        for (var i = ordersLength - 1; i >= 0; i--) {
            tong += orders[i] + "/";
        }
        return tong;
    }

    console.log('first>>>>>', item)
    getTotalDate(arr)

    useEffect(() => {
        try {
          const getAllReviews = async () => {
            const response = await AxiosIntance().get(
              `comment/api/listComment?tour_id=${item.tour_id._id}`,
            );
            if (response.result == true) {
              //setReviews(response.quantity);
              //console.log(response.quantity)
              setrating(response.averageRating)
              //console.log(response.averageRating)
            } else {
              ToastAndroid.show('Lấy dữ liệu không ok', ToastAndroid.SHORT);
            }
          };
          getAllReviews()
        } catch (e) {
    
        }
      })
    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate("SeeMyBooking", { id: item._id })}>
                <View style={styles.item}>
                    <Image style={styles.item_left} source={{ uri: item.tour_id.tourImage[0] }}></Image>
                    <View style={styles.item_right}>
                        <Text numberOfLines={2} style={styles.item_title}>{item.tour_id.tourName}</Text>
                        <Rating
          readonly
          ratingCount={5}
          showReadOnlyText={false}
          fractions={1}
          startingValue={rating}
          jumpValue={0.1}
          imageSize={12} />
                        <Text style={styles.item_address}>{item.tour_id.isdomain}</Text>
                        <Text style={styles.item_address}>
                            {item.bookingDate}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.item_price}>{price}</Text>
                        </View>
                        <View style={styles.item_days}>
                            <Text style={styles.item_days_text}>{item.tour_id.limitedDay}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.2)', width: '100%', marginVertical: 15 }}></View>
            </TouchableOpacity>
        </>
    )
}

export default Item_Booking

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 134,
        width: '100%',
    },
    item_left: {
        width: 122,
        height: 122,
        borderRadius: 15
    },
    item_right: {
        width: 218,
        marginLeft: 15,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    item_title: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 21,
        color: '#000000'
    },
    item_start_view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_start: {
        alignItems: 'flex-start',
        marginRight: 10,
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#000000'
    },
    item_view: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#000000',
        marginLeft: 5
    },
    item_address: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 15,
        color: '#000000'
    },
    item_price: {
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 18,
        color: '#000000'
    },
    person: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 15,
        color: '#000000'
    },
    item_days: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 3,
        height: 25,
        justifyContent: 'center',
    },
    item_days_text: {
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: '#1A1A1A'
    },


})