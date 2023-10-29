import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, COLOR, ICON} from '../../constant/Themes';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';


const ItemIncluded = ({icon,title,content}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 60,
        borderColor: COLOR.lightBlack2,
        borderWidth: 1,
        borderRadius: 15,
        marginRight: 10,
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom:10
      }}>
      <FontAwesome5 name={icon} size={21} color="#000000" />

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginLeft: 20,
        }}>
        <Text numberOfLines={1} style={{fontSize: 16, fontWeight: '400', color: COLOR.title}}>
            {title}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '400', color: COLOR.detail}}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default ItemIncluded;

const styles = StyleSheet.create({});
