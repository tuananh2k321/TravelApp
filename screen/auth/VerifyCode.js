import React, {isValidElement, useEffect, useState} from 'react';
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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {isValidEmpty} from '../../constant/Validation';
import {useDispatch, useSelector} from 'react-redux';

export default VerifyCode = props => {
  const {navigation} = props;
  const disPatch = useDispatch();
  const user = useSelector(state => state.user);

  const [messageVerifyOTP, setMessageVerifyOTP] = useState(null)


  const btnSendOTP = async () => {
    console.log('btnSendOTP');
    try {
      
        console.log('valid');
        const phoneNumber = user.dataSendOTP.phoneNumber
        disPatch({
          type: 'SEND-OTP',
          payload: [phoneNumber],
        });
       
      
    } catch (error) {
      console.log('AxiosIntance', error);
      //ToastAndroid.show('Gửi mã thất bại!', ToastAndroid.LONG);
    }
  };


  useEffect(() => {
    if (user.dataVerifyOTP.result) {
      navigation.navigate("NewPassword")
      //ToastAndroid.show('Xác nhận thành công!', ToastAndroid.SHORT);
    } else {
      setMessageVerifyOTP(user.dataVerifyOTP.message)
    }
  }, [user])

  const btnVerify = () => {
    console.log('btnVerify');
    if (errorOTP == true) {
      // console.log("btnVerify: "+otpCode)
      const phoneNumber = user.dataSendOTP.phoneNumber
      disPatch({
        type: 'VERIFY-OTP',
        payload: [phoneNumber, otpCode],
      });
    }
  };

  const [otpCode, setOtpCode] = useState('');
  const [errorOTP, setErrorOTP] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setCountdown(prevState => prevState - 1);
      }, 1000);
    }

    if (countdown === 0) {
      setIsRunning(false);
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [countdown, isRunning]);

  const handleStart = () => {
    setCountdown(60);
    setIsRunning(true);
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
          Xác nhận OTP
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
            Nhập OTP để xác của bạn để xác thực tài khoản
          </Text>
        </View>

        <OTPInputView
          style={{width: '80%', height: 50, alignSelf: 'center'}}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={{
            width: 30,
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 2,
            fontSize: 20,
            fontWeight: '600',
            color: COLOR.primary,
            borderBottomColor: COLOR.border,
          }}
          codeInputHighlightStyle={{
            borderBottomColor: COLOR.primary,
            borderBottomWidth: 3,
          }}
          placeholderTextColor={{backgroundColor: 'red'}}
          onCodeFilled={otpCode => {
            console.log(otpCode);
            setOtpCode(otpCode)
            setErrorOTP(isValidEmpty(otpCode));
          }}
        />

        {!errorOTP && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Không được để trống !
          </Text>
        )}

        <View style={{width: 300, alignSelf: 'center', marginTop: 30}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '400',
              color: COLOR.detail,
            }}>
            Vẫn chưa nhận được mã?
          </Text>
        </View>

        <View
          style={{
            alignSelf: 'center',
            marginTop: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              console.log('nhận lại');
              handleStart();
              btnSendOTP()
            }}
            disabled={isRunning ? true : false}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '400',
                marginRight: 5,
                color: isRunning ? COLOR.detail : COLOR.primary,
              }}>
              Nhận lại
            </Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '400',
                color: COLOR.primary,
              }}>
              ({countdown}s)
            </Text>
          </View>
        </View>

        <View style={{marginTop: 50, justifyContent: 'flex-end'}}>
          <UIButtonPrimary
            text="Xác Minh"
            onPress={() => btnVerify()}
          />
        </View>

        
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '400',
              color: 'red',
              marginTop: 15,
            }}>
            {messageVerifyOTP}
          </Text>
        
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
