import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings'
import { useState } from 'react';
import { useEffect } from 'react';
import AxiosIntance from '../../constant/AxiosIntance';

const ItemActive = (props) => {
  const { dulieu, navigation } = props;

  const [reviews, setReviews] = useState('');
  const [rating, setrating] = useState(0);

  useEffect(() => {
    try {
      const getAllReviews = async () => {
        const response = await AxiosIntance().get(
          `comment/api/listComment?tour_id=${dulieu._id}`,
        );
        if (response.result == true) {
          setReviews(response.quantity);
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

  const clickItem = () => {
    console.log("Click Item");
    navigation.navigate('TourDetail', { id: dulieu._id });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={clickItem}>
      <Image style={styles.image} resizeMode='stretch' source={{ uri: dulieu.tourImage[0] }} />
      <Text numberOfLines={1} style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 5, marginTop: 4 }}>{dulieu.tourName}</Text>
      <View style={styles.review}>
        <Rating
          readonly
          ratingCount={5}
          showReadOnlyText={false}
          fractions={1}
          startingValue={rating}
          jumpValue={0.1}
          imageSize={12} />
        <View style={styles.review}>
          <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, width: 40 }}>{reviews}</Text>
          <Text numberOfLines={1} style={{ color: 'black', fontSize: 14 }}> review</Text>
        </View>

      </View>
      <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, width: 350, marginStart: 5 }}>{dulieu.description}</Text>
      <View style={styles.review}>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6, marginRight: 20,}}>Giá người lớn: <Text style={{ textDecorationLine:'line-through', color: '#FF0000'}}>{dulieu.adultPrice} Đ</Text></Text>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6 }}>Giá mới: <Text style={{ color: '#0FA3E2', fontWeight: 'bold'}}>{dulieu.adultPrice - dulieu.adultPrice*dulieu.offer/100} Đ</Text></Text>
      </View>
      <View style={styles.review}>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6, marginRight: 20 }}>Giá trẻ nhỏ: <Text style={{ textDecorationLine:'line-through', color: '#FF0000'}}>{dulieu.childrenPrice} Đ</Text></Text>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6 }}>Giá mới: <Text style={{ color: '#0FA3E2', fontWeight: 'bold'}}>{dulieu.childrenPrice - dulieu.childrenPrice*dulieu.offer/100} Đ</Text></Text>
      </View>

    </TouchableOpacity>
  )
}

export default ItemActive

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    width: 380,
    height: 'auto',
    borderWidth: 0.19,
    borderRadius: 6,
    borderColor: 'gray',
    marginTop: 10
  },
  image: {
    width: 370,
    height: 180,
    alignSelf: 'center'
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 5,
    margin: 4,
    marginBottom: 5
  }
})