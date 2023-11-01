import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet,ImageBackground,TouchableOpacity,ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { COLOR, SIZES } from '../../constant/Themes';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
const ImageSlideshow = ({ images, interval = 2000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        if (currentIndex < images.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setCurrentIndex(0);
        }
      }, interval);
  
      return () => {
        clearInterval(timer);
      };
    }, [currentIndex]);
  
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled>
          {images.map((image, index) => (
            <Image key={index} source={{uri: image}} style={styles.image} />
          ))}
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    image: {
      width: SIZES.width,
      height: 300,
    },
  });
  
  export default ImageSlideshow;
