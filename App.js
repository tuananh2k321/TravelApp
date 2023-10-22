import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './screen/BottomTab';
import Login from './screen/Login';
import Register from './screen/Register';
import ForgetPassword from './screen/ForgetPassword';
import NewPassword from './screen/NewPassword';
import VerifyCode from './screen/VerifyCode';
import Successfully from './screen/Successfully';
import Verifycode2 from './screen/Verifycode2';
import { Provider } from 'react-redux';
import { Store } from './redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from './redux/reducer/UserSlice';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import AddCard from './screen/booking/AddCard';
import Payment_Method from './screen/booking/Payment_Method';
import Item_card from './component/Tab_item/Item_card';
import Payment from './screen/booking/Payment';
import Detail_Booking from './screen/booking/Detail_Booking';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Login'); // Khởi tạo initialRoute là 'Login'
  const [tokenChecked, setTokenChecked] = useState(false); // Khởi tạo biến để kiểm tra token

  useEffect(() => {
    const checkTokenAndStartApp = async () => {
      try {
        // Kiểm tra xem có token trong AsyncStorage không
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Nếu có token trong AsyncStorage, dispatch action để cập nhật token vào Redux Store
          console.log("App token: " + token);
          Store.dispatch(setToken(token));
          setInitialRoute('BottomTab'); // Cập nhật initialRoute thành 'BottomTab' nếu có token
        }
        setTokenChecked(true); // Đã kiểm tra xong token
      } catch (error) {
        console.error('Error checking token:', error);
        setTokenChecked(true); // Đã kiểm tra xong token (có hoặc không)
      }
    };

    // Gọi hàm kiểm tra token khi ứng dụng khởi động
    checkTokenAndStartApp();
  }, []);

  // Nếu chưa kiểm tra xong token, bạn có thể hiển thị một màn hình loading
  if (!tokenChecked) {
    return <Text>Loading...</Text>; // Replace with your loading component
  }

  return (
    <Provider store={Store}>
      {/* <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="VerifyCode" component={VerifyCode} />
          <Stack.Screen name="VerifyCode2" component={Verifycode2} />
          <Stack.Screen name="Successfully" component={Successfully} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <Detail_Booking/>
    </Provider>
  );
};

export default App;
