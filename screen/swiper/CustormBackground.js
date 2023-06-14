import { View, Text } from 'react-native'
import React from 'react'
import { COLOR } from '../../constant/Themes';

import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const CustormBackground = ({animatedIndex, style}) => {
    const containerStyle = useAnimatedStyle(() => ({
        ...style,
        backgroundColor: COLOR.white,
        // keo
        opacity : interpolate(
            animatedIndex.value,
            [0, 0.5],
            [0, 1],
            Extrapolation.CLAMP,
        ),
    }))
  return <Animated.View style={containerStyle}/>
  
}

export default CustormBackground