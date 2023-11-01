import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AirbnbRating, Rating } from 'react-native-ratings';

const ItemPopular = (props) => {
    const {dulieu, navigation} = props;
    const clickItem = () => {
      console.log("Click Item");
      navigation.navigate('TourDetail', { id: dulieu._id });
  }


  return (
    <TouchableOpacity style={styles.container} onPress={clickItem}>
      <Image style={styles.image} resizeMode='stretch' source={{uri: dulieu.tourImage[0]}}/>
      <Text numberOfLines={1} style={{fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 5, marginTop: 4}}>{dulieu.tourName}</Text>
      <View style={styles.review}>
        <Rating
        readonly
        ratingCount={5}
        showReadOnlyText={false}
        fractions={1}
        startingValue={dulieu.rating}
        jumpValue={0.1}
        imageSize={12}/>
        <View style={styles.review}>
        <Text numberOfLines={1} style={{color: 'black', fontSize: 14, width: 40}}>100</Text>
        <Text numberOfLines={1} style={{color: 'black', fontSize: 14}}> review</Text>
        </View>
        
      </View>
      <Text numberOfLines={1} style={{color: 'black', fontSize: 14, width: 150, marginStart: 5}}>{dulieu.description}</Text>
    </TouchableOpacity>
  )
}

export default ItemPopular

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        width: 190,
        height: 225,
        borderWidth: 0.19,
        borderRadius: 6,
        borderColor: 'gray',
    },
    image:{
        width: 190,
        height: 150,
        alignSelf: 'center',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
     review: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginStart: 5
     }
})