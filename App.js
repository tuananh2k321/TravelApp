import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './screen/BottomTab';
import Login from './screen/Login';
import Register from './screen/Register';
import ForgetPassword from './screen/ForgetPassword';
import NewPassword from './screen/NewPassword';
import VerifyCode from './screen/VerifyCode';
import Successfully from './screen/Successfully';
import Verifycode2 from './screen/Verifycode2';
import MainNavigator from './screen/main_navigator/MainNavigator';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import OnboardingStart from './screen/OnboardingStart';
import Slider from './screen/swiper/Slider';
import Swiper from './screen/swiper/Swiper';
const Stack = createNativeStackNavigator();

const App = () => {
  // return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="BottomTab"
    //     screenOptions={{headerShown: false}}>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Register" component={Register} />
    //     <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
    //     <Stack.Screen name="NewPassword" component={NewPassword}/>
    //     <Stack.Screen name="VerifyCode" component={VerifyCode}/>
    //     <Stack.Screen name="VerifyCode2" component={Verifycode2}/>
    //     <Stack.Screen name="Successfully" component={Successfully}/>
    //     <Stack.Screen name="BottomTab" component={BottomTab} />
    //   </Stack.Navigator>
    // </NavigationContainer>
   
//   );
// };



  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainNavigator />
      {/* <OnboardingStart/> */}
      {/* <Swiper/> */}
    </SafeAreaView>
  );
};

export default App;


