import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  isValidEmail,
  isValidName,
  isValidNumberId,
  isValidPhoneNumber,
  isValidQuantity,
} from '../utilies/Validations';

const Detail_Booking = (props) => {
  //State for validating
  const [errorName, setErrorName] = useState('');
  const [errorQuantity, setErrorQuantity] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorNumberId, setErrorNumberId] = useState('');
  //State for store
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [numberId, setNumberId] = useState('');

  const isValidOK = () => email.length > 0 && name.length > 0 && quantity.length > 0
  && phoneNumber.length > 0 && numberId.length > 0 && isValidEmail(email) == true
  && isValidName(name) == true && isValidNumberId(numberId) == true && isValidPhoneNumber(phoneNumber) == true 
  && isValidQuantity(quantity) == true
  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back-sharp" size={20} color="#000000" />
      <Text style={styles.title}>Chi tiết đặt phòng</Text>
      <Text style={styles.content}>Tận dụng tốt nhất tình yêu bằng cách tạo một tài khoản</Text>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>Tên khách hàng</Text>

        <TextInput 
        style={styles.input} 
        onChangeText={(text) => {
          setErrorName(isValidName(text) == true ?
                `` : 'Tên khách hàng không được trống');
          setName(text)
        }}/>
        <Text style = {styles.error}>{errorName}</Text>
      </View>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>Số khách hàng</Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text) => {
          setErrorQuantity(isValidQuantity(text) == true ?
                `` : 'Số khách hàng không được trống');
          setQuantity(text)
        }}/>
        <Text style = {styles.error}>{errorQuantity}</Text>
      </View>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>Số điện thoại</Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text) => {
          setErrorPhoneNumber(isValidPhoneNumber(text) == true ?
                `` : 'Số điện thoại không được trống');
          setPhoneNumber(text)
        }}/>
        <Text style = {styles.error}>{errorPhoneNumber}</Text>
      </View>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>Email</Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text) => {
          setErrorEmail(isValidEmail(text) == true ?
                `` : 'Email không hợp lệ');
          setEmail(text)
        }}/>
        <Text style = {styles.error}>{errorEmail}</Text>
      </View>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>Số ID</Text>
        <View style={styles.groupID}>
        <TextInput 
        style={styles.input} 
        secureTextEntry = {true} 
        onChangeText={(text) => {
          setErrorNumberId(isValidNumberId(text) == true ?
                `` : 'ID không được trống');
          setNumberId(text)
        }}/>
        <Text style = {styles.error}>{errorNumberId}</Text>
        <Ionicons style={styles.iconEye} name="eye" size={20} color="#000000" />
        </View>
        
      </View>
      <View style={styles.groupButton}>
        <View style={styles.groupPrice}>
          <Text style={styles.price}>$1200/</Text>
          <Text style={[styles.price, { fontSize: 12 }]}>2Người</Text>
        </View>
        <TouchableOpacity style={[styles.button,
        {backgroundColor: isValidOK() == true ? '#0FA3E2' : 'gray'}]}
        disabled = {isValidOK() == false}
        onPress={() => {
          alert(`Name: ${name}, Quantity: ${quantity}, Email: ${email}, 
          Phone: ${phoneNumber}, ID: ${numberId}`);
        }}>
          <Text style={styles.textButton}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Detail_Booking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    letterSpacing: -0.17,
    color: '#000000',
    marginTop: 27
  },
  content: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.17,
    color: '#000000CC',
    marginTop: 5,
  },
  lable: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.17,
    color: '#000000CC',
  },
  input: {
    width: '100%',
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0000001A',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  groupForm: {
    marginTop: 15
  },
  button: {
    width: 173.5,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#0FA3E2',
  },
  textButton: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 52,
    letterSpacing: -0.17,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: -0.17,
    color: '#0A7BAB',
  },
  groupButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 11,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  groupPrice: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupID: {
    position: 'relative',
  },
  iconEye: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  error: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: -0.17,
    color: 'red',
    marginTop: 5
  }
})