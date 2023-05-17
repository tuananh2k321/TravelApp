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

export default NewPassword = () => {
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
          onPress={() => navigation.goBack()}>
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
          Tạo mật khẩu mới
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
            Giữ an toàn cho tài khoản của bạn bằng cách tạo một mật khẩu mạnh
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          New Password
        </Text>

        <UITextInput hintText="Mật khẩu mới" isTextEntry={true} />

        <View style={{marginTop: 30}}>
          <UIButtonPrimary text="Yêu cầu mã" />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
