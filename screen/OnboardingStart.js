import { StyleSheet, Text, View, SafeAreaView, useWindowDimensions, Button, Image } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from './bottom-sheet/BottomSheet'

const OnboardingStart = () => {
  const bottomSheetRef = useRef(null);
  const { height } = useWindowDimensions();
  const pressHandler = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []); 



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Button
          title='OPEN'
          onPress={() => {
            pressHandler();
          }} />
     <BottomSheet
          ref={bottomSheetRef}
          activeHeight={height * 0.5}
          backgroundColor={'#DAD3C8'}
          backDropColor={'white'}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={styles.imageContainer}>
               <Image 
               style={styles.image} 
               source={require('../../TravelApp/assets/icon/bottom.png')} />
              </View>
              <View style={styles.textContainer}>
              <Text style={styles.text}>Royal Palm Sofa</Text>
              <Text style={styles.text}>Vissle dark Blue/Kabusa dark Navy</Text>
              {/* <Text style={styles.textPrice}>Price: $100</Text> */}
            </View>
            </View>
            <View style={styles.button}>
                  <Text style={styles.buttonText}>ADD TO CHART</Text>
                </View>
          </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default OnboardingStart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContaier: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: undefined,
    aspectRatio: 1,
  },
  textContainer: {
    marginHorizontal: 20,
  },
  text: {
    color: '#000000',
    fontSize: 16,
  },
  textExample2: {
    color: '#000000',
    fontSize: 26,
  },
  textPrice: {
    color: '#000000',
    marginVertical: 30,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 16,
    marginHorizontal: 15,
    marginBottom: 35,
    borderRadius: 16,
  },
  buttonText: {
    color: '#DAD3C8',
  },
})