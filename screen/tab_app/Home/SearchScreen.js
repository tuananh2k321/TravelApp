import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
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
import Modal from 'react-native-modal';
import Loading from '../../Loading';

const SearchScreen = props => {
  const {navigation, route} = props;
  const [searchQuery, setSearchQuery] = useState("");
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
  const [domain, setDomain] = useState(['Mien Nam', 'Mien Bac', 'Mien Trung']); // Thay đổi các khu vực theo nhu cầu của bạn
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
  const handleSearchSubmit = async () => {
    // Lưu nội dung tìm kiếm vào lịch sử
    
    
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory([searchQuery, ...searchHistory]);
        setIsSearching(false);
        performSearch(searchQuery);
    }else if(searchHistory.includes(searchQuery)){
      setIsSearching(false);
        performSearch(searchQuery);
    }

    // Thực hiện tìm kiếm và cập nhật kết quả tìm kiếm ở đây
  };
  const performSearch = async query => {
    // Thực hiện tìm kiếm dựa trên nội dung `query` và cập nhật `searchResults`
    // Ví dụ: bạn có thể gọi một API hoặc tìm kiếm trong dữ liệu của mình ở đây
   
    fetchData(query, selectedRegion, selectedDomain);
    
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
  const fetchData = async (query, byDate, byDomain) => {
    try {
      const response = await AxiosIntance().get(
        'tour/api/list/search?q=' +
          query +
          '&byDate=' +
          byDate +
          '&byDomain=' +
          byDomain,
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

  const onRegionSelect = async region => {
    setSelectedRegion(region);
    toggleModal();
    fetchData(searchQuery, region, selectedDomain);
    // Thêm logic xử lý khi chọn thời gian, ví dụ: cập nhật danh sách sản phẩm theo thời gian
    const sortedProducts = [...TourNam].filter(item =>
      item.limitedDay.includes(region),
    );

    // setTourTime(sortedProducts);
  };

  const renderItemTime = ({item}) => (
    <TouchableOpacity style={{ backgroundColor: '#CACACA',margin:5,width:'45%',alignItems:'center'}} onPress={() => onRegionSelect(item)}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '400',
          color: '#000000',
          padding: 5,
          margin: 5,
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  // lọc theo khu vực

  const toggleModalDomain = () => {
    setIsModalDomain(!isModalDomain);
  };

  const onRegionSelectDomain = region => {
    setSelectedDomain(region);
    toggleModalDomain();
    // Thêm logic xử lý khi chọn thời gian, ví dụ: cập nhật danh sách sản phẩm theo thời gian
    const sortedProducts = [...TourNam].filter(item =>
      item.isdomain.includes(region),
    );
    // console.log("sortedProducts",sortedProducts)

    // setTourTime(sortedProducts);
    fetchData(searchQuery, selectedRegion, region);
  };
  // item lọc theo ku vực
  const renderItemDomain = ({item}) => (
    <TouchableOpacity style={{ backgroundColor: '#CACACA',margin:5,width:'45%',alignItems:'center'}} onPress={() => onRegionSelectDomain(item)}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '400',
          color: '#000000',
          padding: 10,
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  // xóa thiết lập
  const clearRegionSelection = () => {
    setSelectedRegion('');
    setSelectedDomain('');
    fetchData(searchQuery,'','')
  };
  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchData(searchQuery, selectedRegion, selectedDomain);
  }, [searchQuery]);
  
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 7,
        flex: 1,
        paddingBottom: 10,
        flexDirection: 'column',
      }}>
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
                key={index}
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
                  horizontal
                  data={TourRating}
                  renderItem={({item, key}) => (
                    <ItemPopular
                      dulieu={item}
                      navigation={navigation}
                      key={key}
                    />
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
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginTop: 10,
                      width:'auto',
                      height:70
                    }}>
                    <TouchableOpacity
                      style={{borderWidth: 0.3, padding: 5}}
                      onPress={clearRegionSelection}>
                      <Text style={{fontSize: 20, fontWeight: '400'}}>
                        Xóa thiết lập
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        marginHorizontal: 10,
                        borderWidth: 0.3,
                        padding: 5,
                      }}>
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
                        <View style={{flexDirection: 'column'}}>
                          <AntDesign
                            name="up"
                            size={18}
                            color="grey"
                            style={{marginVertical: -5}}
                          />
                          <AntDesign
                            name="down"
                            size={18}
                            color="grey"
                            style={{marginVertical: -5}}
                          />
                        </View>
                      </TouchableOpacity>
                      <Modal
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        isVisible={isModalVisible}
                        animationType="slide"
                        backdropColor="rgba(0,0,0,0.5)"
                        backdropOpacity={0.7}
                        onRequestClose={toggleModal}>
                        <View
                          style={[
                            {
                              alignItems: 'center',
                              width: '100%',
                              height: 'auto',
                              borderRadius: 5,
                              backgroundColor:'#ffffff',
                              padding: 20,
                            },
                          ]}>
                          <Text
                            style={{
                              
                              color: '#000000',
                              fontSize: 20,
                              fontWeight: '600',
                            }}>
                            Danh sách thời gian
                          </Text>
                          <FlatList
                            numColumns={2}
                            data={regions}
                            scrollEnabled={false}
                            renderItem={renderItemTime}
                            keyExtractor={item => item}
                          />
                          {/* Cancel Button */}
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#ff0000', // Replace with your preferred color
                              padding: 10,
                              borderRadius: 5,
                              marginTop:5
                            }}
                            onPress={toggleModal}
                          >
                            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
                              Hủy
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Modal>
                    </View>
                    <View style={{borderWidth: 0.3}}>
                      <TouchableOpacity
                        onPress={toggleModalDomain}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 0.3,
                          padding: 5,
                        }}>
                        <Text style={{fontSize: 20, fontWeight: '400'}}>
                          {selectedDomain || 'Chọn khu vực'}
                        </Text>
                        <View style={{flexDirection: 'column'}}>
                          <AntDesign
                            name="up"
                            size={18}
                            color="grey"
                            style={{marginVertical: -5}}
                          />
                          <AntDesign
                            name="down"
                            size={18}
                            color="grey"
                            style={{marginVertical: -5}}
                          />
                        </View>
                      </TouchableOpacity>

                      <Modal
                        animationType="slide"
                        isVisible={isModalDomain}
                        backdropColor="rgba(0,0,0,0.5)"
                        backdropOpacity={0.7}
                        onRequestClose={toggleModalDomain}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={[
                            {
                              alignItems: 'center',
                              width: '100%',
                              height: 'auto',
                              borderRadius: 5,
                              backgroundColor:'#ffffff',
                              padding: 20,
                            },
                          ]}>
                          <Text
                            style={{
                              color: '#000000',
                              fontSize: 20,
                              fontWeight: '600',
                            }}>
                            Danh sách những khu vực
                          </Text>
                          <FlatList
                            numColumns={2}
                            data={domain}
                            scrollEnabled={false}
                            renderItem={renderItemDomain}
                            keyExtractor={item => item}
                          />
                           {/* Cancel Button */}
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#ff0000', // Replace with your preferred color
                              padding: 10,
                              borderRadius: 5,
                              marginTop:5
                            }}
                            onPress={toggleModalDomain}
                          >
                            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
                              Hủy
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Modal>
                    </View>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 0.3,
                          padding: 5,
                          marginHorizontal:5
                      }}
                      onPress={toggleSortOrder}>
                      <Text style={{fontSize: 20, fontWeight: '400'}}>
                        Giá{' '}
                      </Text>
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
                  style={{marginTop: 10}}
                  data={TourNam}
                  
                  renderItem={({item, index}) => (
                    <ItemSearch
                      dulieu={item}
                      navigation={navigation}
                      key={index}
                    />
                  )}
                  keyExtractor={item => item._id}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </>
        )}
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
    backgroundColor: 'red',
    margin: 22,
    width: '50%',
    height: '50%',
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
