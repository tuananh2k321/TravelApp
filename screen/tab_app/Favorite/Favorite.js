import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image,Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR, SIZES } from '../../../constant/Themes'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Item_wishlist from '../../../component/Tab_item/Item_wishlist'


handleDelete = (itemId) => {
  // Xử lý xóa item với id được truyền vào
  console.log('Item ID:', itemId);
};
const Favorite = (props) => {
    const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.wishlist}>Yêu thích</Text>
      <SwipeListView
        style={{ zIndex: 1 ,marginBottom:69}}
        data={data}
        renderItem={({ item }) =>  <Item_wishlist dulieu={item} navigation={navigation}/>}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderHiddenItem={(data, rowMap) => (
          <View style = {styles.itemDelete}>
            <TouchableOpacity style={styles.buttonDelete}
              onPress={() => {
                Alert.alert('Delete', "Bạn có muốn xóa không? ");
                this.handleDelete(data.item.id);
              }}>
              <Ionicons name="trash" size={35} color="#ffffff" style={{ flexDirection: 'row', justifyContent: 'center' }} />
            </TouchableOpacity>
            </View>

        )}
        rightOpenValue={-90}
      />
        
    </SafeAreaView>
  )
}

export default Favorite

const styles = StyleSheet.create({
    container:{
        padding:15,
        width:SIZES.width,
        height:SIZES.height,
        flexDirection:'column',
        backgroundColor:COLOR.white,
    },
    wishlist:{
        fontStyle:'normal',
        fontWeight:'bold',
        fontSize:25,
        lineHeight:38,
        color:'#000000',
        marginBottom:10
    },
    itemDelete: {
      flexDirection: 'row',
      justifyContent: "flex-end",
    },
    buttonDelete: {
      width: 90, 
      height: 132,
      backgroundColor: '#39C4FF', 
      justifyContent: 'center',
      alignItems: 'center'
    },
   
    
})

const data = [
    {
        id: '1',
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    {
        id: '2',
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    {
        id: '3',
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    {
        id: '4',
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    {
        id: '5',
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    
]