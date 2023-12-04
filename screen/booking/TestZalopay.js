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

export default function TestZalopay(props) {
  const {PayZaloBridge} = NativeModules;

  const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

  const {navigation, route} = props;
  const {params} = route;
  const [money, setMoney] = React.useState('10000');
  const [token, setToken] = React.useState('');
  const [returncode, setReturnCode] = React.useState('');
  useEffect(() => {
    console.log(params);
    setMoney(params.totalPrice);
  });

  const createOrder = async money => {
    try{
      let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();

      let appid = 2553;
      let amount = parseInt(money);
      let appuser = 'ZaloPayDemo';
      let apptime = new Date().getTime();
      let embeddata = '{}';
      let item = '[]';
      let description = 'Merchant description for order #' + apptransid;
      let hmacInput =
        appid +
        '|' +
        apptransid +
        '|' +
        appuser +
        '|' +
        amount +
        '|' +
        apptime +
        '|' +
        embeddata +
        '|' +
        item;
      let mac = CryptoJS.HmacSHA256(
        hmacInput,
        'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
      );
      console.log('====================================');
      console.log('hmacInput: ' + hmacInput);
      console.log('mac: ' + mac);
      console.log('====================================');
      var order = {
        app_id: appid,
        app_user: appuser,
        app_time: apptime,
        amount: amount,
        app_trans_id: apptransid,
        embed_data: embeddata,
        item: item,
        description: description,
        mac: mac,
      };
  
      console.log(order);
  
      let formBody = [];
      for (let i in order) {
        var encodedKey = encodeURIComponent(i);
        var encodedValue = encodeURIComponent(order[i]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      await fetch('https://sb-openapi.zalopay.vn/v2/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      })
        .then(response => response.json())
        .then(resJson => {
          console.log('resJson:', resJson); // Đăng nhập toàn bộ đối tượng resJson
          setToken(resJson.zp_trans_token);
          setReturnCode(resJson.return_code);
          if (resJson.return_code == 1) {
            payOrder()
          }
          
        })
        .catch(error => {
          console.log('error ', error);
        });
    } catch(err) {

    }
   
  };

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
    } catch (err) {}
  };

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
