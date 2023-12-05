import { COLOR, ICON } from '../../constant/Themes'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image, Animated, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AirbnbRating, Rating } from 'react-native-ratings';
import { useState } from 'react';


const ItemComment = ({ data, navigation }) => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    const startTourDetail = () => {
        console.log("Click Item");
    navigation.navigate('TourDetail', { id: data._id });
    }
    return (
        <TouchableOpacity onPress={startTourDetail}>

                
                <View style={styles.item}>
                    <Image style={styles.item_left} source={{ uri: data.tourImage?.[0] }}></Image>
                    <View style={styles.item_right}>
                        <Text numberOfLines={2} style={styles.item_title}>{data.tourName}</Text>
                        <View style={styles.item_start_view}>
                        <Rating
          readonly
          ratingCount={5}
          showReadOnlyText={false}
          fractions={1}
          startingValue={data.rating}
          jumpValue={0.1}
          imageSize={12} />
                            <Text style={styles.item_start}>{data.start}</Text>
                            <Text style={styles.item_view}>{data.view}{data.rating} review</Text>
                        </View>
                        <Text style={styles.item_address}>{data.address}</Text>
                        <View style={{ flexDirection: 'column' }}>

                            <Text style={styles.item_price}>{VND.format(data.adultPrice)}/Người lớn </Text>
                            <Text style={styles.item_price}>{VND.format(data.childrenPrice)}/Trẻ em</Text>
                            {/* <Text style={styles.person}></Text> */}
                        </View>
                        <View style={styles.item_days}>
                            <Text style={styles.item_days_text}>{data.limitedDay}</Text>
                        </View>
                    </View>
                </View>

 
        </TouchableOpacity>
        
    )
}


export default ItemComment

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 158,
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
        fontSize: 14,
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
        color: '#000000'

    },
    item_address: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        color: '#000000'
    },
    item_price: {
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 18,
        color: '#000000'
    },
    person: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        color: '#000000'
    },
    item_days: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 3,
        height: 25,
        justifyContent: 'center'
    },
    item_days_text: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        color: '#1A1A1A'
    }

})