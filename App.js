import React, { useEffect, useState } from 'react';
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
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import SearchScreen from './screen/tab_app/Home/SearchScreen';
import AddCard from './screen/booking/AddCard';
import Payment_Method from './screen/booking/Payment_Method';
import Item_card from './component/Tab_item/Item_card';
import Payment from './screen/booking/Payment';
import Detail_Booking from './screen/booking/Detail_Booking';
import Loading from './screen/Loading';
import Mybooking from './screen/tab_app/Mybooking';
import AddComment from './screen/comment/AddComment';
import EditProfile from './screen/tab_app/Profile/EditProfile';


const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('BottomTab'); // Khởi tạo initialRoute là 'Login'
  const [tokenChecked, setTokenChecked] = useState(false); // Khởi tạo biến để kiểm tra token

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

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"BottomTab"}
          screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="GoToLogin" component={GoToLogin} />
          <Stack.Screen name="SelectOptions" component={SelectOptions} />
          <Stack.Screen name="PasswordByEmail" component={PasswordByEmail} />
          <Stack.Screen name="PasswordByPhoneNumber" component={PasswordByPhoneNumber} />
          <Stack.Screen name="VerifyCode" component={VerifyCode} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="VerifyCode2" component={Verifycode2} />
          <Stack.Screen name="Successfully" component={Successfully} /> */}
          <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Mybooking/> */}
      {/* <AddComment /> */}
      {/* <EditProfile /> */}
    </Provider>
  );
};

export default App;
