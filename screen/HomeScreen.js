import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AppLoader from './AppLoader';
const HomeScreen = () => {
    return (
        <>
          <View style={styles.root}>
          <Image
        style={{tintColor: '#000'}} source={require('../../TravelApp/assets/icon/logo.png')} />
          </View>
          <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AppLoader />
          </View>
        </>
      );
    };
    
    const styles = StyleSheet.create({
      root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1, // ưu tiên
      },
    });
    
    export default HomeScreen;

