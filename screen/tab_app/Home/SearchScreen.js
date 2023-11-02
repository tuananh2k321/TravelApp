import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import { Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AxiosIntance from '../../../constant/AxiosIntance';
import ItemPopular from '../../../component/Tab_item/ItemPopular';
import ItemSearch from '../../../component/Tab_item/ItemSearch';

const SearchScreen = (props) => {
  const {navigation} = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [TourRating, setTourRating] = useState([]);
  const [TourNam, setTourNam] = useState([]);

  useEffect(() => {
    try {
      const getTour = async () => {
        const respone = await AxiosIntance().get('tour/api/list/tourRating');
        if (respone.result) {
          setTourRating(respone.tours);
        } else {
          ToastAndroid.show('Lấy dữ liệu không ok', ToastAndroid.SHORT);
        }
      };
      getTour();

      return () => {};
    } catch (error) {
      console.log('errrrrrrror', error);
    }
  }, []);

  // Hàm này sẽ được gọi khi nội dung của Searchbar thay đổi
  const handleSearch =  (text) => {
    setSearchQuery(text);
    // Thực hiện tìm kiếm dựa trên nội dung `text` và cập nhật `searchResults`
    // Ví dụ: bạn có thể gọi một API hoặc tìm kiếm trong dữ liệu của mình ở đây
    // Sau đó, cập nhật `searchResults` với kết quả tìm kiếm
  };

  // Hàm này sẽ được gọi khi người dùng nhấn Enter hoặc nút tìm kiếm
  const handleSearchSubmit = () => {
    // Lưu nội dung tìm kiếm vào lịch sử
    setSearchHistory([searchQuery, ...searchHistory]);
    setIsSearching(false);
    performSearch(searchQuery)

    // Thực hiện tìm kiếm và cập nhật kết quả tìm kiếm ở đây
  };
  const performSearch = async (query) => {
    // Thực hiện tìm kiếm dựa trên nội dung `query` và cập nhật `searchResults`
    // Ví dụ: bạn có thể gọi một API hoặc tìm kiếm trong dữ liệu của mình ở đây
    const response = await AxiosIntance().get("tour/api/search/name?q=" + query)
    if(response.result){
        setTourNam(response.tours)
    }else{
      ToastAndroid.show("Lấy dữ liệu thấy bại",ToastAndroid.SHORT)
    }
  };
  const handleHistoryItemPress = item => {
    // Gọi hàm tìm kiếm lại với nội dung của mục đã chọn
    performSearch(item);
    setSearchQuery(item);
    setIsSearching(false);
  };
  const handleClose = () => {
    // xóa text nhập vào
    setSearchQuery("");
    setIsSearching(true);
  };
  // Hàm xóa các mục đã chọn từ lịch sử tìm kiếm
  const deleteSearchHistoryItem = index => {
    const newSearchHistory = [...searchHistory];
    newSearchHistory.splice(index, 1);
    setSearchHistory(newSearchHistory);
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 7,
        flex: 1,
        paddingBottom: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
        {/* <Fontisto
                        name="angle-left"
                        size={22}
                        color="#000000"
                        style={{marginRight: 5,marginTop:25}}
                        onPress={() => navigation.goBack(null)}
                      /> */}
          <Searchbar 
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChangeText={handleSearch}
            elevation={4}
            onIconPress={handleSearchSubmit}
            onClearIconPress={handleClose}
            style={[
              {backgroundColor: '#ffffff', marginTop: 24, marginHorizontal: 5,width:'auto'},
              styles.borderSearch,
            ]}
          />
        </View>
        {isSearching ? (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#000000',
                marginTop: 35,
                marginBottom: 20,
              }}>
              Tìm kiếm gần đây
            </Text>
            {
              searchHistory.map((item) =><View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => handleHistoryItemPress(item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Fontisto
                        name="clock"
                        size={22}
                        color="grey"
                        style={{marginRight: 20}}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#000000',
                        }}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteSearchHistoryItem(index)}>
                    <AntDesign name="close" size={22} color="grey" />
                  </TouchableOpacity>
                </View>)
            }
            {/* <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={searchHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => handleHistoryItemPress(item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Fontisto
                        name="clock"
                        size={22}
                        color="grey"
                        style={{marginRight: 20}}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#000000',
                        }}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteSearchHistoryItem(index)}>
                    <AntDesign name="close" size={22} color="grey" />
                  </TouchableOpacity>
                </View>
              )}
            /> */}

            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#000000',
                marginTop: 35,
                marginBottom: 20,
              }}>
              Gợi ý
            </Text>
            <FlatList
              style={{marginTop: 10, flex: 1}}
              horizontal
              data={TourRating}
              renderItem={({item}) => (
                <ItemPopular dulieu={item} navigation={navigation} />
              )}
              keyExtractor={item => item._id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <View>
          <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#000000',
                marginTop: 35,
                marginBottom: 20,
              }}>
              Kết quả tìm kiếm
            </Text>
            {
              TourNam.map((item) => <ItemSearch dulieu={item} navigation={navigation} />)
            }
            {/* <FlatList
              style={{marginTop: 10, flex: 1}}
              data={TourNam}
              renderItem={({item}) => (
                <ItemSearch dulieu={item} navigation={navigation} />
              )}
              keyExtractor={item => item._id}
              showsHorizontalScrollIndicator={false}
            /> */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen;

const styles = StyleSheet.create({
  borderSearch: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listSearch: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffffff',
    top: 10,
  },
});
