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
import Booking_Successfully from './screen/Booking_Successfully';
import Detail_Booking from './screen/Detail_Booking';
import Payment from './screen/Payment';
import Payment_Method from './screen/Payment_Method';
import Available_Date from './screen/Available_Date';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="BottomTab" screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="BottomTab" component={BottomTab} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Available_Date/>
  );
};

export default App;
