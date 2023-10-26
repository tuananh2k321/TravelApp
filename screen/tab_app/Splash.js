import { StyleSheet, Text, View, Image } from 'react-native'
import React, { Component } from 'react'

export default class Splash extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source ={require('../../assets/images/splash.png')}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})