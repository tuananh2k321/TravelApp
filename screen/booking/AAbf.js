import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Abcd = (props) => {
    const { navigation, route } = props;
    const { formData } = route.params;
  return (
    <View>
      <Text>Form Data:</Text>
      {/* Display form data */}
      {formData.map((form, index) => (
        <View key={index}>
          <Text>Name: {form.lastName}</Text>
          <Text>Date of Birth: {form.dob}</Text>
          <Text>Gender: {form.gender}</Text>
        </View>
      ))}
    </View>
  )
}

export default Abcd

const styles = StyleSheet.create({})