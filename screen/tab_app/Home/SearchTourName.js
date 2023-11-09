import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import ItemActive from '../../../component/Tab_item/ItemActive';
import { useEffect } from 'react';
import { useState } from 'react';
import AxiosIntance from '../../../constant/AxiosIntance';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR } from '../../../constant/Themes';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

const SearchTourName = (props) => {
  const { navigation, route } = props;
  const { nameDomain } = route.params;

  const namee = nameDomain;
  const [SearchNameTour, setSearchNameTour] = useState([])

  useEffect(() => {
    try {
      const getSearchTour = async () => {
        const respone = await AxiosIntance().get("/tour/api/search/name?keyword= " + namee + "");
        if (respone.result) {
          setSearchNameTour(respone.tours);

        } else {
          ToastAndroid.show("Lấy dữ liệu không ok", ToastAndroid.SHORT)
        }
      }
      getSearchTour();

      return () => { }
    } catch (error) {
      console.log('errrrrrrror', error)
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1, marginBottom: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 10}}>
        <TouchableOpacity style={{marginStart: 20}} onPress={() => navigation.goBack(null)}>
          <FontAwesome5 name={"arrow-left"} size={16} color="#000000" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black', }}>{namee}</Text>
        <View  style={{marginEnd: 20}}/>
      </View>
      <FlatList
        data={SearchNameTour}
        renderItem={({ item }) => <ItemActive dulieu={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>

  )
}

export default SearchTourName

const styles = StyleSheet.create({})