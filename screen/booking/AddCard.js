import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  isValidNumberId,
  isValidCVV,
  isValidName
} from '../../constant/Validation';
import AxiosIntance from '../../constant/AxiosIntance';


const AddCard = (props) => {
  const { navigation } = props;
  const [numberID, setNumberID] = useState('');
  const [CVV, setCVV] = useState('');
  const [name, setName] = useState('');
  // error
  const [errorNumberID, setErrorNumberID] = useState('');
  const [errorCVV, setErrorCVV] = useState('');
  const [errorName, setErrorName] = useState('');
  const isValidOK = () => numberID.length > 0 && CVV.length > 0 && name.length > 0
    && isValidCVV(CVV) == true && isValidNumberId(numberID) == true && isValidName(name) == true
  
    const onNewCard = async () => {
      console.log(name, numberID, CVV);
      try {
        const response = await AxiosIntance()
          // .post("/users/register",
          //   { email: emailUser, password: passwordUser });
          .post("/cart/api/addCart",
            { name: name, number: numberID, cvv: CVV});
        // if (response.error == false) {
        //   ToastAndroid.show("Đăng ký thành công!", ToastAndroid.SHORT);
        //   //navigation.navigate('Login');
        // } else {
        //   ToastAndroid.show('Đăng ký thất bại!', ToastAndroid.SHORT);
        // }
        console.log(response);
      } catch (e) {
        console.log(e);
        console.log('Sai');
      }
  
    }
    return (
    <View style={styles.container}>
      <View style={styles.groupHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.header}>New Card</Text>
      </View>

      <View style={styles.groupForm}>
        <Text style={styles.lable}>Name</Text>
        <TextInput style={styles.input}
          onChangeText={(text) => {
            setErrorName(isValidName(text) == true ?
              `` : 'Tên không được bỏ trống');
            setName(text)
          }} />
        <Text style={styles.error}>{errorName}</Text>
      </View>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>Card Number</Text>
        <TextInput style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => {
            setErrorNumberID(isValidNumberId(text) == true ?
              `` : 'Số thẻ lớn hơn 10 kí tự');
            setNumberID(text)
          }} />
        <Text style={styles.error}>{errorNumberID}</Text>
      </View>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>CVV</Text>
        <TextInput style={styles.input}
        keyboardType="numeric"
          onChangeText={(text) => {
            setErrorCVV(isValidCVV(text) == true ?
              `` : 'CVV không đủ 3 kí tự');
            setCVV(text)
          }} />
        <Text style={styles.error}>{errorCVV}</Text>
      </View>

      <View style={styles.groupButton}>
        <TouchableOpacity style={[styles.button,
        { backgroundColor: isValidOK() == true ? '#0FA3E2' : 'gray' }]}
          disabled={isValidOK() == false}
          onPress={onNewCard}>
          <Text style={styles.textButton}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
    color: '#000000',
    marginStart: 30
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: '#ffffff',
    textAlign: 'left',
  },
  money: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#ffffff',
    textAlign: 'left',
  },
  cardID: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#ffffff',
    textAlign: 'left',
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: '#ffffff',
    textAlign: 'left',
  },
  groupItem: {
    marginTop: 6
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
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  groupForm: {
    paddingHorizontal: 15,
    marginTop: 15
  },
  button: {
    width: "100%",
    height: 52,
    borderRadius: 15,
    backgroundColor: '#0FA3E2'
  },
  textButton: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 52,
    letterSpacing: -0.17,
    color: '#FFFFFF',
    textAlign: 'center'
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
  error: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: -0.17,
    color: 'red',
    marginTop: 5
  }

})