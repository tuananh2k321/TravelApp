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
import CheckBox from '@react-native-community/checkbox';

export default Register = (props) => {
  const {navigation} = props
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          backgroundColor: COLOR.white,
          padding: 15,
          width: SIZES.width,
        }}>
        <TouchableOpacity style={{position: 'absolute', top: 15, left: 10}}
        
        onPress={() => navigation.navigate('Login')}>
          <Image 
            source={ICON.left}
            style={{
              width: 17,
              height: 17,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLOR.title,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Tạo tài khoản mới
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
            Khai thác tốt nhất bằng cách tạo một tài khoản
          </Text>
        </View>

        
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Tên 
        </Text>

        <UITextInput hintText="Tuấn Anh"  />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Họ 
        </Text>

        <UITextInput hintText="Trần" />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Số điện thoại
        </Text>

        <UITextInput hintText=""  keyboardType="numeric" />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Ngày sinh
        </Text>

        <UITextInput hintText=""   isIconRight={true} icon={ICON.calendar}/>

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Email
        </Text>

        <UITextInput hintText="tuananh123@gmail.com"/>

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Mật khẩu
        </Text>

        <UITextInput hintText="" isTextEntry={true} isIconRight={true} icon = {ICON.eye}/>

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Nhập lại Mật khẩu
        </Text>

        <UITextInput hintText="" isTextEntry={true} isIconRight={true} icon = {ICON.eye}/>

          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <CheckBox
    disabled={false}
    value={toggleCheckBox}
    tintColors={{ true: COLOR.primary }}
    onValueChange={(value) => setToggleCheckBox(value)}
          
    
  />
            
            <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            textDecorationLine: 'underline'
          }}>
          Tôi chấp nhận những điều khoản và quy định
        </Text>
          </View>
        
        <View style={{marginTop: 30}}>
          <UIButtonPrimary text="Tạo tài khoản mới" />
        </View>

        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
        <Text>Already have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          
          <Text
            style={{
              color: COLOR.primary,
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
             Login
          </Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
