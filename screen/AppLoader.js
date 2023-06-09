import React , {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import MainNavigator from './main_navigator/MainNavigator';
import {useNavigation} from '@react-navigation/native';

const AppLoader = props => {
  // Get it from props
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 5000);
  });
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require('../../TravelApp/assets/icon/data.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 125,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1, // ưu tiên
  },
});

export default AppLoader;