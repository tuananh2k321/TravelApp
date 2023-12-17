import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings'

const ItemActive = (props) => {
  const { dulieu, navigation } = props;

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
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6, marginRight: 20 }}>Giá người lớn: {dulieu.adultPrice} Đ</Text>
        <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, marginStart: 5, marginTop: 6 }}>Giá trẻ nhỏ: {dulieu.childrenPrice} Đ</Text>
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
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: 'gray',
    marginVertical: 5,
    backgroundColor: "white",
    padding: 10,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: 180,
    alignSelf: 'center',
    borderRadius: 5
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 5,
    margin: 4
  }
})