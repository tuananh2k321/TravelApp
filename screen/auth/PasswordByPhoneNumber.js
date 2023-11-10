import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {COLOR, ICON, IMAGES, SIZES} from '../../constant/Themes';
import UITextInput from '../../component/UITextInput';
import UIButtonPrimary from '../../component/UIButtonPrimary';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validatePhoneNumber} from '../../constant/Validation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export default PasswordByPhoneNumber = props => {
  const {navigation} = props;
  const [errorPhone, setErrorPhone] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
    const disPatch = useDispatch() 
    const user = useSelector(state => state.user)

    useEffect(() =>{
        if (user.dataSendOTP.result) {
            navigation.navigate("VerifyCode")
            //ToastAndroid.show('Gửi mã OTP thành công!', ToastAndroid.SHORT);
        }
    }, [user])

const btnSendOTP = async () => {
    console.log('btnSendOTP');
    try {
      if (errorPhone == true ) {
        console.log('valid');

        console.log(phoneNumber)
        disPatch({
          type: 'SEND-OTP',
          payload: [phoneNumber],
        });
       
      }
    } catch (error) {
      console.log('AxiosIntance', error);
      //ToastAndroid.show('Gửi mã thất bại!', ToastAndroid.LONG);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          backgroundColor: COLOR.white,
          padding: 15,
          width: SIZES.width,
          height: SIZES.height,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{position: 'absolute', top: 15, left: 10}}
          onPress={() => navigation.pop()}>
          <Image
            source={ICON.left}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <Image source={IMAGES.logo} style={{alignSelf: 'center'}} />

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLOR.title,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Quên mật khẩu
        </Text>

        <View style={{width: 300, alignSelf: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '400',
              color: COLOR.detail,
              marginTop: 15,
            }}>
            Nhập số điện thoại của bạn, chúng tôi sẽ gửi mã xác thực để
            đặt lại mật khẩu của bạn
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Số điện thoại
        </Text>

        <UITextInput
          hintText="Nhập sổ điện thoại của bạn"
          keyboardType="numeric"
          borderError={errorPhone}
          onChangeText={text => {
            setErrorPhone(validatePhoneNumber(text));
            setPhoneNumber(text)
          }}
        />

        {!errorPhone && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Số điện thoại không hợp lệ !
          </Text>
        )}


        <View style={{marginTop: 30}}>
          <UIButtonPrimary
            text="Gửi Yêu Cầu"
            onPress={() => btnSendOTP()}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
