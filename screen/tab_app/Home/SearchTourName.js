import { FlatList, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import ItemActive from '../../../component/Tab_item/ItemActive';
import { useEffect } from 'react';
import { useState } from 'react';
import AxiosIntance from '../../../constant/AxiosIntance';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR } from '../../../constant/Themes';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Loading from '../../Loading';
import { useNavigation } from '@react-navigation/native';
const SearchTourName = (props) => {
  const {  route } = props;
  const navigation = useNavigation()
  const { nameDomain } = route.params;
  const [loading, setLoading] = useState(false)
  const namee = nameDomain;
  const [SearchNameTour, setSearchNameTour] = useState([])

  useEffect(() => {
    try {

      const getSearchTour = async () => {
        setLoading(true)
        const respone = await AxiosIntance().get("/tour/api/list/name?keyword=" + namee + "");
        console.log(respone)
        if (respone) {
          setSearchNameTour(respone.tours);
          setLoading(false)
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

  if (loading) {
    return(
    <Loading></Loading>
    )
  }

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
        renderItem={({ item }) => <ItemActive dulieu={item} navigation={navigation}/>}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>

  )
}

export default SearchTourName

const styles = StyleSheet.create({})