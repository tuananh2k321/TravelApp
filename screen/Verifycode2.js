import React, { useState } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLOR, ICON, IMAGES, SIZES} from '../constant/Themes';
import UITextInput from '../component/UITextInput';
import UIButtonPrimary from '../component/UIButtonPrimary';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input'

export default VerifyCode2 = (props) => {
  const {navigation} = props
  const [otpCode, setOtpCode] = useState('');

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
        <TouchableOpacity style={{position: 'absolute', top: 15, left: 10}} onPress={() => navigation.goBack()}>
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
            style={{ width: '80%', height: 50, alignSelf: 'center' }}
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
            placeholderTextColor={{ backgroundColor: 'red' }}
            onCodeFilled={(otpCode) => {
              
            }}
          />

        <View style={{marginTop: 50, justifyContent: 'flex-end'}}>
          <UIButtonPrimary text="Xác Minh" onPress={() => navigation.navigate('NewPassword')}/>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
