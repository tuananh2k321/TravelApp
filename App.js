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

import TestPhone from './screen/TestPhone';
import Booking_Successfully from './screen/Booking_Successfully';
import Detail_Booking from './screen/Detail_Booking';
import Payment from './screen/Payment';
import Payment_Method from './screen/Payment_Method';
import Available_Date from './screen/Available_Date';

import ItemPopular from './screen/ItemPopular';
import Home from './screen/tab_app/Home';
import Profile from './screen/tab_app/Profile';
import Notification from './screen/tab_app/Notification';
import Favorite from './screen/tab_app/Favorite';
import Mybooking from './screen/tab_app/Mybooking';
import TourDetail from './screen/TourDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
        <Stack.Screen name="TourDetail" component={TourDetail}/>
        <Stack.Screen name="NewPassword" component={NewPassword}/>
        <Stack.Screen name="VerifyCode" component={VerifyCode}/>
        <Stack.Screen name="VerifyCode2" component={Verifycode2}/>
        <Stack.Screen name="Successfully" component={Successfully}/>
        <Stack.Screen name="Available_Date" component={Available_Date}/>
        <Stack.Screen name="Payment_Method" component={Payment_Method}/>
        <Stack.Screen name="Payment" component={Payment}/>
        <Stack.Screen name="Booking_Successfully" component={Booking_Successfully}/>
        <Stack.Screen name="Detail_Booking" component={Detail_Booking}/>
        <Stack.Screen name="TestPhone" component={TestPhone}/>
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
