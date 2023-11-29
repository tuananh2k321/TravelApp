import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FormAdult from './FormAdult1';
import { Button } from 'react-native-paper';
import FormChildren from './FormChildren';

const FormAll1 = (props) => {
  const { navigation, route } = props;
  const { id, childrenPrice, adultPrice, name, adult, children, image, tourName } = route.params;
  console.log('aadult', adult)
  console.log('children', children)
  let adult1 = Number(adult);
  let children1 = Number(children);

  const [formData, setFormData] = useState({
    adults: [],
    children: []
  });

  

  const handleDataChangeAdult = (index, data) => {
    const newData = { ...formData };
    newData.adults[index] = data;
    setFormData(newData);
  };

  const handleDataChangeChildren = (index, data) => {
    const newData = { ...formData };
    newData.children[index] = data;
    setFormData(newData);
  };

  const handleNext = () => {
    // Lấy danh sách người lớn và trẻ em
    const adults = formData.adults || [];
    const children = formData.children || [];

    // Gộp thành một mảng
    const mergedArray = adults.concat(children);
    console.log('mergedArray:', mergedArray)
    navigation.navigate('Payment_Method', { id: id, childrenPrice: childrenPrice, adultPrice: adultPrice, name: name, adult: adult1, children: children1, image: image, tourName: tourName, guestInfo: mergedArray });
  };

  return (
    <View style ={{flex: 1, backgroundColor: "#ffffff"}}>
      <ScrollView >
        <View style={{ paddingBottom: 50, }}>
          {[...Array(adult1)].map((_, index) => (
            <FormAdult key={index} index={index} onDataChange={handleDataChangeAdult} />
          ))}

          {[...Array(children1)].map((_, index) => (
            <FormChildren key={index} index={index} onDataChange={handleDataChangeChildren} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.groupButton}>
        <TouchableOpacity style={[styles.button,
        ]}
          onPress={handleNext}>
          <Text style={styles.textButton}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FormAll1

const styles = StyleSheet.create({
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
})