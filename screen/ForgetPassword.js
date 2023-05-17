import React from 'react';
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

export default ForgetPassword = (props) => {
    const {navigation} = props
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
            Nhập email hoặc điện thoại của bạn, chúng tôi sẽ gửi mã xác minh để
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
          Email
        </Text>

        <UITextInput hintText="jonhn.ux@gmail.com" />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Phone Number
        </Text>

        <UITextInput hintText="Nhập sổ điện thoại của bạn" keyboardType="numeric" />

        <View style={{marginTop: 30}}>
          <UIButtonPrimary text="Yêu cầu mã" />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
