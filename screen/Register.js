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
import CheckBox from '@react-native-community/checkbox';
import {
  isValidEmpty,
  validateDateOfBirth,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from '../constant/Validation';
import DatePicker from 'react-native-date-picker';
import AxiosIntance from '../constant/AxiosIntance';

export default Register = props => {
  const {navigation} = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [isHidePassword, setIsHidePassword] = useState(true);
  const [isHidePassword2, setIsHidePassword2] = useState(true);
  const [errorName, setErrorName] = useState(true);
  const [errorLastName, setErrorLastName] = useState(true);
  const [errorPhone, setErrorPhone] = useState(true);
  const [errorBirthday, setErrorBirthday] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorPassword2, setErrorPassword2] = useState(true);

  const [notifyPassword, setNotifyPassword] = useState("")

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  const [date, setDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  
  const checkPasswordRepeat = (rePassword, password) => {
    if (password === rePassword) {
      setErrorPassword2(true)
      console.log(rePassword)
      btnRegister()
    } else {
      setErrorPassword2(false)
      setNotifyPassword("Không trùng mật khẩu")
    }
  }

  const btnRegister = async () => {
    const res = await AxiosIntance()
    .post("user/api/register", {
      name: name,
      lastName: lastName,
      phoneNumber: phoneNumber,
      dob: dob,
      email: email,
      password: password,
    })
    if (res.result == true) {
      console.log(res.user)
      navigation.navigate('VerifyCode')
    }
  }


  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          backgroundColor: COLOR.white,
          padding: 15,
          width: SIZES.width,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', top: 15, left: 10}}
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

        <UITextInput
          hintText="Tuấn Anh"
          borderError={errorName}
          onChangeText={text => {
            setName(text)
            setErrorName(isValidEmpty(text));
          }}
        />

        {!errorName && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Không được để trống !
          </Text>
        )}

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Họ
        </Text>

        <UITextInput
          hintText="Trần"
          borderError={errorLastName}
          onChangeText={text => {
            setLastName(text)
            setErrorLastName(isValidEmpty(text));
          }}
        />

        {!errorLastName && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Không được để trống !
          </Text>
        )}
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
          hintText=""
          keyboardType="numeric"
          borderError={errorPhone}
          onChangeText={text => {
            setPhoneNumber(text)
            setErrorPhone(validatePhoneNumber(text));
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

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Ngày sinh
        </Text>

        <UITextInput
          hintText="01/05/2003"
          isIconRight={true}
          icon={ICON.calendar}
          defaultValue={date.toString()}
          onPress={() => setOpen(true)}
          borderError={errorBirthday}
          onChangeText={text => {
            setDob(text)
            setErrorBirthday(validateDateOfBirth(text));
          }}
        />

        {!errorBirthday && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Ngày sinh không hợp lệ !
          </Text>
        )}

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
          hintText="tuananh123@gmail.com"
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
          Mật khẩu
        </Text>

        <UITextInput
          hintText=""
          isTextEntry={isHidePassword}
          onPress={() => setIsHidePassword(!isHidePassword)}
          isIconRight={true}
          icon={ICON.eye}
          borderError={errorPassword}
          onChangeText={text => {
            setPassword(text)
            setErrorPassword(validatePassword(text));
          }}
        />

        {!errorPassword && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            ít nhất 8 ký tự, ít nhất một chữ cái viết hoa, viết thường, một số!
          </Text>
        )}

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Nhập lại Mật khẩu
        </Text>

        <UITextInput
          hintText=""
          isIconRight={true}
          isTextEntry={isHidePassword2}
          onPress={() => setIsHidePassword2(!isHidePassword2)}
          icon={ICON.eye}
          borderError={errorPassword2}
          onChangeText={text => {
            setRePassword(text)
            setErrorPassword2(
              isValidEmpty(text),
            )
            if (isValidEmpty(text)) {
              setNotifyPassword("Không được để trống")
            }
          }}
        />

        {!errorPassword2 && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            {notifyPassword}
          </Text>
        )}

        

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            tintColors={{true: COLOR.primary}}
            onValueChange={value => setToggleCheckBox(value)}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLOR.detail,
              textDecorationLine: 'underline',
            }}>
            Tôi chấp nhận những điều khoản và quy định
          </Text>
        </View>

        <View style={{marginTop: 30}}>
          <UIButtonPrimary
            text="Tạo tài khoản mới"
            // onPress={() => checkPasswordRepeat(rePassword, password)}
            onPress={() => checkPasswordRepeat(rePassword, password)}

          />
        </View>

        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
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

        <DatePicker
          modal
          open={open}
          androidVariant="iosClone"
          mode="date"
          minimumDate={new Date('1950-12-31')}
          maximumDate={new Date('2005-12-31')}
          date={currentDate}
          onConfirm={date => {
            setOpen(false);
            var day = date.getDate().toString().padStart(2, '0');
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var year = date.getFullYear();
            setDate(day + '/' + month + '/' + year);
            console.log(day + '/' + month + '/' + year);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
