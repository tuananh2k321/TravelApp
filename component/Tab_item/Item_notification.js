import { StyleSheet, Text, View,Image,TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'

const Item_notification = props => {
    const {dulieu} = props;
  return (
    <View style={styles.list_product}>
        <Image style={{width:56,height:56,borderRadius:30}} source={{uri:dulieu.image}}></Image>
            <View style={styles.list_product_text}>
                <Text numberOfLines={1} style={styles.title}>{dulieu.title}</Text>
                <Text numberOfLines={1} style={styles.content}>{dulieu.content}</Text>
                <Text style={styles.days}>{dulieu.days}</Text>
            </View>
        <TouchableOpacity style={styles.button_view}>
            <Text style={styles.button_view_text}>View</Text>
        </TouchableOpacity>
</View>
  )
}

export default Item_notification

const styles = StyleSheet.create({
    list_product:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:20,
        justifyContent:'space-between',
    },
    list_product_text:{
        flexDirection:'column',
        marginLeft:11,
    },
    title:{
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:14,
        lineHeight:21,
        color:'#000000',
        width: Dimensions.get('window').width -182
    },
    content:{
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:9,
        lineHeight:14,
        color:'#000000',
        width: Dimensions.get('window').width -182
    },
    days:{
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:10,
        lineHeight:15,
        color:'rgba(0, 0, 0, 0.6)'
    },
    button_view:{
        width:61,
        height:28,
        backgroundColor:'#39C4FF',
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:11
    },
    button_view_text:{
        fontStyle:'normal',
        fontWeight:'400',
        fontSize:12,
        lineHeight:18,
        color:'#FFFFFF',
    }
})