import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { ICON } from '../../constant/Themes';

const Item_Booking = (props) => {
    const { item } = props;
    const dateReplace = (item.bookingDate);
    let dateSlice = "";
    // let dateArray = [];
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
            tong += orders[i]+"/";
        }
        return tong;
    }

    getTotalDate(arr) // Output: 8700000
    console.log(getTotalDate(arr))
    // for (let i = 0; i < arrLength; i++) {
    //         // date + arr[i];
    //     console.log(arr[i]);

    //     }
    return (
        <><View style={styles.item}>
            <Image style={styles.item_left} source={{ uri: item.tour_id.tourImage[0] }}></Image>
            <View style={styles.item_right}>
                <Text numberOfLines={2} style={styles.item_title}>{item.tour_id.tourName}</Text>
                <View style={styles.item_start_view}>
                    {Array.from({ length: 5 }).map((_, index) => {
                        if (index < 4) {
                            return (
                                <Image
                                    key={`star-${index}`}
                                    source={ICON.star_yellow}
                                    style={{ width: 13, height: 13 }}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    key={`star-${index}`}
                                    source={ICON.star} style={{ width: 13, height: 13 }} />
                            );
                        }
                    })}
                </View>
                <Text style={styles.item_address}>{item.tour_id.isdomain}</Text>
                <Text style={styles.item_address}>
                    {
                        // date.length > 10 ? date.slice(0, 10) : date
                        getTotalDate(arr).length>10? getTotalDate(arr).slice(0, 10) : getTotalDate(arr)
                    }
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.item_price}>{item.tour_id.adultPrice}đ</Text>
                </View>
                <View style={styles.item_days}>
                    <Text style={styles.item_days_text}>{item.tour_id.limitedDay} ngày {Number(item.tour_id.limitedDay) - 1} đêm</Text>
                </View>
            </View>
        </View>
            <View style={{ borderWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.2)', width: '100%', marginVertical: 15 }}></View></>
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