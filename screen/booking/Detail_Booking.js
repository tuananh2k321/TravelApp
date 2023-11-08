import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  validateEmail,
  isValidName,
  isValidNumberId,
  validatePhoneNumber,
  isValidQuantity,
  isLimitPerson
} from '../../constant/Validation';

const windowWidth = Dimensions.get('window').width - 90;


const Detail_Booking = (props) => {
  const { navigation, route } = props;
  const { id, childrenPrice, adultPrice, image, tourName, limitedPerson } = route.params;
  //State for validating
  const [errorName, setErrorName] = useState('');
  const [errorQuantity, setErrorQuantity] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorNumberId, setErrorNumberId] = useState('');
  //State for store
  const [name, setName] = useState('');
  const [quantityAdult, setQuantityAdult] = useState('1');
  const [quantityChildren, setQuantityChildren] = useState("0");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [numberId, setNumberId] = useState('');

  const quantity = Number(quantityAdult) + Number(quantityChildren);
  let price = Number(quantityAdult) * Number(adultPrice) + Number(quantityChildren) * Number(childrenPrice);
  price = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  const isValidOK = () => name.length > 0 && quantityAdult.length > 0
    && isValidName(name) == true && isValidQuantity(quantityAdult) == true && isLimitPerson(quantity, limitedPerson) == true
  // const isValidOK = () => email.length > 0 && name.length > 0 && quantity.length > 0
  //   && phoneNumber.length > 0 && numberId.length > 0 && validateEmail(email) == true
  //   && isValidName(name) == true && isValidNumberId(numberId) == true && validatePhoneNumber(phoneNumber) == true
  //   && isValidQuantity(quantity) == true
  // const quantity = () => {
  //   if((quantityAdult + quantityChildren) > limitedPerson) {
  //     return Alert.alert("Số lượng cho phép là "+limitedPerson+" người");
  //   }
  //   if(quantityAdult.length < 0) {
  //     return "Tên khách hàng không được trống"
  //   }
  // };
  if (isLimitPerson(quantity, limitedPerson) == false) {
    Alert.alert("Số lượng cho phép là " + limitedPerson + " người");
  }
  return (
    <View style={styles.container}>
      <View style={styles.groupName}>
        <Image style={styles.image} source={{ uri: image }} resizeMode='stretch' />
        <View style={{ marginStart: 10 }}>
          <Text style={styles.name}>
            {
              tourName.length > 40 ? tourName.slice(0, 90) + "..." : tourName
            }
          </Text>
          <Text style={styles.order}>Order number #{id}</Text>
        </View>
      </View>

      <View style={styles.groupTotalPrice}>
        <View style={styles.groupPrice}>
          <Text style={styles.totalPrice}>Tổng tiền </Text>
          <Text style={[styles.totalPrice, { fontSize: 10 }]}>(incl VAT)</Text>
        </View>
        <View style={styles.groupPrice}>
          <Text style={styles.money}>{price}/</Text>
          <Text style={[styles.money, { fontWeight: '400' }]}>{quantity}Người</Text>
        </View>
      </View>

      <View style={styles.groupForm}>
        <Text style={styles.lable}>Tên khách hàng</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setErrorName(isValidName(text) == true ?
              `` : 'Tên khách hàng không được trống');
            setName(text)
          }} />
        <Text style={styles.error}>{errorName}</Text>
      </View>
      <View style={[styles.groupForm, { flexDirection: 'row', justifyContent: "space-between" }]}>
        <View style={{ width: '48%' }}>
          <Text style={styles.lable}>Số lượng người lớn</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => {
              // setErrorQuantity(isValidQuantity(text) == true ?
              //   `` : 'Số khách hàng không được trống');
              setErrorQuantity(isValidQuantity(text) == true ?
                `` : 'Số khách hàng không được trống');
              setQuantityAdult(text)
            }}
            value={quantityAdult} />
          <Text style={styles.error}>{errorQuantity}</Text>
        </View>
        <View style={{ width: '48%' }}>
          <Text style={styles.lable}>Số lượng trẻ em</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => {
              setQuantityChildren(text)
            }}
            value={quantityChildren} />
        </View>
      </View>
      {/* <View style={styles.groupForm}>
        <Text style={styles.lable}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setErrorPhoneNumber(validatePhoneNumber(text) == true ?
              `` : 'Số điện thoại không đúng định dạng');
            setPhoneNumber(text)
          }} />
        <Text style={styles.error}>{errorPhoneNumber}</Text>
      </View>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setErrorEmail(validateEmail(text) == true ?
              `` : 'Email không hợp lệ');
            setEmail(text)
          }} />
        <Text style={styles.error}>{errorEmail}</Text>
      </View>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>Số ID</Text>
        <View style={styles.groupID}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            secureTextEntry={true}
            onChangeText={(text) => {
              setErrorNumberId(isValidNumberId(text) == true ?
                `` : 'Số ID lớn hơn 10 kí tự');
              setNumberId(text)
            }} />
          <Text style={styles.error}>{errorNumberId}</Text>
          <Ionicons style={styles.iconEye} name="eye" size={20} color="#000000" />
        </View>

      </View> */}
      <View style={styles.groupButton}>
        <TouchableOpacity style={[styles.button,
        { backgroundColor: isValidOK() == true ? '#0FA3E2' : 'gray' }]}
          disabled={isValidOK() == false}
          onPress={() => navigation.navigate('Payment_Method', { id: id, childrenPrice: childrenPrice, adultPrice: adultPrice, name: name, adult: quantityAdult, children: quantityChildren, image: image, tourName: tourName })}>
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
    width: '100%',
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
    alignItems: 'center',
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
  },
  groupName: {
    flexDirection: 'row',

  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#000000',
    textAlign: 'left',
  },
  groupTotalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#0000001A",
    marginTop: 18
  },
  name: {
    width: windowWidth,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#000000',
    textAlign: 'left',
  },
})