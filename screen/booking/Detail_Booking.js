import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SIZES } from '../../constant/Themes';

const windowWidth = Dimensions.get('window').width - 90;


const Detail_Booking = (props) => {
  const { navigation, route } = props;
  const { id, childrenPrice, adultPrice, image, tourName, limitedPerson, adultAge, childrenAge, availablePerson } = route.params;
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
  let priceChildren = Number(childrenPrice);
  priceChildren = priceChildren.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  let priceAdult = Number(adultPrice);
  priceAdult = priceAdult.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  const isValidOK = () => name.length > 0 && quantityAdult.length > 0
    && isValidName(name) == true && isValidQuantity(quantityAdult) == true && isLimitPerson(quantity, availablePerson) == true
  if (isLimitPerson(quantity, availablePerson) == false) {
    Alert.alert("Số lượng cho phép là " + availablePerson + " người");
  }
  return (
    <View style={styles.container}>

      <View >
        <KeyboardAwareScrollView>

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

          <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, paddingBottom: 10 }}>
            <View style={styles.groupTotalPrice}>
              <View style={styles.groupPrice}>
                <Text style={styles.totalPrice}>Giá người lớn </Text>
                <Text style={[styles.totalPrice, { fontSize: 14 }]}>({adultAge} tuổi):</Text>
              </View>
              <View style={styles.groupPrice}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: 'black' }}>{priceAdult}</Text>
              </View>
            </View>

            <View style={styles.groupTotalPrice}>
              <View style={styles.groupPrice}>
                <Text style={styles.totalPrice}>Giá trẻ em </Text>
                <Text style={[styles.totalPrice, { fontSize: 14 }]}>({childrenAge} tuổi):</Text>
              </View>
              <View style={styles.groupPrice}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: 'black' }}>{priceChildren}</Text>
              </View>
            </View>

            <View style={styles.groupTotalPrice}>
              <View style={styles.groupPrice}>
                <Text style={styles.totalPrice}>Số lượt còn trống :</Text>
              </View>
              <View style={styles.groupPrice}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: 'black' }}>{availablePerson}</Text>
              </View>
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
          <View style={[styles.groupForm, { flexDirection: 'row', justifyContent: "space-between", }]}>
            <View style={{ width: '48%' }}>
              <Text style={styles.lable}>Số lượng người lớn</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => {
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


        </KeyboardAwareScrollView>
      </View >

      <View style={styles.groupButton}>
        <View style={styles.groupPrice}>
          <Text style={styles.money}>{price}/</Text>
          <Text style={[styles.money, { fontWeight: '400', fontSize: 14 }]}>{quantity}Người</Text>
        </View>
        <TouchableOpacity style={[styles.button,
        { backgroundColor: isValidOK() == true ? '#0FA3E2' : 'gray' }]}
          disabled={isValidOK() == false}
          onPress={() => navigation.navigate('FormAll', { id: id, childrenPrice: childrenPrice, adultPrice: adultPrice, name: name, adult: quantityAdult, children: quantityChildren, image: image, tourName: tourName })}>
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
    padding: 15,
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
    fontSize: 14,
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
    paddingVertical: 10,
    marginTop: 4
  },
  groupForm: {
    marginTop: 15
  },
  button: {
    width: '50%',
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
  money: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A7BAB",
    lineHeight: 18
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
    marginTop: 8
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