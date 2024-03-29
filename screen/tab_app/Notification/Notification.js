import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import Item_notification from '../../../component/Tab_item/Item_notification'
import { COLOR, SIZES } from '../../../constant/Themes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import AxiosIntance from '../../../constant/AxiosIntance';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Loading from '../../Loading'
import { addNotificationAction } from '../../../redux/action/NotificationAction'
import { getToken } from '../../../constant/Util'
import messaging from '@react-native-firebase/messaging';
import { ScrollView } from 'react-native-virtualized-view'


handleDelete = (itemId) => {
  // Xử lý xóa item với id được truyền vào
  console.log('Item ID:', itemId);
};
const Notification = (props) => {
  const { navigation } = props;
  const [dataNotification, setDataNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState()

  const getNotifi = async () => {
    try {
      const response = await AxiosIntance().get("/notification/api/getNotification?userId=" + user.user._id);
      console.log("Check userId: >" + user.user._id)
      //console.log(response);
      if (response.result == true) {
        setDataNotification(response.notify);
        setIsLoading(false);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }
  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    // save the token to the db
    console.log("token of device: " + token);
    setToken(token)
  };


  const addTokenNotifi = async () => {
    try {
      getToken()
      console.log("Check tokendevide >>>>>>>", token);
      const response = await AxiosIntance().get("/tokenNotification/api/addToken?token=" + token + "&userId=" + user.user._id);
      console.log("Check userId: >>>>>>>>>>>" + user.user._id)
      console.log(response);
      if (response.result == true) {
        // setDataNotification(response.notify);
        // setIsLoading(false);
        // setIsLogin(true);
        console.log("add token success")
      } else {
        //setIsLogin(false);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }
  useEffect(() => {
    //console.log("user: "+JSON.stringify(user.user._id))
    getNotifi();
    addTokenNotifi()

  }, [isFocused]);

  const handleRefresh = () => {
    setRefreshing(true);

    // Thực hiện các công việc làm mới dữ liệu ở đây, sau đó cập nhật state data

    // Ví dụ: Sau 2 giây, dừng làm mới và cập nhật dữ liệu

    getNotifi()
    setRefreshing(false);

  };
  const onDeleteNotification = (id) => {
    return Alert.alert(
      "Xóa thông báo này?",
      "Bạn có chắc chắn muốn xóa thông báo này không?",
      [
        // The "Yes" button
        {
          text: "Có",
          onPress: async () => {
            const response = await AxiosIntance().get("/notification/api/deleteNotifi?id=" + id);
            navigation.push("NotificationMain",);
          }

        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Không",
        },
      ]
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
      {
        isLogin == false ?
          (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ backgroundColor: "#39C4FF", borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: "white" }}>Đăng nhập trước khi xem</Text>
              </TouchableOpacity>
            </View>
          )
          : (
            <View>
              {
                isLogin == false ? () => navigation.navigate("Login") :
                  (
                    <View>
                      <Text style={styles.notification}>Thông Báo</Text>
                      {/* <Text style={{ fontStyle: 'normal', fontWeight: '600', fontSize: 14, lineHeight: 21, color: '#000000', marginTop: 20 }}>Hôm nay</Text> */}
                      {
                        dataNotification.length == 0 ?
                          (
                            <View>
                              <Image style={{ width: '100%', height: 400 }} resizeMode='contain' source={require("../../../assets/img/img_no_notification.png")} />
                            </View>
                          ) :
                          (
                            <SwipeListView
                              // style={{ zIndex: 1 }}
                              data={dataNotification}
                              renderItem={({ item }) => <Item_notification dulieu={item} navigation={navigation} />}
                              keyExtractor={item => item._id}
                              showsVerticalScrollIndicator={false}
                              onRefresh={handleRefresh}
                              refreshing={refreshing}
                              renderHiddenItem={({ item }) => (
                                <View style={styles.itemDelete}>
                                  <TouchableOpacity style={styles.buttonDelete}
                                    onPress={() => {
                                      onDeleteNotification(item._id)
                                    }}>
                                    <Ionicons name="trash" size={25} color="#ffffff" style={{ flexDirection: 'row', justifyContent: 'flex-end' }} />
                                  </TouchableOpacity>
                                </View>
                              )}
                              rightOpenValue={-75}
                            />
                          )
                      }

                    </View>
                  )
              }
            </View>
          )

      }

    </SafeAreaView>
    </ScrollView>
    
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLOR.white,
    paddingBottom: 50
  },
  notification: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 25,
    lineHeight: 38,
    color: '#000000',
  },
  list_product: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  itemDelete: {
    flexDirection: 'row',
    justifyContent: "flex-end",
  },
  buttonDelete: {
    marginTop: 20,
    width: 75,
    height: 62,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },


})

const data = [
  {
    id: 'ohasd123',
    title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
    content: 'Được mệnh danh là hòn đảo tình yêu, đảo Jeju luôn khiến khách du lịch ngỡ ngàng bởi cảnh sắc thiên nhiên tuyệt đẹp, thơ mộng và không khí trong lành, mát mẻ. Nếu bạn đang có kế hoạch khám phá xứ sở kim chi và hòn đảo thiên đường này thì chắc chắn không thể bỏ qua thông tin thời tiết đúng không nào? Vậy hãy cùng chúng tôi cập nhật ngay thời tiết đảo Jeju để bắt sóng thời điểm vàng giúp bạn có phương án chuẩn bị chu đáo nhất cho chuyên đi của mình thêm trọn vẹn nhé.',
    image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
    days: '12h ago'
  },
  {
    title: 'Sự chuyển biến thú vị của thời tiết đảo Jeju',
    content: 'Nằm trong đới khí hậu ôn đới nên thời tiết đảo Jeju cũng được chia làm 4 mùa rõ rệt. Tuy nhiên, đây cũng là nơi có khí hậu tuyệt vời nhất xứ sở Kim chi, không khí mát mẻ quanh năm. Mỗi mùa tại đảo sẽ đem đến cho du khách những trải nghiệm du lịch vô cùng ấn tượng.',
    image: 'https://ik.imagekit.io/tvlk/blog/2023/05/tTakuUEa-image.png?tr=dpr-2,w-675',
    days: '12h ago'
  },
  {
    title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
    content: 'Được mệnh danh là hòn đảo tình yêu, đảo Jeju luôn khiến khách du lịch ngỡ ngàng bởi cảnh sắc thiên nhiên tuyệt đẹp, thơ mộng và không khí trong lành, mát mẻ. Nếu bạn đang có kế hoạch khám phá xứ sở kim chi và hòn đảo thiên đường này thì chắc chắn không thể bỏ qua thông tin thời tiết đúng không nào? Vậy hãy cùng chúng tôi cập nhật ngay thời tiết đảo Jeju để bắt sóng thời điểm vàng giúp bạn có phương án chuẩn bị chu đáo nhất cho chuyên đi của mình thêm trọn vẹn nhé.',
    image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
    days: '12h ago'
  },
  {
    title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
    content: 'Được mệnh danh là hòn đảo tình yêu, đảo Jeju luôn khiến khách du lịch ngỡ ngàng bởi cảnh sắc thiên nhiên tuyệt đẹp, thơ mộng và không khí trong lành, mát mẻ. Nếu bạn đang có kế hoạch khám phá xứ sở kim chi và hòn đảo thiên đường này thì chắc chắn không thể bỏ qua thông tin thời tiết đúng không nào? Vậy hãy cùng chúng tôi cập nhật ngay thời tiết đảo Jeju để bắt sóng thời điểm vàng giúp bạn có phương án chuẩn bị chu đáo nhất cho chuyên đi của mình thêm trọn vẹn nhé.',
    image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
    days: '12h ago'
  }
]