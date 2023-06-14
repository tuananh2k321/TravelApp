import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from './Slider'
import SlideItem from './SlideItem'

const Swiper = (props) => {
  return (
    <SafeAreaView>
      <Slider navigation={props.navigation}/>
    </SafeAreaView>
  )
}

export default Swiper

const styles = StyleSheet.create({})