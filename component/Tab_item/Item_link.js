import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import {SIZES, COLOR, ICON} from '../../constant/Themes';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const ItemLink = ({icon,tile,name,content,screen,dulieu}) => {
  const navigation = useNavigation();
    const clickItem = () => {
      navigation.navigate(screen, { dulieu: dulieu });
      console.log("<<<<<<<<<<<<<<<<<",dulieu)
  }
  return (
    <TouchableOpacity onPress={clickItem}>
        <View style={{flexDirection:'column',justifyContent:'flex-start',marginTop:20}}>
            <View style={{flexDirection:"row",justifyContent:'space-between'}}>
              <Text style={{fontSize:18,fontWeight:'600',color:COLOR.title}}>
                {tile}
              </Text>
              <FontAwesome5 name={icon} size={24} color="#000000" />
            </View>
            <View>
              <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
                <View style={{flexDirection:'column',width:280,marginTop:10}}>
                <Text numberOfLines={1} style={{fontSize:16,fontWeight:'500',color:COLOR.title}}>
                  {name}
                </Text>
                <Text numberOfLines={3} style={{fontSize:14,fontWeight:'400',color:COLOR.detail,marginTop:5}}>
                  {content}
                </Text>
                </View>
                <FontAwesome5 name={"chevron-right"} size={24} color="#000000" />
              </View>
            </View>
          </View>
    </TouchableOpacity>
  )
}

export default ItemLink

const styles = StyleSheet.create({})