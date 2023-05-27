import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Item_wishlist from '../Tab_item/Item_wishlist'

const Favorite = (props) => {
    const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.wishlist}>Yeu thich</Text>
        <View style={styles.wishlist_list}>
            <FlatList style={{height:500,bottom:20}}
        data={data}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({item}) => <Item_wishlist dulieu={item} navigation={navigation}/>}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      >
      </FlatList>
        </View>
    </SafeAreaView>
  )
}

export default Favorite

const styles = StyleSheet.create({
    container:{
        marginStart:20,
        marginEnd:20,
        marginTop:40,
        flexDirection:'column',
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
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    {
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    {
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    {
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    {
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        start:4.8,
        view:100,
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'2 ngay 1 dem',
        price:10,
        address:'songlong'
    },
    
]