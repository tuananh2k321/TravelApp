import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Image,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  FlatList,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './screen/BottomTab';
import Login from './screen/auth/Login';
import Register from './screen/auth/Register';
import PasswordByEmail from './screen/auth/PasswordByEmail';
import PasswordByPhoneNumber from './screen/auth/PasswordByPhoneNumber';
import NewPassword from './screen/auth/NewPassword';
import VerifyCode from './screen/auth/VerifyCode';
import Successfully from './screen/Successfully';
import GoToLogin from './screen/auth/GoToLogin';
import Verifycode2 from './screen/Verifycode2';
import SelectOptions from './screen/auth/SelectOptions';
import { Provider } from 'react-redux';
import { Store } from './redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from './redux/reducer/UserSlice';
import { StripeProvider } from '@stripe/stripe-react-native';
import messaging from '@react-native-firebase/messaging';
import { getToken, notificationListeners, requestUserPermission } from './constant/Util';
import { Alert } from 'react-native';
import Booking_Successfully from './screen/booking/Booking_Successfully';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('BottomTab'); // Khởi tạo initialRoute là 'Login'
  const [tokenChecked, setTokenChecked] = useState(false); // Khởi tạo biến để kiểm tra token

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Bạn có thông báo mới!', remoteMessage.notification.title);
      
      console.log(remoteMessage.notification.body);
      console.log(remoteMessage.notification.title);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission()
    notificationListeners()
    ///getToken()
  }, []);

  useEffect(() => {
    const checkTokenAndStartApp = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const tokenTimestamp = await AsyncStorage.getItem('tokenTimestamp'); // Lấy thời gian lưu token
          if (tokenTimestamp) {
            const currentTime = new Date().getTime();
            const tokenExpirationTime = parseInt(tokenTimestamp, 10) + 2 * 60 * 60 * 1000; // Thời gian hết hạn sau 2 giờ (2 * 60 * 60 * 1000 milliseconds)
            if (currentTime > tokenExpirationTime) {
              // Token đã hết hạn, xóa token và thông tin liên quan
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('tokenTimestamp');
              setTokenChecked(true);
              return;
            }
          }

          // Token vẫn còn hợp lệ, dispatch action và cập nhật initialRoute
          //console.log("App token: " + token);
          Store.dispatch(setToken(token));
          setInitialRoute('BottomTab');

          setTokenChecked(true);
        } else {
          // Không có token, tiếp tục với quá trình khởi động bình thường
          setTokenChecked(true);
        }
      } catch (error) {
        console.error('Error checking token:', error);
        setTokenChecked(true);
      }
    };

    checkTokenAndStartApp();
  }, []);




  // Nếu chưa kiểm tra xong token, bạn có thể hiển thị một màn hình loading
  // if (!tokenChecked) {
  //   return <Text>Loading...</Text>; // Replace with your loading component
  // }
  const STRIPE_KEY = 'pk_test_51OAMNGANZv3Twwu9pzJzF1umKF8axh0rzphoESMxaGlGaIa0NDb1q4v18l8WugkxdR72EqNfzDrRKGr1VWv9N2Z400vuFz9UB4';
  return (
    <Provider store={Store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer >
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="GoToLogin" component={GoToLogin} />
            <Stack.Screen name="SelectOptions" component={SelectOptions} />
            <Stack.Screen name="PasswordByEmail" component={PasswordByEmail} />
            <Stack.Screen name="PasswordByPhoneNumber" component={PasswordByPhoneNumber} />
            <Stack.Screen name="VerifyCode" component={VerifyCode} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="VerifyCode2" component={Verifycode2} />
            <Stack.Screen name="Successfully" component={Successfully} />
            <Stack.Screen name="Booking_Successfully" component={Booking_Successfully} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </Provider>
    
  );
};

export default App;
