import {
  SafeAreaView,
  Image,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { AirbnbRating, Rating } from 'react-native-ratings';

import React, { useState, useEffect } from 'react';
import { SIZES, COLOR, ICON } from '../../../constant/Themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import ItemIncluded from '../../../component/Tab_item/Item_included';
import AxiosIntance from '../../../constant/AxiosIntance';
import ItemLink from '../../../component/Tab_item/Item_link';
import { onPress } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import Loading from '../../Loading';
import { useSelector } from 'react-redux';
import { log } from 'console';
import { set } from 'immer/dist/internal';

export default TourDetail = props => {
  const { navigation, route } = props;
  const { params } = route;
  const [tourName, settourName] = useState('');
  const [adultPrice, setadultPrice] = useState('');
  const [childrenPrice, setchildrenPrice] = useState('');
  const [adultAge, setadultAge] = useState('');
  const [childrenAge, setchildrenAge] = useState('');
  const [departmentPlace, setdepartmentPlace] = useState('');
  const [departmentDate, setdepartmentDate] = useState('');
  const [limitedDay, setlimitedDay] = useState('');
  const [operatingDay, setoperatingDay] = useState('');
  const [limitedPerson, setlimitedPerson] = useState('');
  const [offer, setoffer] = useState('');
  const [vehicle, setvehicle] = useState('');
  const [rating, setrating] = useState(0);
  const [booking, setBooking] = useState('');
  const [reviews, setReviews] = useState('');
  const [isdomain, setisdomain] = useState('');
  const [hotel_id, sethotel_id] = useState({});
  const [tourGuide_id, settourGuide_id] = useState({});
  const [destination_id, setdestination_id] = useState([]);
  const [description, setdescription] = useState('');
  const [tourImage, settourImage] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [listComment, setListComment] = useState([])
  const maxChars = 200; // Số ký tự tối đa trước khi ẩn nội dung
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const [isLoading, setIsLoading] = useState(true);
  const sampleText = description;
  const user = useSelector(state => state.user);
  const user2 = useSelector(state => state.user.user);
  const [idUser, setIdUser] = useState();
  
  const onBooking = () => {
    if (user.user == null) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Detail_Booking', {
        id: params.id,
        childrenPrice: childrenPrice,
        adultPrice: adultPrice,
        image: tourImage[0],
        tourName: tourName,
        limitedPerson: limitedPerson,
        adultAge: adultAge,
        childrenAge: childrenAge
      });
    }
  };

  let images = tourImage;
  // const userId = useSelector(state => state.user.user._id);
  const handleReloadPage = () => {
    navigation.popToTop();
    navigation.navigate('Favorite');
  };
  // Yêu thích
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = async () => {
    try {
      const tourId = params.id;
      const user_id = user2._id;
      console.log('tour id', tourId);
      console.log('user_id', user_id);
      // Thực hiện cuộc gọi API bằng axios hoặc thư viện HTTP client khác
      const response = await AxiosIntance().get(
        `favorite/api/${user_id}/${tourId}/addFavorite`,
      );
      console.log('check response', response);
      // console.log('CHeck userid', userId);
      //  console.log("user: " + user);
      console.log('response', response);
      if (response.result === true) {
        // API đã thêm yêu thích thành công
        setIsLiked(true);
        handleReloadPage();
      } else {
        // Xử lý lỗi hoặc thông báo cho người dùng
        console.log('Thêm thất bại');
      }
    } catch (error) {
      // Xử lý lỗi
      console.log('error: ' + error);
    }
  };
  const handleRating = ratedValue => {
    // Xử lý khi người dùng đánh giá
    setrating(ratedValue);
  };



  useEffect(() => {
    try {
      const getTour = async () => {
        const response = await AxiosIntance().get(
          'tour/api/' + params.id + '/detail',
        );
        // console.log('tour ', params.id);
        if (response.result == true) {
          settourName(response.tour.tourName);
          setadultPrice(VND.format(response.tour.adultPrice));
          setchildrenPrice(VND.format(response.tour.childrenPrice));
          setadultAge(response.tour.adultAge);
          setchildrenAge(response.tour.childrenAge);
          setdepartmentPlace(response.tour.departmentPlace);
          setdepartmentDate(response.tour.departmentDate);
          setlimitedDay(response.tour.limitedDay);
          setoperatingDay(response.tour.operatingDay);
          setlimitedPerson(response.tour.limitedPerson);
          setoffer(response.tour.offer);
          setvehicle(response.tour.vehicle);
          setisdomain(response.tour.isdomain);
          sethotel_id(response.datahotel);
          settourGuide_id(response.dataTourGuide);
          setdestination_id(response.dataDestination.content.data);
          setdescription(response.tour.description);
          settourImage(response.tour.tourImage);
          setIsLoading(false);
        } else {
          ToastAndroid.show('Lấy dữ liệu không ok', ToastAndroid.SHORT);
        }
      };
      const getTopComment = async () => {
        const tourId = params.id;
        // console.log("tourId>>>>", tourId);
        const response = await AxiosIntance().get(`comment/api/topListComment?tour_id=${tourId}`,);

        // const listData = response.comments
        // console.log("Check response commment", listData)
        if (response.result == true) {
          setListComment(response.comments)
          
          console.log("listcomment top>>>>>>>>>>", listComment)
          // console.log("listcomment top>>>>>>>>>>", listComment[0].user_id.avatar)

        }
      }

      const getAllBooking = async () => {
        const response = await AxiosIntance().get(
          'booking/api/tourIsBooking/' + params.id,
        );

        if (response.result == true) {
          setBooking(response.soLan);
        } else {
          ToastAndroid.show('Lấy dữ liệu không ok', ToastAndroid.SHORT);
        }
      };
      const getAllReviews = async () => {
        const response = await AxiosIntance().get(
          `comment/api/listComment?tour_id=${params.id}`,
        );
        if (response.result == true) {
          setReviews(response.quantity);
          setrating(response.averageRating)
        } else {
          ToastAndroid.show('Lấy dữ liệu không ok', ToastAndroid.SHORT);
        }
      };


      getTour();
      getTopComment()
      // getAllBooking();
      getAllReviews();


    } catch (error) {
      console.log('errrrrrrror', error);
    }
  }, []);
  let priceChildren = Number(childrenPrice);
  priceChildren = priceChildren.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  let priceAdult = Number(adultPrice);
  priceAdult = priceAdult.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  return (
    <>
      {isLoading == true ? (
        <Loading />
      ) : (
        <View>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView
              style={{
                width: SIZES.width,
                backgroundColor: COLOR.white,
              }}>
              <ImageBackground
                source={{ uri: tourImage[0] !== '' ? tourImage[0] : undefined }}
                style={{ width: SIZES.width, height: 300, padding: 15 }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack(null)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 50,
                      backgroundColor: COLOR.white,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesome5 name={'arrow-left'} size={16} color="#000000" />
                  </TouchableOpacity>

                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 50,
                        backgroundColor: COLOR.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                      }}>
                      <FontAwesome5
                        name={'share-alt'}
                        size={16}
                        color="#000000"
                      />
                    </View>

                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 50,
                        backgroundColor: COLOR.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={handleLike}
                      // style={[styles.heart, isLiked && styles.heartFilled]}
                      >
                        <FontAwesome
                          name={isLiked ? 'heart' : 'heart-o'}
                          size={16}
                          color={isLiked ? 'red' : '#000000'} // Sử dụng màu đỏ khi yêu thích, màu đen khi chưa yêu thích
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ImageBackground>
              <View
                style={{
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: COLOR.title,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  {tourName}
                </Text>

                <View style={{ flexDirection: 'row' }}>
                  <Rating
                    readonly
                    ratingCount={5}
                    showReadOnlyText={false}
                    fractions={1}
                    startingValue={rating}
                    jumpValue={0.1}
                    imageSize={20}
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLOR.detail,
                      marginLeft: 10,
                    }}>
                    {reviews == 0 ? 0 : reviews} đánh giá
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLOR.detail,
                      marginLeft: 10,
                    }}>
                    {booking == 0 ? 0 : booking} lượt đặt
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: COLOR.detail,
                    marginTop: 10,
                  }}>
                  {showMore ? sampleText : sampleText.slice(0, maxChars)}
                  {!showMore && sampleText.length > maxChars && (
                    <Text
                      onPress={toggleShowMore}
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: COLOR.title,
                        textDecorationLine: 'underline',
                      }}>
                      Đọc hết
                    </Text>
                  )}
                  {showMore && (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: COLOR.title,
                        textDecorationLine: 'underline',
                        marginLeft: 10,
                      }}
                      onPress={toggleShowMore}>
                      Đọc ít
                    </Text>
                  )}
                </Text>

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLOR.lightBlack2,
                    marginVertical: 30,
                  }}
                />

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLOR.title,
                    marginBottom: 10,
                  }}>
                  Bao gồm
                </Text>
                {/* Bao gồm */}
                <View style={{ flexDirection: 'column' }}>
                  <ItemIncluded
                    icon={'bus-alt'}
                    title={vehicle}
                    content={'Phương tiện di chuyển'}
                  />
                  <ItemIncluded
                    icon={'calendar-alt'}
                    title={departmentDate}
                    content={'Ngày khởi hành của tour du lịch'}
                  />
                  <ItemIncluded
                    icon={'child'}
                    title={limitedPerson}
                    content={'Tối thiểu người đi tuor'}
                  />
                  <ItemIncluded
                    icon={'clock'}
                    title={limitedDay}
                    content={'Thời gian đi của tour du lịch'}
                  />
                  <ItemIncluded
                    icon={'calendar-alt'}
                    title={operatingDay}
                    content={'Khoản thời gian mà tour còn hoạt động'}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLOR.title,
                    marginBottom: 10,
                  }}>
                  Địa điểm khởi hành
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: COLOR.detail,
                    marginBottom: 10,
                  }}>
                  Xe du lịch và hướng dẫn viên sẽ đợi bạn tại {departmentPlace}
                </Text>


                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLOR.lightBlack2,
                    marginTop: 30,
                  }}
                />
                {/* ItemLink */}
                <ItemLink
                  dulieu={hotel_id}
                  screen={'HotelDetail'}
                  icon={'hotel'}
                  tile={'Khách sạn'}
                  name={hotel_id.hotelName}
                  content={hotel_id.description}
                />
                <ItemLink
                  dulieu={tourGuide_id}
                  screen={'TourGuideDetail'}
                  icon={'child'}
                  tile={'Hướng dẫn viên'}
                  name={tourGuide_id.name}
                  content={tourGuide_id.phoneNumber}
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLOR.lightBlack2,
                    marginTop: 30,
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLOR.title,
                    marginBottom: 20,
                    marginTop: 30,
                  }}>
                  Một số điểm tham quan
                </Text>

                {destination_id.map((item, index) => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 5,
                    }}
                    key={index}>
                    <Image
                      source={{ uri: item.destinationImage }}
                      style={{ width: '100%', height: 300 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: COLOR.title,
                      }}>
                      {item.description}
                    </Text>
                  </View>
                ))}

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLOR.lightBlack2,
                    marginTop: 30,
                  }}
                />

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLOR.title,
                    marginBottom: 20,
                    marginTop: 30,
                  }}>
                  Đánh giá
                </Text>

                {listComment.length > 0 && <View
                  style={{
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: COLOR.lightBlack2,
                    padding: 15,
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{
                        uri: listComment[0].user_id.avatar
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        marginRight: 20,
                      }}
                    />
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: COLOR.title,
                        }}>
                        {listComment[0].user_id.name}
                      </Text>
                      <Rating
                        readonly
                        ratingCount={5}
                        showReadOnlyText={false}
                        fractions={1}
                        startingValue={listComment[0].rating}
                        jumpValue={0.1}
                        imageSize={12} />


                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      color: COLOR.detail,
                      marginTop: 20,
                    }}>
                    {listComment[0].content}
                    {/* adasdasdsd */}
                    {/* Content */}

                  </Text>

                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: COLOR.detail,
                          fontSize: 14,
                          fontWeight: '400',
                        }}>
                        Đã đăng
                      </Text>
                      <Text
                        style={{
                          color: COLOR.detail,
                          fontSize: 14,
                          fontWeight: '400',
                          marginLeft: 10,
                        }}>
                        10/10/2023
                      </Text>
                    </View>
                  </View>
                </View>}

                <TouchableOpacity
                  onPress={() => navigation.navigate("ListComment", { id: params.id })}
                  style={{
                    flexDirection: 'row',
                    width: 200,
                    height: 50,
                    borderRadius: 6,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: '#000000',
                    backgroundColor: COLOR.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#000000',
                    }}>
                    Thêm +{reviews} đánh giá
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLOR.lightBlack2,
                  marginTop: 30,
                  marginHorizontal: 15,
                }}
              />
              {/* độ tuổi qui định */}
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                }}>
                <Text
                  style={{ fontSize: 18, color: COLOR.title, fontWeight: '600' }}>
                  Độ tuổi qui định
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOR.detail,
                      fontWeight: '400',
                    }}>
                    Trẻ em: {childrenAge} tuổi
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLOR.primary,
                      fontWeight: '600',
                    }}>
                    {priceChildren}/Trẻ em
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOR.detail,
                      fontWeight: '400',
                    }}>
                    Người lớn: {adultAge} tuổi
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLOR.primary,
                      fontWeight: '600',
                    }}>
                    {priceAdult}/Người lớn
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                }}>

              </View>
              
            </SafeAreaView>

          </KeyboardAwareScrollView>
          <TouchableOpacity
                onPress={onBooking}
                style={{
                  height: 52,
                  backgroundColor: COLOR.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  padding: 10,
                  position: "absolute",
                  bottom: 10, left: 10, right: 10
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Đặt ngay
                </Text>
              </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  heart: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  heartFilled: {
    backgroundColor: '#ff0000',
  },
});
