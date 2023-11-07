import { StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { useEffect } from 'react';
import { useState } from 'react';
import AxiosIntance from '../../../constant/AxiosIntance';
import ItemDeals from '../../../component/Tab_item/ItemDeals'
import React from 'react'

const Deal = (props) => {
  const [TourDeal, setTourDeal] = useState([]);

  useEffect(() => {
    try {
      const getTourDeal = async () => {
        const respone = await AxiosIntance().get("/tour/api/get-all-tour");
        if (respone.result) {
          setTourDeal(respone.tours);

        } else {
          ToastAndroid.show("Lấy dữ liệu không ok", ToastAndroid.SHORT)
        }
      }
      getTourDeal();

      return () => { }
    } catch (error) {
      console.log('errrrrrrror', error)
    }
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', color: '#0FA3E2' }}>Giảm Giá</Text>
        <View style={{ marginEnd: 20 }} />
      </View>
      <View style={{ width: 'auto', height: 'auto', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{marginLeft: 15}}>
          <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>Tưng bừng khuyến mãi</Text>
          <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>Ưu đãi có thể lên đến 20%</Text>
        </View>
        <Image source={require('../../../assets/logo/salee.gif')} style={{width: 220, height: 130}}/>
      </View>
      <FlatList
        data={TourDeal}
        renderItem={({ item }) => <ItemDeals dulieu={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default Deal

const styles = StyleSheet.create({})