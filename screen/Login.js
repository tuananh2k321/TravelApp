import React, {useState} from 'react';
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
import {
  isValidEmpty,
  validateEmail,
  validatePassword,
} from '../constant/Validation';
import AxiosIntance from '../constant/AxiosIntance';
import BottomTab from './BottomTab';

export default Login = props => {
  const {navigation} = props;
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);

  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState(true);

  const btnLogin = async () => {
    try {
      const res = await AxiosIntance().post("user/api/login", {
        password: password,
        email: email
      })
      if (res.result == true) {
        console.log(res.user)
        navigation.navigate("BottomTab")
      }
    } catch (error) {
      
    }
    
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
        <Image source={IMAGES.logo} style={{alignSelf: 'center'}} />

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLOR.title,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Chào mừng đến với Discover
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
            Vui lòng chọn tùy chọn đăng nhập của bạn bên dưới
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
          hintText="Nhập địa chỉ email của bạn"
          borderError={errorEmail}
          onChangeText={text => {
            setEmail(text)
            setErrorEmail(validateEmail(text));
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

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Password
        </Text>

        <UITextInput
          hintText="Nhập mật khẩu của bạn"
          isIconRight={true}
          isTextEntry={isHidePassword}
          icon={ICON.eye}
          onPress={() => setIsHidePassword(!isHidePassword)}
          borderError={errorPassword}
          onChangeText={text => {
            setPassword(text)
            setErrorPassword(isValidEmpty(text));
            console.log(errorPassword)
          }}
        />

        {!errorPassword && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Không được để trống !
          </Text>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Text
            style={{
              alignSelf: 'flex-end',
              textDecorationLine: 'underline',
              color: COLOR.primary,
              marginTop: 15,
              fontSize: 14,
            }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>

        <View style={{marginTop: 30}}>
          <UIButtonPrimary text="Đăng Nhập" 
            onPress = {() => btnLogin()}
          />
        </View>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <View style={{flex: 1, height: 1, backgroundColor: COLOR.border}} />
          <Text style={{paddingHorizontal: 10}}>Or login with</Text>
          <View style={{flex: 1, height: 1, backgroundColor: COLOR.border}} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity style={{flex: 1, marginRight: 10}}>
            <View
              style={{
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLOR.border,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <Image source={ICON.google} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: COLOR.detail,
                }}>
                Login with Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLOR.border,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <Image source={ICON.facebook} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: COLOR.detail,
                }}>
                Login with Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
          <Text>Doesn’t have account on dicover?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: COLOR.primary,
                fontWeight: 'bold',
                marginLeft: 5,
              }}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
