import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import {
  isValidNumberId,
  isValidCVV,
} from '../utilies/Validations';

const Payment = () => {
    const [numberID, setNumberID] = useState('');
    const [CVV, setCVV] = useState('');
    // error
    const [errorNumberID, setErrorNumberID] = useState('');
    const [errorCVV, setErrorCVV] = useState('');
    const isValidOK = () => numberID.length > 0 && CVV.length > 0 
    && isValidCVV(CVV) == true && isValidNumberId(numberID) == true
    return (
        <View style={styles.container}>
            <View style={styles.groupHeader}>
                <Ionicons name="arrow-back" size={20} color="#000000" />
                <Text style={styles.header}>Sự chi trả</Text>
            </View>
            <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#1F4352', '#227092',]} style={styles.card}>
                <Text style={styles.name}>JOHN DOE</Text>
                <View style={styles.groupItem}>
                    <Text style={styles.title}>Account Balance</Text>
                    <Text style={styles.money}>$536.80</Text>
                </View>
                <View style={styles.groupItem}>
                    <Text style={styles.title}>Master Card</Text>
                    <Text style={styles.cardID}>744 *** *** 937</Text>
                </View>
                <View style={styles.groupTwoCircle}>
                    <Text style={styles.circle1}></Text>
                    <Text style={styles.circle2}></Text>
                </View>
            </LinearGradient>
            <View style={styles.groupForm}>
        <Text style={styles.lable}>Số thẻ</Text>
        <TextInput style={styles.input}
        onChangeText={(text) => {
          setErrorNumberID(isValidNumberId(text) == true ?
                `` : 'Số thẻ không được trống');
          setNumberID(text)
        }}/>
        <Text style = {styles.error}>{errorNumberID}</Text>
      </View>
      <View style={styles.groupForm}>
        <Text style={styles.lable}>CVV</Text>
        <TextInput style={styles.input} 
        onChangeText={(text) => {
          setErrorCVV(isValidCVV(text) == true ?
                `` : 'CVV không được trống');
          setCVV(text)
        }}/>
        <Text style = {styles.error}>{errorCVV}</Text>
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
          alert(`Số thẻ: ${numberID}, CVV: ${CVV}`);
        }}>
          <Text style={styles.textButton}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 15,
    },
    groupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
    },
    header: {
        fontSize: 12,
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
    card: {
        width: '100%',
        height: 214,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 24,
        padding: 24,
        marginBottom: 25
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
        marginTop: 15
      },
      button: {
        width: 173.5,
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
      groupTwoCircle: {
        width: '100%',
        height: 19,
        position: 'relative',
      },
      circle1: {
        position: 'absolute',
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFFFFF47',
      },
      circle2: {
        position: 'absolute',
        right: 17,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFFFFF47',
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