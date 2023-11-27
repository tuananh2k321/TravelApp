import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FormAdult from './FormAdult1';
import { Button } from 'react-native-paper';
import FormChildren from './FormChildren';

const FormAll1 = (props) => {
  const { navigation, route } = props;
  const { adult, children } = route.params;
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
    // navigation.navigate('Abcd', { formData });
    console.log('data', formData)
  };

  return (
    <ScrollView>
        {[...Array(adult1)].map((_, index) => (
          <FormAdult key={index} index={index} onDataChange={handleDataChangeAdult} />
        ))}

      {[...Array(children1)].map((_, index) => (
          <FormChildren key={index} index={index} onDataChange={handleDataChangeChildren} />
        ))}
      <Button title="Tiếp tục" onPress={handleNext} />
    </ScrollView>
  )
}

export default FormAll1

const styles = StyleSheet.create({})