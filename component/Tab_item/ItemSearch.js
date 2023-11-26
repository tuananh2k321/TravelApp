import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { Rating} from 'react-native-ratings';
import { COLOR, SIZES } from '../../constant/Themes';

const ItemSearch = (props) => {
  const {dulieu, navigation} = props;
  // console.log('imaheeeee', dulieu.tourImage[0])
  // console.log('tourrrrrrr', dulieu)
  const clickItem = () => {
    console.log('Click Item');
    navigation.navigate('TourDetail', {id: dulieu._id});
  };
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <TouchableOpacity onPress={clickItem}>
      <View style={styles.container}>
          <Image style={styles.image} source={{uri: dulieu.tourImage[0]}} />
          <View style={{flexDirection: 'column', marginLeft: 15,alignItems:'flex-start',}}>
            <Text
            numberOfLines={2}
              style={{
                fontSize: 16,
                color: '#000000',
                fontWeight: '600',
              }}>
              {dulieu.tourName}
            </Text>
            <View style={styles.review}>
              <Rating
                readonly
                ratingCount={5}
                showReadOnlyText={false}
                fractions={1}
                startingValue={dulieu.rating}
                jumpValue={0.1}
                imageSize={13}
              />

              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                }}>
                {dulieu.rating}
              </Text>
              <Text style={{color: '#000000', fontSize: 14,marginLeft:5}}>reviews</Text>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight:'400',
                marginTop:7
              }}>
              {VND.format(dulieu.adultPrice)}/ người lớn
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight:'400',
                marginTop:7
              }}>
              {VND.format(dulieu.childrenPrice)}/ trẻ em
            </Text>
            <View style={styles.item_days}>
              <Text style={styles.item_days_text}>{dulieu.limitedDay}</Text>
            </View>
            
          </View>
          
        </View>
        <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.lightBlack2,
              marginVertical: 30,
              width:SIZES.width
            }}
          />
    </TouchableOpacity>
  )
}

export default ItemSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  review: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    marginTop: 7,
  },
  item_days: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 3,
    height: 25,
    justifyContent: 'center',
    marginTop:7
  },
  item_days_text: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
    color: '#1A1A1A',
  },
});
