import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FormAdult from './FormAdult1';
import { Button } from 'react-native-paper';

const FormAll1 = (props) => {
    const { navigation, route } = props;
    const { adult, children } = route.params;
    console.log('aadult', adult)
    console.log('children', children)
    let adult1 = Number(adult);
    let children1 = Number(children);

    const [formData, setFormData] = useState([]);
    const handleDataChange = (index, data) => {
        const newData = [...formData];
        newData[index] = data;
        setFormData(newData);
      };
      const handleNext = () => {
        navigation.navigate('Abcd', { formData });
        console.log('data', formData)
      };

  return (
    <ScrollView>
      <View>
        {[...Array(adult1)].map((_, index) => (
          <FormAdult key={index} index={index} onDataChange={handleDataChange} />
        ))}
      </View>
      <Button title="Tiếp tục" onPress={handleNext} />
    </ScrollView>
  )
}

export default FormAll1

const styles = StyleSheet.create({})