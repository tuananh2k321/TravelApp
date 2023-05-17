import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './screen/BottomTab';
import Login from './screen/Login';
import Register from './screen/Register';
import ForgetPassword from './screen/ForgetPassword';
import NewPassword from './screen/NewPassword';
import VerifyCode from './screen/VerifyCode';
import Successfully from './screen/Successfully';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Successfully"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
        <Stack.Screen name="NewPassword" component={NewPassword}/>
        <Stack.Screen name="VerifyCode" component={VerifyCode}/>
        <Stack.Screen name="Successfully" component={Successfully}/>
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
