import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLOR, ICON, IMAGES, SIZES} from '../../constant/Themes';
import UITextInput from '../../component/UITextInput';
import UIButtonPrimary from '../../component/UIButtonPrimary';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, validatePhoneNumber} from '../../constant/Validation';
import { useDispatch } from 'react-redux';

export default PasswordByEmail = props => {
  const {navigation} = props;
  const [errorEmail, setErrorEmail] = useState(true);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch()

  const btnSendEmail = () => {
    console.log('btnSendEmail')
    dispatch({
      type: 'SEND-MAIL-CHANGE-PASSWORD',
      payload: [email]
    })
    navigation.replace('Login');
  }

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
            Nhập email của bạn, chúng tôi sẽ gửi link để
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

        <UITextInput
          hintText="jonhn.ux@gmail.com"
          borderError={errorEmail}
          onChangeText={text => {
            setErrorEmail(validateEmail(text));
            setEmail(text)
          }}
        />

        {!errorEmail && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Email không hợp lệ !
          </Text>
        )}

      

        <View style={{marginTop: 30}}>
          <UIButtonPrimary
            text="Gửi Yêu Cầu"
            onPress={() => btnSendEmail()}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
