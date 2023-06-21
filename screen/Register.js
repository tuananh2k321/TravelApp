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
  const [errorCheckbox, setErrorCheckbox] = useState(false)

  const [notifyPassword, setNotifyPassword] = useState("")

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  const [isValid, setIsvalid] = useState(false);

  const [date, setDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);


  const checkForm = (name, lastName, phoneNumber, dob, email, password, rePassword) => {
    if (name.length === 0  ) {
      console.log('name emty')
      setErrorName(false)
      setIsvalid(false)
    }
    
    if (lastName.length === 0  ) {
      console.log('last name emty')
      setErrorLastName(false)
      setIsvalid(false)
    }  

    if (phoneNumber.length === 0  ) {
      console.log('phone number emty')
      setErrorPhone(false)
      setIsvalid(false)
    }  

    if (dob.length === 0  ) {
      console.log('dob emty')
      setErrorBirthday(false)
      setIsvalid(false)
    } 

    if (email.length === 0  ) {
      console.log('email emty')
      setErrorEmail(false)
      setIsvalid(false)
    }  
    
    if (password.length === 0) {
      console.log('password emty')
      setErrorPassword(false)
      setIsvalid(false)
    } 

    if (rePassword.length === 0) {
      console.log('password emty')
      setErrorPassword2(false)
      setIsvalid(false)
    } 
  }
  
  const btnRegister = async () => {
    // const res = await AxiosIntance()
    // .post("user/api/register", {
    //   name: name,
    //   lastName: lastName,
    //   phoneNumber: phoneNumber,
    //   dob: dob,
    //   email: email,
    //   password: password,
    // })
    // if (res.result == true) {
    //   console.log(res.user)
    //   navigation.navigate('VerifyCode')
    // }
    console.log('register')
    console.log(errorPassword)
    console.log(errorPassword2)
    console.log(isValid)
    if (errorName == true && errorLastName == true && errorPhone == true 
      && errorEmail == true && errorPassword == true && isValid == true
      && errorBirthday == true && errorPassword2 == true && errorCheckbox == true) {
        console.log("valid")
        if (password === rePassword) {
          console.log("valid password repeat")
          setErrorPassword2(true)
          console.log(rePassword)
          navigation.navigate("VerifyCode")
        } else {
          setErrorPassword2(false)
          setNotifyPassword("Không trùng mật khẩu")
        }
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
            setIsvalid(true)
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
            setIsvalid(true)
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
            setIsvalid(true)
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
            console.log(text)
            setDob(text)
            setErrorBirthday(validateDateOfBirth(text));
            setIsvalid(true)
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
            setIsvalid(true)
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
            setIsvalid(true)
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
            onValueChange={value => {
              setToggleCheckBox(value)
              setErrorCheckbox(value)
            }
            }
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: errorCheckbox ? COLOR.detail : "red",
              textDecorationLine: 'underline',
            }}>
            Tôi chấp nhận những điều khoản và quy định
          </Text>
        </View>

        <View style={{marginTop: 30}}>
          <UIButtonPrimary
            text="Tạo tài khoản mới"
            // onPress={() => checkPasswordRepeat(rePassword, password)}
            onPress={() => {
              checkForm(name, lastName, phoneNumber, dob, email, password, rePassword)
              btnRegister()
            }}

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
            setDob(day + '/' + month + '/' + year);
            setErrorBirthday(validateDateOfBirth(day + '/' + month + '/' + year))
            // console.log(day + '/' + month + '/' + year);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
