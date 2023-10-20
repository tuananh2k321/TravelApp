import { SafeAreaView, StyleSheet, Text, View,ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { COLOR, SIZES } from '../../../constant/Themes';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

const HotelDetail = (props) => {
    const { navigation} = props;
  return (

    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{flex:1,backgroundColor:'#ffffff',width:SIZES.width}}>
            <ImageBackground
            source={{
                uri: 'https://ik.imagekit.io/tvlk/blog/2023/04/go-and-share-bai-bien-viet-nam-5.jpeg',
            }}
            style={{width: SIZES.width, height: 300, padding: 15}}>
            <View
                style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack(null)}
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 50,
                    backgroundColor: COLOR.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <FontAwesome5 name={"arrow-left"} size={16} color="#000000" />
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                <View
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 50,
                    backgroundColor: COLOR.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight:10
                }}>
                <FontAwesome5 name={"share-alt"} size={16} color="#000000" />
                </View>

                <View
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 50,
                    backgroundColor: COLOR.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <FontAwesome name={"heart-o"} size={16} color="#000000" />
                </View>
                </View>
            </View>
            </ImageBackground>

        </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

export default HotelDetail

const styles = StyleSheet.create({})