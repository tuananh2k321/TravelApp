import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AirbnbRating, Rating } from 'react-native-ratings';

const ItemPopular = (props) => {
    const {dulieu, navigation} = props;
    // console.log('imaheeeee', dulieu.tourImage[0])
    // console.log('tourrrrrrr', dulieu)
    const clickItem = () => {
      console.log("Click Item");
      navigation.navigate('TourDetail', { id: dulieu._id });
  }


  return (
    <TouchableOpacity style={styles.container} >
      <Image style={styles.image} source={{uri: dulieu.tourImage[0]}}/>
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
        <Text numberOfLines={1} style={{color: 'black', fontSize: 14, width: 50}}>100</Text>
        <Text numberOfLines={1} style={{color: 'black', fontSize: 14}}> review</Text>
        </View>
        
      </View>
      <Text numberOfLines={1} style={{color: 'black', fontSize: 14, width: 150}}>{dulieu.description}</Text>
    </TouchableOpacity>
  )
}

export default ItemPopular

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,

        width: 160,
        height: 'auto'
    },
    image:{
        width: 150,
        height: 150,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
     review: {
        flexDirection: 'row',
        alignItems: 'center',
     }
})