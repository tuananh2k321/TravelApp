import React, {useEffect, useState} from 'react';
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
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import {
  isValidEmpty,
  validateEmail,
} from '../../constant/Validation';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Loading'


export default Login = props => {

  const {navigation} = props;
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsvalid] = useState(false);

  const [isLoading, setIsLoading] = useState(false)
  const disPath = useDispatch();

  const [messageLogin, setMessageLogin] = useState('');

  // LOGIN FACEBOOK
  async function onFacebookButtonPress() {
    
    try {
      // Thực hiện đăng nhập với quyền truy cập 'public_profile' và 'email'
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_photos']);
      
      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }
  
      // Lấy AccessToken
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
  
      // Lấy thông tin người dùng từ Facebook
      const responseInfoCallback = (error, result) => {
        if (error) {
          throw new Error('Error fetching user info: ' + error.toString());
        } else {
          console.log('User info:', result);
          disPath({
            type: "LOGIN-FB",
            payload: [result.id, result.name]
          })
          setIsLoading(true)
        }
      };
  
      const infoRequest = new GraphRequest('/me', {
        parameters: {
          fields: {
            string: 'id,name,picture'
          }
        }
      }, responseInfoCallback);
  
      new GraphRequestManager().addRequest(infoRequest).start();
  
      return data;
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  }

  // LOGIN GOOGLE
  GoogleSignin.configure({
    webClientId: '579542678002-r834j996aqj9nst5gmqf09kmh93n54or.apps.googleusercontent.com',
  });
  
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      return userCredential;
    } catch (error) {
      // Xem thông tin lỗi chi tiết
  console.error('Lỗi đăng nhập:', error);

  // In thông tin lỗi chi tiết
  if (error.message) {
    console.error('Message:', error.message);
  }

  if (error.code) {
    console.error('Code:', error.code);
  }
    }
  }
  
  async function handleGoogleSignIn() {
    try {
      const userCredential = await onGoogleButtonPress();
      // Đăng nhập thành công
      const user = userCredential.user;
      console.log('Người dùng đã đăng nhập thành công:', user.displayName);
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error('Lỗi đăng nhập:', error);
    }
  }



  //const [user, setUser] = useState(null)
  const user = useSelector(state => state.user);

  const checkForm = (email, password) => {
    if (email.length === 0) {
      console.log('email emty');
      setErrorEmail(false);
      setIsvalid(false);
      setErrorMessage('Không được để trống!');
    }

    if (password.length === 0) {
      console.log('password emty');
      setErrorPassword(false);
      setIsvalid(false);
      setErrorMessage('Không được để trống!');
    }
  };

  const btnLogin = async () => {
    console.log('btnLogin');
    try {
      if (errorEmail == true && errorPassword == true && isValid == true) {
        console.log('valid');
        // Thực hiện dispatch action "LOGIN"
        disPath({
          type: 'LOGIN',
          payload: [email, password],
        });
      }
    } catch (error) {
      console.log('AxiosIntance', error);
      ToastAndroid.show('Đăng nhập thất bại!', ToastAndroid.LONG);
    }
  };

  // Sử dụng useEffect để theo dõi thay đổi trong Redux store
  useEffect(() => {
    // Kiểm tra nếu user.data.result là true, tức là đăng nhập thành công
    if (user.data.result) {
      console.log('Login user: ' + JSON.stringify(user.user));
      setIsLoading(false)
      // Lưu token vào AsyncStorage
      AsyncStorage.setItem('token', user.token);

      // Điều hướng sau khi đăng nhập thành công
      navigation.navigate('BottomTab');

      // Hiển thị thông báo thành công
      //ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.LONG);
    } else {
      // Xử lý trường hợp đăng nhập thất bại
      //ToastAndroid.show('Đăng nhập thất bại!', ToastAndroid.LONG);
      setMessageLogin(user.data.message);
    }
  }, [user]);

  if (isLoading) {
    return (
      <Loading></Loading>
    )
  }

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          backgroundColor: COLOR.white,
          padding: 15,
          width: SIZES.width,
          //height: SIZES.height,
          justifyContent: 'center',
          paddingVertical: 20,
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
            setEmail(text);
            setErrorEmail(validateEmail(text));
            setIsvalid(true);
            console.log(errorEmail);
            setErrorMessage('Email không hợp lệ!');
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
          Mật khẩu
        </Text>

        <UITextInput
          hintText="Nhập mật khẩu của bạn"
          isIconRight={true}
          isTextEntry={isHidePassword}
          icon={ICON.eye}
          onPress={() => setIsHidePassword(!isHidePassword)}
          borderError={errorPassword}
          onChangeText={text => {
            setPassword(text);
            setErrorPassword(isValidEmpty(text));
            setIsvalid(true);
            console.log(errorPassword);
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
        <TouchableOpacity onPress={() => navigation.navigate('SelectOptions')}>
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
          <UIButtonPrimary
            text="Đăng Nhập"
            onPress={() => {
              checkForm(email, password);
              btnLogin();
            }}
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
          {messageLogin}
        </Text>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
          <View style={{flex: 1, height: 1, backgroundColor: COLOR.border}} />
          <Text style={{paddingHorizontal: 10}}>Hoặc đăng nhập với</Text>
          <View style={{flex: 1, height: 1, backgroundColor: COLOR.border}} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <TouchableOpacity
            onPress={() => handleGoogleSignIn()}
            style={{flex: 1, marginRight: 10}}>
            <View
              style={{
                flexDirection: 'row',
                height: 60,
                justifyContent: 'center',
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
                  marginLeft: 10,
                }}>
                Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={() => onFacebookButtonPress()}
          style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                height: 60,
                justifyContent: 'center',
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
                  marginLeft: 10,
                }}>
                Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
          <Text>Bạn chưa có tài khoản?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: COLOR.primary,
                fontWeight: 'bold',
                marginLeft: 5,
              }}>
              Đăng kí
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
