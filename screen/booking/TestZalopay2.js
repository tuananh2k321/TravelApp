import * as React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  NativeModules,
  NativeEventEmitter,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import CryptoJS from 'crypto-js';
import {useEffect} from 'react';
import {COLOR, SIZES} from '../../constant/Themes';
import AxiosIntance from '../../constant/AxiosIntance';
import { useState } from 'react';
import { useSelector } from 'react-redux';

  // const subscription = payZaloBridgeEmitter.addListener(
  //   'EventPayZalo',
  //   (data) => {
  //     if (data.returnCode == 1) {
  //       alert('Pay success!');
  //     } else {
  //       alert('Pay errror! ' + data.returnCode);
  //     }
  //   }
  // );
  const {PayZaloBridge} = NativeModules;
  const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
try{
  
} catch(e) {

}
 

export default function TestZalopay2(props) {
    const { navigation, route } = props;
    const { id, childrenPrice, adultPrice, name, adult, children, image, tourName, guestInfo } = route.params;
    let price = Number(adult) * Number(adultPrice) + Number(children) * Number(childrenPrice);
    price = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    console.log("AAAA", id, childrenPrice, adultPrice, name, adult, children, image, tourName, guestInfo);
    let amount = Number(adult) * Number(adultPrice) + Number(children) * Number(childrenPrice);
    let count = Number(adult) + Number(children);
    const [totalPrice, settotalPrice] = useState(amount);
    const [quantity, setQuantity] = useState(count);
    const user = useSelector((state) => state.user);

    const onBooking = async () => {
        try {
            const response = await AxiosIntance()
                .post("/booking/api/addBooking",
                    { name: name, children: children, adult: adult, totalPrice: totalPrice, user_id: user.user._id, tour_id: id, guestInfo: guestInfo, quantity: adult+children});
            console.log(response);
            if (response.result == true) {
                navigation.push("Booking_Successfully");
            }
        } catch (e) {
            console.log(e);
        }
    }


  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }

  const callBack = async () => {
    try {
    let appid = 2553;
    let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();
    const config = {
      app_id: appid,
      key1: '9phuAOYhan4urywHTh0ndEXiV3pKHr5Q',
      key2: 'eG4r0GcoNtRGbO8',
      endpoint: 'https://sb-openapi.zalopay.vn/v2/query',
    };
    const hmacInput = config.app_id + '|' + apptransid + '|' + config.key1;

    const dataCB = {
      app_id: config.app_id,
      app_trans_id: apptransid,
      mac: CryptoJS.HmacSHA256(hmacInput, config.key1).toString(),
    };
    // console.log(dataCB);
   
      let formBody = [];
      for (let i in dataCB) {
        var encodedKey = encodeURIComponent(i);
        var encodedValue = encodeURIComponent(dataCB[i]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      });
      console.log(response)
      const resJson = await response.json(); // Phải sử dụng await ở đây để lấy dữ liệu JSON từ response
      console.log(resJson)
      
      if (resJson.return_code == 1) {
        console.log('Successfully')
      } else {
        console.log('fail')
      }
    } catch (e) {
      console.error('Error order:', e);
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.welcomeHead}>Thanh toán ZaloPay</Text>
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/travelapp-3e538.appspot.com/o/images%2Fzalopay.png?alt=media&token=166633e3-6515-47e8-84e0-cecfa74237cd',
          }}
          style={{width: 200, height: 200}}
        />
        <TouchableOpacity
          onPress={() => callBack()}
          style={{
            height: 52,
            backgroundColor: COLOR.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            padding: 10,
            marginTop: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Xác nhận giao dịch
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SIZES.height,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  welcomeHead: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});
