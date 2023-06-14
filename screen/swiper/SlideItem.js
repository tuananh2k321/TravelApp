import { StyleSheet, Text, View, Image, Dimensions, Animated, Easing, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'

import * as Animatable from 'react-native-animatable';
import { FadeIn, FadeInUp } from 'react-native-reanimated';
import { SIZE, SPACING } from '../../constant/Themes';
import BottomSheet from '@gorhom/bottom-sheet';
import CustormBackground from './CustormBackground';
import CustormHandler from './CustormHandler';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item, listRef, index, listLength, navigation }) => {
  const translateYImage = new Animated.Value(40)
  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start()

  const snapPoints = useMemo(() => ['40%', '80%'], [])
  return (
    <View style={StyleSheet.absoluteFillObject, styles.container}>
      <Animated.Image source={item.img}
        resizeMode='contain'
        style={[StyleSheet.absoluteFillObject, styles.image, {
          transform: [
            {
              translateY: translateYImage,
            }
          ]
        }]} />

      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        // backgroundComponent={CustormBackground}
        handleComponent={CustormHandler} >
        <Animatable.View
          style={styles.content}
          animation="fadeInUp"
          delay={500}
          easing={'ease-in-out'}
          duration={400}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity
            style={[styles.button,
            { width: 356, height: 52 },]}
            
            color="#000" onPress={() => {
              if (!(index >= listLength - 1)) {
                listRef?.current.scrollToIndex({ animated: true, index: index + 1 });
              } else {
                navigation.navigate("Home")
              }
            }}>
              <Text style={styles.text}>Kế tiếp</Text>

          </TouchableOpacity>
        </Animatable.View>
      </BottomSheet>

    </View>

  )
}

export default SlideItem

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0FA3E2',
    padding: 10,
    borderRadius: 15,
    top: 80,
  },
  container: {
    width,
    height,
    borderRadius: SIZE.radius,
    overflow: 'hidden',
  },

  image: {
    // flex: 0.6,
    // width: '100%',
    width: SIZE.width,
    height: SIZE.height,
    resizeMode: 'cover'
  },
  content: {
    // flex: 0.4,
    // alignItems: 'center',
    paddingVertical: SPACING.l,
    paddingHorizontal: SPACING.l
  },
  title: {
    fontSize: SIZE.title,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontStyle: 'Roboto',
    fontSize: 18,
   textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#333',
  },
})