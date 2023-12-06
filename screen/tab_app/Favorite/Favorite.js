import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR, SIZES } from '../../../constant/Themes'
import Item_wishlist from '../../../component/Tab_item/Item_wishlist'
import { useEffect } from 'react'
import { useState } from 'react'
import AxiosIntance from '../../../constant/AxiosIntance'
import { log } from 'console'
import Loading from '../../Loading'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/core'

handleDelete = (itemId) => {
  // Xử lý xóa item với id được truyền vào
  console.log('Item ID:', itemId);
};
const Favorite = (props) => {
  const { navigation } = props;
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const user = useSelector(state => state.user.user)
  const [idUser, setIdUser] = useState()

  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (user) {
      console.log('Profile user: ' + JSON.stringify(user));
      setLoading(false)
      console.log()
      setIdUser(user._id)
      getApi()
    } else {
      setLoading(true)
    }
  }, [isFocused])



  const handleRefresh = () => {
    setRefreshing(true);

    // Thực hiện các công việc làm mới dữ liệu ở đây, sau đó cập nhật state data

    // Ví dụ: Sau 2 giây, dừng làm mới và cập nhật dữ liệu

    getApi()
    setRefreshing(false);

  };

  const getApi = async () => {
    try {
      const response = await AxiosIntance().get("/favorite/api/getFavorite2?id_user=" + user._id);
      setLoading(true)
      console.log('favorite', response.result)
      if (response.result == true) {
        //console.log(response.favorite)
        setLoading(false)
        let favoriteList = []
        // console.log('favorite', response.favorite)
        for (item in response.favorite) {
          //console.log(response.favorite[item].tour_id)
          favoriteList.push(response.favorite[item].tour_id)
        }
        const listData = favoriteList
        console.log('favorite', favoriteList)
        //console.log('listData', listData)
        setData(listData)
      }


    } catch (error) {
      console.log('error>>>', error)
    }
  }

  // console.log("data", data)
  const deleteHandle = async (id) => {
    console.log("deleteHandle", id)
    // Hiện lên alert hỏi người dùng có chắc chắn muốn xóa không
    Alert.alert(
      "Xóa yêu thích",
      "Bạn có chắc chắn muốn xóa tour du lịch này khỏi danh sách yêu thích không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            // Gọi API để xóa tour du lịch khỏi danh sách yêu thích
            try {
              const response = await AxiosIntance().delete(`/favorite/api/${id}/deleteFavorite`);
              console.log("check response", response);
              if (response.result === true) {
                // Render lại dữ liệu
                getApi();

                // Thông báo cho người dùng rằng tour du lịch đã được xóa khỏi danh sách yêu thích
                Alert.alert("Xóa yêu thích thành công");
              } else {
                // Xử lý lỗi

                Alert.alert("Xóa yêu thích thất bại");
              }

            } catch (error) {
              // Xử lý lỗi
              console.log("error", error);
              Alert.alert("Xóa yêu thích thất bại");
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ backgroundColor: "#39C4FF", borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: "white" }}>Đăng nhập trước khi xem</Text>
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.wishlist}>Yêu thích</Text>
      <View style={styles.wishlist_list}>
        {/* {isLoading ? (<ActivityIndicator />) : ( */}
        <FlatList style={{ bottom: 20 }}
          data={data}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => <Item_wishlist data={item} navigation={navigation} handleDelete={() => deleteHandle(item._id)} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        >
        </FlatList>
        {/* )} */}

        {/* <SwipeListView
          showsVerticalScrollIndicator={false}
          data={data}

          renderItem={({ item }) => <Item_wishlist data={item} navigation={navigation} />}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-10}
        /> */}



      </View>
    </SafeAreaView>
  )
}

export default Favorite

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: SIZES.width,
    flexDirection: 'column',
    backgroundColor: COLOR.white,
    justifyContent: 'center'
  },
  wishlist: {
    marginTop: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 25,
    lineHeight: 38,
    color: COLOR.primary,
  },
  wishlist_list: {
    marginTop: 33,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

})

// const data = [
//   {
//     id: '1',
//     title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
//     start: 4.8,
//     view: 100,
//     image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
//     days: '2 ngay 1 dem',
//     price: 10,
//     address: 'songlong'
//   },
//   {
//     id: '2',
//     title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
//     start: 4.8,
//     view: 100,
//     image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
//     days: '2 ngay 1 dem',
//     price: 10,
//     address: 'songlong'
//   },
//   {
//     id: '3',
//     title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
//     start: 4.8,
//     view: 100,
//     image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
//     days: '2 ngay 1 dem',
//     price: 10,
//     address: 'songlong'
//   },
//   {
//     id: '4',
//     title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
//     start: 4.8,
//     view: 100,
//     image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
//     days: '2 ngay 1 dem',
//     price: 10,
//     address: 'songlong'
//   },
//   {
//     id: '5',
//     title: 'Khám phá thời tiết đảo Jeju và kinh nghiệm du lịch chi tiết',
//     start: 4.8,
//     view: 100,
//     image: 'https://ik.imagekit.io/tvlk/blog/2023/05/17VAvUV1-image.png?tr=dpr-2,w-675',
//     days: '2 ngay 1 dem',
//     price: 10,
//     address: 'songlong'
//   },

// ]