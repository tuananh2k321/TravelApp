import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings'
import { useNavigation } from '@react-navigation/native';

const ItemDeals = (props) => {
  const { dulieu, navigation } = props;

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

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
          startingValue={dulieu.rating}
          jumpValue={0.1}
          imageSize={12} />
        <View style={styles.review}>
          <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, width: 40 }}>1000</Text>
          <Text numberOfLines={1} style={{ color: 'black', fontSize: 14 }}> review</Text>
        </View>

      </View>
      <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, width: 350, marginStart: 5 }}>{dulieu.description}</Text>
      <View style={styles.review}>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6, marginRight: 20, }}>Giá người lớn: <Text style={{ textDecorationLine: 'line-through', color: '#FF0000' }}>{VND.format(dulieu.adultPrice)}</Text></Text>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6 }}>Giá mới: <Text style={{ color: '#0FA3E2', fontWeight: 'bold' }}>{VND.format(dulieu.adultPrice - dulieu.adultPrice * dulieu.offer / 100)}</Text></Text>
      </View>
      <View style={styles.review}>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6, marginRight: 20 }}>Giá trẻ nhỏ: <Text style={{ textDecorationLine: 'line-through', color: '#FF0000' }}>{VND.format(dulieu.childrenPrice)}</Text></Text>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6 }}>Giá mới: <Text style={{ color: '#0FA3E2', fontWeight: 'bold' }}>{VND.format(dulieu.childrenPrice - dulieu.childrenPrice * dulieu.offer / 100)}</Text></Text>
      </View>

    </TouchableOpacity>
  )
}

export default ItemDeals

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    width: 380,
    height: 'auto',
    borderWidth: 0.19,
    borderRadius: 6,
    borderColor: 'gray',
    marginTop: 10,
    backgroundColor: "white"
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