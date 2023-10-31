import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings'

const ItemActive = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/cantho.png')} />
      <Text numberOfLines={1} style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 5, marginTop: 4 }}>sdasdasd</Text>
      <View style={styles.review}>
        <Rating
          readonly
          ratingCount={5}
          showReadOnlyText={false}
          fractions={1}
          startingValue={4}
          jumpValue={0.1}
          imageSize={12} />
        <View style={styles.review}>
          <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, width: 40 }}>1000</Text>
          <Text numberOfLines={1} style={{ color: 'black', fontSize: 14 }}> review</Text>
        </View>

      </View>
      <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, width: 350, marginStart: 5 }}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
      <Text numberOfLines={1} style={{ color: 'black', fontSize: 14, width: 250, marginStart: 5, marginTop: 6 }}>Giá: </Text>
    </TouchableOpacity>
  )
}

export default ItemActive

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    width: 380,
    height: 290,
    borderWidth: 0.19,
    borderRadius: 6,
    borderColor: 'gray',
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
    margin: 4
  }
})