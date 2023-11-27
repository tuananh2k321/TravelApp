import { NativeEventEmitter, NativeModules, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
const { PayZaloBridge } = NativeModules;
export default function TestZalopay() {
  
  const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
  console.log('PayZaloBridge', PayZaloBridge)
    // useEffect (() => {
    //   console.log('PayZaloBridge', PayZaloBridge)
    //     // Set up the event listener
    //     const subscription = payZaloBridgeEmitter.addListener(
    //       'EventPayZalo',
    //       (data) => {
    //         if (data.returnCode === 1) {
    //           alert('Giao dịch thành công!');
    //         } else {
    //           alert('Giao dịch thất bại!');
    //         }
    //       }
    //     );
    
    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //       subscription.remove();
    //     };
    //   }, []);

  return (
    <View>
      <Text>TestZalopay</Text>
    </View>
  )
}

const styles = StyleSheet.create({})