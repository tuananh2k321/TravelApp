import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SIZES } from "../../../constant/Themes";
import { SafeAreaView } from 'react-native-safe-area-context'

const ItemOnboard = (props) => {
  const { data, navigation } = props;

  // const clickNext = () => {
  //   console.log("Click Next");
  //   navigation.navigate(data._id );
  // }

  return (
    
      <View style={styles.container}>
        <Image style={[styles.image, { resizeMode: 'stretch' }]} source={data.image}/>
        <View style={styles.absolute}>
          <Text style={styles.txt}>{data.title}</Text>
          <Text style={styles.txtdetail}>{data.description}</Text>
          {/* <TouchableOpacity style={styles.touch}>
            <Text style={styles.txtnext}>Tiếp theo</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    

  )
}

export default ItemOnboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  image: {
    width: SIZES.width,
    height: SIZES.height
  },
  absolute: {
    width: '90%',
    height: '35%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '2%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  txt: {
    marginHorizontal: 25,
    fontSize: 30,
    color: 'black',
    fontWeight: '600',
  },
  txtdetail: {
    marginHorizontal: 25,
    marginVertical: 10,
    marginBottom: 50,
    color: 'black',
    fontSize: 14,
    fontWeight: '400'
  },
  touch: {
    width: '80%',
    height: 50,
    backgroundColor: '#0FA3E2',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtnext: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14
  }
})