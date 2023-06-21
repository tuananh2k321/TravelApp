import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ItemPopular = (props) => {
    const {dulieu, navigation} = props;
    const clickItem = () => {
      console.log("Click Item");
      navigation.navigate('TourDetail', { id: dulieu._id });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={clickItem}>
      <Image style={styles.image} source={{uri: dulieu.image}}/>
      <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 5, marginTop: 4}}>{dulieu.title}</Text>
      <View style={styles.review}>
        <Image style={{width: 25, height: 25}} source={require('../../assets/icon/iconflight.png')}/>
        <Text style={{color: 'black', fontSize: 14}}>{dulieu.review} review</Text>
      </View>
      <Text style={{color: 'black', fontSize: 14}}>{dulieu.detail} ...</Text>
    </TouchableOpacity>
  )
}

export default ItemPopular

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 20
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