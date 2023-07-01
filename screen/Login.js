import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid
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
import { useDispatch, useSelector } from 'react-redux';

export default Login = props => {
  const {navigation} = props;
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState("")
  const [isValid, setIsvalid] = useState(false);

  const disPath = useDispatch()
  const user = useSelector((state) => state.user.user)
  
  // Sử dụng hàm getIPv4Address để lấy địa chỉ IPv4
  

  const checkForm = (email, password) => {
    if (email.length === 0  ) {
      console.log('email emty')
      setErrorEmail(false)
      setIsvalid(false)
      setErrorMessage("Không được để trống!")
      
    }  
    
    if (password.length === 0) {
      console.log('password emty')
      setErrorPassword(false)
      setIsvalid(false)
      setErrorMessage("Không được để trống!")
    } 
  }

  const btnLogin = async () => {
    console.log('btnLogin')
    try {
      if (errorEmail == true && errorPassword == true && isValid == true) {
        console.log('valid')
        const res = await AxiosIntance().post("user/api/login", {
          password: password,
          email: email
        })
        // disPath({
        //   type: "LOGIN",
        //   email: email,
        //   password: password
        // })
        if (user.result == true) {
          console.log(res.user)
          navigation.navigate("BottomTab")
          ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.LONG);
      }
    }
    } catch (error) {
      console.log("AxiosIntance",error);
      ToastAndroid.show('Đăng nhập thất bại!', ToastAndroid.LONG);
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
            setErrorEmail(validateEmail(text))
            setIsvalid(true)
            console.log(errorEmail)
            setErrorMessage("Email không hợp lệ!")
          }}
        />
        {!errorEmail && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            {errorMessage}
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
            setErrorPassword(isValidEmpty(text))
            setIsvalid(true)
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
            Không được để trống!
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

        <View style={{marginTop: 30,}}>
          <UIButtonPrimary text="Đăng Nhập"
            onPress = {() => {
              checkForm(email, password) 
              btnLogin()
            }}
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
