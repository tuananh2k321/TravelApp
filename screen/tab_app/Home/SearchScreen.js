import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AxiosIntance from '../../../constant/AxiosIntance';
import ItemPopular from '../../../component/Tab_item/ItemPopular';
import ItemSearch from '../../../component/Tab_item/ItemSearch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import Loading from '../../Loading';

const SearchScreen = props => {
  const {navigation, route} = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [TourRating, setTourRating] = useState([]);
  const [TourNam, setTourNam] = useState([]);
  const [tourTime, setTourTime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nameDomain = route.params?.nameDomain;
  const [sortOrder, setSortOrder] = useState('asc'); // lọc theo giá
  // lọc theo thời gian
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regions, setRegions] = useState([
    '4 ngày',
    '3 ngày',
    '2 ngày',
    '1 ngày',
  ]); // Thay đổi các khu vực theo nhu cầu của bạn
  const [isModalVisible, setIsModalVisible] = useState(false);

  // lọc theo khu vực
  const [selectedDomain, setSelectedDomain] = useState('');
  const [domain, setDomain] = useState([
    'Mien Nam',
    'Mien Bac',
    'Mien Trung'
  ]); // Thay đổi các khu vực theo nhu cầu của bạn
  const [isModalDomain, setIsModalDomain] = useState(false);
  // api danh sách theo rating
  useEffect(() => {
    try {
      const getTour = async () => {
        const respone = await AxiosIntance().get('tour/api/list/tourRating');
        if (respone.result) {
          setTourRating(respone.tours);
          setIsLoading(false);
        } else {
          ToastAndroid.show('Lấy dữ liệu không ok', ToastAndroid.SHORT);
        }
        setSearchQuery(nameDomain);
      };
      getTour();

      return () => {};
    } catch (error) {
      console.log('errrrrrrror', error);
    }
  }, []);
  // Hàm này sẽ được gọi khi nội dung của Searchbar thay đổi
  const handleSearch = text => {
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
    performSearch(searchQuery);

    // Thực hiện tìm kiếm và cập nhật kết quả tìm kiếm ở đây
  };
  const performSearch = async query => {
    // Thực hiện tìm kiếm dựa trên nội dung `query` và cập nhật `searchResults`
    // Ví dụ: bạn có thể gọi một API hoặc tìm kiếm trong dữ liệu của mình ở đây
    // const response = await AxiosIntance().get(
    //   'tour/api/search/name?q=' + query
    // );
    // if (response.result) {
    //   setTourNam(response.tours);
    //   setTourTime(TourNam);
    //   setIsLoading(false);
    // } else {
    //   ToastAndroid.show('Lấy dữ liệu thấy bại', ToastAndroid.SHORT);
    // }
    fetchData(query,"","")
  };
  const handleHistoryItemPress = item => {
    // Gọi hàm tìm kiếm lại với nội dung của mục đã chọn
    performSearch(item);
    setSearchQuery(item);
    setIsSearching(false);
  };
  const handleClose = () => {
    // xóa text nhập vào
    setSearchQuery('');
    setIsSearching(true);
  };
  // Hàm xóa các mục đã chọn từ lịch sử tìm kiếm
  const deleteSearchHistoryItem = index => {
    const newSearchHistory = [...searchHistory];
    newSearchHistory.splice(index, 1);
    setSearchHistory(newSearchHistory);
  };

  /////////////////////////////////
  // Lấy danh sách lịch sử tìm kiếm từ AsyncStorage khi màn hình được mở
  useEffect(() => {
    loadSearchHistory();
  }, []);
  // Lưu danh sách lịch sử tìm kiếm vào AsyncStorage khi thay đổi
  useEffect(() => {
    saveSearchHistory();
  }, [searchHistory]);
  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history !== null) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      // Xử lý lỗi khi đọc từ AsyncStorage
    }
  };

  const saveSearchHistory = async () => {
    try {
      await AsyncStorage.setItem(
        'searchHistory',
        JSON.stringify(searchHistory),
      );
    } catch (error) {
      // Xử lý lỗi khi ghi vào AsyncStorage
    }
  };
  const fetchData = async (query,byDate,byDomain) => {
    try {
      const response = await AxiosIntance().get(
        'tour/api/list/search?q=' + query + '&byDate=' + byDate + '&byDomain=' + byDomain,
      );
      if (response.result) {
        setTourNam(response.sortedtTours);
        setIsLoading(false);
      } else {
        ToastAndroid.show('Lấy dữ liệu thấy bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // sắp xếp theo giá
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedProducts = [...TourNam].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.adultPrice - b.adultPrice;
      } else {
        return b.adultPrice - a.adultPrice;
      }
    });

    setTourNam(sortedProducts);
  };

  // lọc theo thời gian
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onRegionSelect =async (region) => {
    setSelectedRegion(region);
    toggleModal();
   fetchData(searchQuery,region,selectedDomain)
    // Thêm logic xử lý khi chọn thời gian, ví dụ: cập nhật danh sách sản phẩm theo thời gian
    // const  sortedProducts = [...TourNam].filter(item => item.limitedDay.includes(region));
    
    // setTourTime(sortedProducts);
  };
  
  const renderItemTime = ({item}) => (
    <TouchableOpacity onPress={() => onRegionSelect(item)}>
      <Text style={{fontSize:18,fontWeight:'400',color:'#000000',backgroundColor:'#CACACA',padding:5,margin:5}}>{item}</Text>
    </TouchableOpacity>
  );

  // lọc theo khu vực
  const toggleModalDomain = () => {
    setIsModalDomain(!isModalDomain);
  };

  const onRegionSelectDomain = (region) => {
    setSelectedDomain(region);
    toggleModalDomain();
    // Thêm logic xử lý khi chọn thời gian, ví dụ: cập nhật danh sách sản phẩm theo thời gian
    const sortedProducts = [...TourNam].filter(item => item.isdomain.includes(region));
    // console.log("sortedProducts",sortedProducts)
    
    // setTourTime(sortedProducts);
    fetchData(searchQuery,selectedRegion,region)
  };
  
  const renderItemDomain = ({item}) => (
    <TouchableOpacity onPress={() => onRegionSelectDomain(item)}>
      <Text style={{fontSize:18,fontWeight:'400',color:'#000000',backgroundColor:'#CACACA',padding:5,margin:5}}>{item}</Text>
    </TouchableOpacity>
  );
    // xóa thiết lập
  const clearRegionSelection = () => {
    setSelectedRegion(null);
    setSelectedDomain(null);
  };
  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchData(searchQuery,selectedRegion,selectedDomain);
  },[]);
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
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
              {
                backgroundColor: '#ffffff',
                marginTop: 24,
                marginHorizontal: 5,
                width: 'auto',
              },
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
            {searchHistory?.map((item, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <TouchableOpacity onPress={() => handleHistoryItemPress(item)}>
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
            ))}
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
            <>
              {isLoading == true ? (
                <Loading />
              ) : (
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
              )}
            </>
          </View>
        ) : (
          <>
            {isLoading == true ? (
              <Loading />
            ) : (
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity style={{borderWidth: 0.3, padding: 5}} onPress={clearRegionSelection}>
                    <Text style={{fontSize: 20, fontWeight: '400'}}>Xóa thiết lập</Text>
                  </TouchableOpacity>
                  <View style={{marginHorizontal:10}}>
                    <ModalDropdown
                      options={regions}
                      onSelect={(index, value) => onRegionSelect(value)}
                      style={{borderWidth: 0.3, padding: 5}}
                      textStyle={styles.filterButtonText}>
                      <TouchableOpacity
                        onPress={toggleModal}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 20, fontWeight: '400'}}>
                          {selectedRegion || 'Chọn thời gian'}
                        </Text>
                        <AntDesign name="down" size={18} color="grey" />
                      </TouchableOpacity>
                    </ModalDropdown>
                    <Modal
                      visible={isModalVisible}
                      onRequestClose={toggleModal}>
                      <View style={styles.modalContent}>
                        <FlatList
                        numColumns={2}
                          data={regions}
                          renderItem={renderItemTime}
                          keyExtractor={item => item}
                        />
                      </View>
                    </Modal>
                  </View>
                  <View >
                    <ModalDropdown
                      options={domain}
                      onSelect={(index, value) => onRegionSelectDomain(value)}
                      style={{borderWidth: 0.3, padding: 5}}
                      textStyle={styles.filterButtonText}>
                      <TouchableOpacity
                        onPress={toggleModalDomain}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 20, fontWeight: '400'}}>
                          {selectedDomain || 'Chọn khu vực'}
                        </Text>
                        <AntDesign name="down" size={18} color="grey" />
                      </TouchableOpacity>
                    </ModalDropdown>
                    <Modal
                      visible={isModalDomain}
                      onRequestClose={toggleModalDomain}>
                      <View style={styles.modalContent}>
                        <FlatList
                        numColumns={2}
                          data={domain}
                          renderItem={renderItemDomain}
                          keyExtractor={item => item}
                        />
                      </View>
                    </Modal>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                      borderWidth: 0.3,
                      padding: 5,
                      marginHorizontal:10
                    }}
                    onPress={toggleSortOrder}>
                    <Text style={{fontSize: 20, fontWeight: '400'}}>Giá </Text>
                    {sortOrder === 'asc' ? (
                      <AntDesign name="arrowup" size={20} color="grey" />
                    ) : (
                      <AntDesign name="arrowdown" size={20} color="grey" />
                    )}
                  </TouchableOpacity>
                  
                </View>
                </ScrollView>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#000000',
                    marginTop: 25,
                    marginBottom: 20,
                  }}>
                  Kết quả tìm kiếm
                </Text>
                {/* {TourNam.map(item => (
                  <ItemSearch dulieu={item} navigation={navigation} />
                ))} */}
                <FlatList
                  style={{marginTop: 10, flex: 1}}
                  scrollEnabled={false}
                  data={TourNam}
                  renderItem={({item}) => (
                    <ItemSearch dulieu={item} navigation={navigation} />
                  )}
                  keyExtractor={item => item._id}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
  filterButtonText: {
    marginRight: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
