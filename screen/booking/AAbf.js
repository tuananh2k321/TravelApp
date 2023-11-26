import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Abcd = (props) => {
    const { navigation, route } = props;
    const { formData } = route.params;
  return (
    <View>
      <Text>Dữ liệu từ các form:</Text>
      {formData.map((data, index) => (
        <View key={index}>
          <Text>{`Form ${index + 1}: ${JSON.stringify(data)}`}</Text>
        </View>
      ))}
    </View>
  )
}

export default Abcd

const styles = StyleSheet.create({})