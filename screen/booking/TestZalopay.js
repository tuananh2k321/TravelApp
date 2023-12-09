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
  ToastAndroid,
} from 'react-native';
import CryptoJS from 'crypto-js';
import {useEffect} from 'react';
import {COLOR, SIZES} from '../../constant/Themes';
import Loading from '../Loading';
import { useState } from 'react';
import axios from 'axios';

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
 

export default function TestZalopay(props) {


  const {navigation, route} = props;
  const {params} = route;
  const [money, setMoney] = React.useState('10000');
  const [token, setToken] = React.useState('');
  const [returncode, setReturnCode] = React.useState('');
  const [loading, setLoading] = useState(true)
  const [hmacInput, setHmacInput] = useState("")
  const  { id, name, adult, children, totalPrice, guestInfo }  = route.params;
  useEffect(() => {
    console.log(params);
    console.log(params.totalPrice)
    setMoney(params.totalPrice);
    console.log(money)
    // subscription = payZaloBridgeEmitter.addListener(
    //   'EventPayZalo',
    //   (data) => {
    //     if(data.returnCode == 1){
    //       alert('Giao dịch thành công!');
    //     } else{
    //       alert('Giao dịch thất bại!');
    //     }
    //   }
    // )
    setLoading(false)

    //subscription
  });

 

  async function createOrder(money) {

    let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime()

    let appid = 2553
    let amount = parseInt(money)
    let appuser = "ZaloPayDemo"
    let apptime = (new Date).getTime()
    let embeddata = "{}"
    let item = "[]"
    let description = "Merchant description for order #" + apptransid
    let hmacInput = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item
    setHmacInput(hmacInput)
    let mac = CryptoJS.HmacSHA256(hmacInput, "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL")
    console.log('====================================');
    console.log("hmacInput: " + hmacInput);
    console.log("mac: " + mac)
    console.log('====================================');
    var order = {
      'app_id': appid,
      'app_user': appuser,
      'app_time': apptime,
      'amount': amount,
      'app_trans_id': apptransid,
      'embed_data': embeddata,
      'item': item,
      'description': description,
      'mac': mac
    }

    console.log(order)

    let formBody = []
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    await fetch('https://sb-openapi.zalopay.vn/v2/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(response => response.json())
      .then(resJson => {
        setToken(resJson.zp_trans_token)
        setReturnCode(resJson.return_code)
        payOrder()
      })
      .catch((error) => {
        console.log("error ", error)
      })
  }

  // const createOrder = (money) => {
  //   const config = {
  //     appid: "553",
  //     key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
  //     key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
  //     endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
  //   };
    
  //   const embeddata = {
  //     merchantinfo: "embeddata123"
  //   };
    
  //   const items = [{
  //     itemid: id,
  //     itemname: name,
  //     itemprice: 5000,
  //     itemquantity: 1
  //   }];
    
  //   const order = {
  //     appid: config.appid, 
  //     apptransid: getCurrentDateYYMMDD() + '_' + new Date().getTime(), // mã giao dich có định dạng yyMMdd_xxxx
  //     appuser: "demo", 
  //     apptime: Date.now(), // miliseconds
  //     item: JSON.stringify(items), 
  //     embeddata: JSON.stringify(embeddata), 
  //     amount: 5000, 
  //     description: "ZaloPay Integration Demo",
  //     bankcode: "zalopayapp", 
  //   };
    
  //   // appid|apptransid|appuser|amount|apptime|embeddata|item
  //   const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
  //   order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    
  //   axios.post(config.endpoint, null, { params: order })
  //     .then(res => {
  //       console.log(res.data);
  //       if (res.data.returncode == 1) {
  //         payOrder()
  //       } else {
  //         console.log("fail")
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }

  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }

  const payOrder = async () => {
    try {
      // navigation.pop()
    // navigation.navigate("Booking_Successfully")
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(token);
    console.log('payZP.payOrder:  ', payZP.payOrder(token));
    navigation.navigate('TestZalopay2', { id: id, name: name, adult: adult, children: children, totalPrice: totalPrice, guestInfo: guestInfo, hmacInput: hmacInput });
    } catch (err) {}
  };

  if (loading) {
    return <Loading/>
  }

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
          onPress={() => createOrder(money)}
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
            Thanh toán
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
