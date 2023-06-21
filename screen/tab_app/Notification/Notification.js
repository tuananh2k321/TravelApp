import { StyleSheet, Text, View,Image,FlatList } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import Item_notification from '../../../component/Tab_item/Item_notification'
import { COLOR, SIZES } from '../../../constant/Themes'

const Notification = (props) => {
    const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.notification}>Thông Báo</Text>
        <View style={styles.notification_list}>
            <Text style={{fontStyle:'normal',fontWeight:'600',fontSize:14,lineHeight:21,color:'#000000',marginBottom:-10}}>Hôm nay</Text>
            <FlatList 
        data={data}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({item}) => <Item_notification dulieu={item} navigation={navigation}/>}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      >
      </FlatList>
      {/* <SwipeListView
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => <Item_notification dulieu={item}/>}
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
          rightOpenValue={-75}
        /> */}
        </View>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
    container:{
        marginTop:15,
        padding:15,
        width:SIZES.width,
        backgroundColor:COLOR.white,
        justifyContent:'center'
    },
    notification:{
        fontStyle:'normal',
        fontWeight:'600',
        fontSize:25,
        lineHeight:38,
        color:'#000000'
    },
    notification_list:{
        marginTop:33,
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
    },
    list_product:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
    },
    
    
})

const data = [
    {
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        content:'Được mệnh danh là hòn đảo tình yêu, đảo Jeju luôn khiến khách du lịch ngỡ ngàng bởi cảnh sắc thiên nhiên tuyệt đẹp, thơ mộng và không khí trong lành, mát mẻ. Nếu bạn đang có kế hoạch khám phá xứ sở kim chi và hòn đảo thiên đường này thì chắc chắn không thể bỏ qua thông tin thời tiết đúng không nào? Vậy hãy cùng chúng tôi cập nhật ngay thời tiết đảo Jeju để bắt sóng thời điểm vàng giúp bạn có phương án chuẩn bị chu đáo nhất cho chuyên đi của mình thêm trọn vẹn nhé.',
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'12h ago'
    },
    {
        title:'Sự chuyển biến thú vị của thời tiết đảo Jeju',
        content:'Nằm trong đới khí hậu ôn đới nên thời tiết đảo Jeju cũng được chia làm 4 mùa rõ rệt. Tuy nhiên, đây cũng là nơi có khí hậu tuyệt vời nhất xứ sở Kim chi, không khí mát mẻ quanh năm. Mỗi mùa tại đảo sẽ đem đến cho du khách những trải nghiệm du lịch vô cùng ấn tượng.',
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/tTakuUEa-image.png?tr=dpr-2,w-675',
        days:'12h ago'
    },
    {
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        content:'Được mệnh danh là hòn đảo tình yêu, đảo Jeju luôn khiến khách du lịch ngỡ ngàng bởi cảnh sắc thiên nhiên tuyệt đẹp, thơ mộng và không khí trong lành, mát mẻ. Nếu bạn đang có kế hoạch khám phá xứ sở kim chi và hòn đảo thiên đường này thì chắc chắn không thể bỏ qua thông tin thời tiết đúng không nào? Vậy hãy cùng chúng tôi cập nhật ngay thời tiết đảo Jeju để bắt sóng thời điểm vàng giúp bạn có phương án chuẩn bị chu đáo nhất cho chuyên đi của mình thêm trọn vẹn nhé.',
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'12h ago'
    },
    {
        title:'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
        content:'Được mệnh danh là hòn đảo tình yêu, đảo Jeju luôn khiến khách du lịch ngỡ ngàng bởi cảnh sắc thiên nhiên tuyệt đẹp, thơ mộng và không khí trong lành, mát mẻ. Nếu bạn đang có kế hoạch khám phá xứ sở kim chi và hòn đảo thiên đường này thì chắc chắn không thể bỏ qua thông tin thời tiết đúng không nào? Vậy hãy cùng chúng tôi cập nhật ngay thời tiết đảo Jeju để bắt sóng thời điểm vàng giúp bạn có phương án chuẩn bị chu đáo nhất cho chuyên đi của mình thêm trọn vẹn nhé.',
        image:'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
        days:'12h ago'
    }
]