import { FlatList, StyleSheet, Text, View, Animated, Button, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import ItemOnboard from './ItemOnboard'
import AppIntroSlider from 'react-native-app-intro-slider'
import Ionicons from 'react-native-vector-icons/Ionicons'
import App from '../../../App'


const Onboarding = (props) => {
  const { navigation } = props;

  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true)
  };


  const _renderNextButton = () => {
    return (
      <View style={styles.buttonNext}>
        <Ionicons
          name="arrow-forward-outline"
          size={28} />
      </View>
    );
  };

  const _renderPrevButton = () => {
    return (
      <View style={styles.buttonSkip}>
        <Ionicons
          name="arrow-back-outline"
          size={28} />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={[styles.buttonNext]}>
        <Ionicons
          name="checkmark-outline"
          size={28} />
      </View>
    );
  };

  return (
    <>{showRealApp ?
      (<App />) : (
        <AppIntroSlider
          style={styles.container}
          data={slides}
          renderNextButton={_renderNextButton}
          renderDoneButton={_renderDoneButton}
          renderPrevButton={_renderPrevButton}
          renderItem={({ item }) => <ItemOnboard data={item} />}
          onDone={onDone}
          showPrevButton={true}
          dotStyle={{ backgroundColor: 'black' }}
          activeDotStyle={{ backgroundColor: '#0FA3E2' }}
        />)}
    </>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonNext: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    marginRight: 40,
    alignItems: 'center',
  },
  buttonSkip: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    marginLeft: 40,
    alignItems: 'center',
  },
})

const slides = [
  {
    key: 's1',
    description: 'Tìm hàng nghìn địa điểm du lịch sẵn sàng chào đón bạn ghé thăm',
    title: 'Chuẩn bị cho chuyến đi tiếp theo',
    image: require('../../../assets/images/onboard1.jpg')

  },

  {
    key: 's2',
    title: 'Thăm các điểm du lịch',
    description: 'Tìm hàng nghìn địa điểm du lịch sẵn sàng chào đón bạn ghé thăm',
    image: require('../../../assets/images/onboard2.jpg')

  },
  {
    key: 's3',
    title: 'Hãy khám phá thế giới',
    description: 'Tìm hàng nghìn địa điểm du lịch sẵn sàng chào đón bạn ghé thăm',
    image: require('../../../assets/images/onboard3.jpg')
  },
];
