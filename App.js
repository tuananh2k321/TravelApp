import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './screen/BottomTab';
import Booking_Successfully from './screen/Booking_Successfully';
import Detail_Booking from './screen/Detail_Booking';
import Payment from './screen/Payment';
import Payment_Method from './screen/Payment_Method';
import Available_Date from './screen/Available_Date';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="BottomTab" screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="BottomTab" component={BottomTab} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Available_Date/>
  );
}

export default App