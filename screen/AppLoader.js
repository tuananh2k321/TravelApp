import React , {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import MainNavigator from './main_navigator/MainNavigator';
import {useNavigation} from '@react-navigation/native';

const AppLoader = props => {
  // Get it from props
  const navigation = useNavigation();
  // const [authLoaded, setAuthLoaded] = useState(false);
  // const [animationLoaded, setAnimationLoaded] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Swiper');
    }, 5000);
  });



  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
     <LottieView
        ref={animation => {
          ref.current = animation;
        }}
        style={styles.lottieView}
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