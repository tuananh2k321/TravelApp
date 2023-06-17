import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR, SIZES } from '../../constant/Themes'

import Item_wishlist from '../../component/Tab_item/Item_wishlist'



const Favorite = (props) => {
    const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.wishlist}>Yêu thích</Text>
        <View style={styles.wishlist_list}>
            <FlatList style={{bottom:20}}
        data={data}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({item}) => <Item_wishlist dulieu={item} navigation={navigation}/>}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      >
      </FlatList>
      {/* <SwipeListView
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => <Item_wishlist dulieu={item}/>}
          renderHiddenItem={(data, rowMap) => (
            <TouchableOpacity
              style={{
                height: 80,
                backgroundColor: '#FFFFFF',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Image
                source={require('../../assets/icon/icon-recycle.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: '#000000',
                  marginRight: 30,
                }}
              />
            </TouchableOpacity>
          )}
          rightOpenValue={-10}
        /> */}
        </View>
    </SafeAreaView>
  )
}

export default Favorite

const styles = StyleSheet.create({
    container:{
        padding:15,
        width:SIZES.width,
        flexDirection:'column',
        backgroundColor:COLOR.white,
        justifyContent:'center'
    },
    wishlist:{
        fontStyle:'normal',
        fontWeight:'600',
        fontSize:25,
        lineHeight:38,
        color:'#000000'
    },
    wishlist_list:{
        marginTop:33,
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
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