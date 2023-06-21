import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ItemMenu = (props) => {
    const {menud}= props;
  return (
    <TouchableOpacity style={styles.press}>
        <Image style={{height: 25, width: 25}} source={{uri: menud.image}} />
        <Text style={styles.title}>{menud.title}</Text>
    </TouchableOpacity>
  )
}

export default ItemMenu

const styles = StyleSheet.create({
        press: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 120,
        height: 40,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10,
    }
})