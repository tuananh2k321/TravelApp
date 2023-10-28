import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style = {{flex: 1, backgroundColor: "#ffffff", justifyContent:"center", alignItems: "center"}}>
      <ActivityIndicator color={"#0FA3E2"} size={60}/>
      <Text style = {{fontSize: 16, fontWeight: "500"}}>Đang tải dữ liệu...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})