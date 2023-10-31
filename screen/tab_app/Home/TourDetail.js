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
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {SIZES, COLOR, ICON} from '../../../constant/Themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import ItemIncluded from '../../../component/Tab_item/Item_included';
import AxiosIntance from '../../../constant/AxiosIntance';
import ItemLink from '../../../component/Tab_item/Item_link';
import { onPress } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import Loading from '../../Loading';

export default TourDetail = (props) => {
  const { navigation,route} = props;
  const {params} = route;
  const [tourName, settourName] = useState("")
  const [adultPrice, setadultPrice] = useState("")
  const [childrenPrice, setchildrenPrice] = useState("")
  const [adultAge, setadultAge] = useState("")
  const [childrenAge, setchildrenAge] = useState("")
  const [departmentPlace, setdepartmentPlace] = useState("")
  const [departmentDate, setdepartmentDate] = useState("")
  const [limitedDay, setlimitedDay] = useState("")
  const [operatingDay, setoperatingDay] = useState("")
  const [limitedPerson, setlimitedPerson] = useState("")
  const [offer, setoffer] = useState("")
  const [vehicle, setvehicle] = useState("")
  const [rating, setrating] = useState("")
  const [isdomain, setisdomain] = useState("")
  const [hotel_id, sethotel_id] = useState({})
  const [tourGuide_id, settourGuide_id] = useState({})
  const [destination_id, setdestination_id] = useState({})
  const [description, setdescription] = useState("")
  const [tourImage, settourImage] = useState([])
  const [showMore, setShowMore] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const maxChars = 200; // Số ký tự tối đa trước khi ẩn nội dung
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const [isLoading, setIsLoading] = useState(true);
  const sampleText =description;
  // const images = [
  //     { id: 1, source: "https://nhadepso.com/wp-content/uploads/2023/01/hinh-anh-bien-dep_1.jpg" },
  //     { id: 2, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
  //     { id: 3, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
  //     { id: 4, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
  //     { id: 5, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
  //     { id: 6, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
  //     { id: 7, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
  //     { id: 8, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
  //     { id: 9, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
  //     { id: 10, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
  //     // Thêm các hình ảnh khác tại đây
  //   ];
  let images = tourImage;
    useEffect(() => {
      try {
          const getTour = async () => {
              const response = await AxiosIntance().get("tour/api/"+ params.id +"/detail");
              if (response.result == true) {
                settourName(response.tour.tourName)
                setadultPrice(response.tour.adultPrice)
                setchildrenPrice(response.tour.childrenPrice)
                setadultAge(response.tour.adultAge)
                setchildrenAge(response.tour.childrenAge)
                setdepartmentPlace(response.tour.departmentPlace)
                setdepartmentDate(response.tour.departmentDate)
                setlimitedDay(response.tour.limitedDay)
                setoperatingDay(response.tour.operatingDay)
                setlimitedPerson(response.tour.limitedPerson)
                setoffer(response.tour.offer)
                setvehicle(response.tour.vehicle)
                setrating(response.tour.rating)
                setisdomain(response.tour.isdomain)
                sethotel_id(response.datahotel)
                settourGuide_id(response.dataTourGuide)
                setdestination_id(response.dataDestination)
                setdescription(response.tour.description)
                settourImage(response.tour.tourImage)
                setIsLoading(false);

              } else {
                  ToastAndroid.show("Lấy dữ liệu không ok", ToastAndroid.SHORT)
              }
          }
          getTour();

          return () => { }
      } catch (error) {
          console.log('errrrrrrror', error)
      }

  }, []);
  return (
    <>
    {
      isLoading == true ? 
      (Loading) : 
      (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView
        style={{
          width: SIZES.width,
          backgroundColor: COLOR.white,
        }}>
        <ImageBackground
          source={{uri: tourImage[0] !=="" ? tourImage[0] : undefined}}
          style={{width: SIZES.width, height: 300, padding: 15}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack(null)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 50,
                backgroundColor: COLOR.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
               <FontAwesome5 name={"arrow-left"} size={16} color="#000000" />
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 50,
                backgroundColor: COLOR.white,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight:10
              }}>
               <FontAwesome5 name={"share-alt"} size={16} color="#000000" />
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
               <FontAwesome name={"heart-o"} size={16} color="#000000" />
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

          <View style={{flexDirection: 'row'}}>
            {Array.from({length: 5}).map((_, index) => {
              if (index < 3) {
                return (
                  <Image
                    key={`star-${index}`}
                    source={ICON.star_yellow}
                    style={{width: 18, height: 18}}
                  />
                );
              } else {
                return (
                  <Image
                    key={`star-${index}`}
                    source={ICON.star}
                    style={{width: 18, height: 18}}
                  />
                );
              }
            })}

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLOR.detail,
                marginLeft: 10,
              }}>
              100 đánh giá
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLOR.detail,
                marginLeft: 10,
              }}>
              300 lượt đặt
            </Text>
          </View>

          {/* <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLOR.detail,
              marginTop: 10,
            }}
            numberOfLines={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis
            condimentum morbi non egestas enim amet sagittis. Proin sed aliquet
            rhoncus ut pellentesque ullamcorper sit eget ac.Sit nisi, cras amet
            varius eget egestas pellentesque. Cursus gravida euismod non
          </Text> */}
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
          <View style={{flexDirection: 'column'}}>
            <ItemIncluded icon={"bus-alt"} title={vehicle} content={"Phương tiện di chuyển"} />
            <ItemIncluded icon={"calendar-alt"} title={departmentDate} content={"Ngày khởi hành của tour du lịch"} />
            <ItemIncluded icon={"child"} title={limitedPerson} content={"Tối thiểu người đi tuor"} />
            <ItemIncluded icon={"clock"} title={limitedDay} content={"Thời gian đi của tour du lịch"} />
            <ItemIncluded icon={"calendar-alt"} title={operatingDay} content={"Khoản thời gian mà tour còn hoạt động"} />
            
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.lightBlack2,
              marginVertical: 20,
            }}
          />

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

          <Image
            style={{
              width: '100%',
              height: 300,
              marginTop: 10,
            }}
            source={{
              uri: 'https://www.google.com/maps/d/thumbnail?mid=1sTvpmQyZI2YRtqSyEdCJeBS9KQU&hl=en_US',
            }}
          />

          <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.lightBlack2,
              marginTop: 30,
            }}
          />
                 {/* checkin */}
                 <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{flexDirection: 'column', flex: 1, marginRight: 10}}>
              <Image
                source={{uri: tourImage[0] !=="" ? tourImage[0] : undefined}}
                style={{
                  height: 200,
                  resizeMode: 'cover',
                  marginBottom: 10,
                  borderRadius: 10,
                }}
              />

              <Image
                source={{uri: tourImage[1] !=="" ? tourImage[1] : undefined}}
                style={{height: 200, resizeMode: 'cover', borderRadius: 10}}
              />
            </View>

            <Image
              source={{uri: tourImage[2] !=="" ? tourImage[2] : undefined}}
              style={{
                height: 410,
                resizeMode: 'cover',
                borderRadius: 10,
                flex: 1,
              }}
            />
          </View>
              {/* seeall image */}
          <TouchableOpacity onPress={() => setModalVisible(true)}
            style={{
              flexDirection: 'row',
              width: 200,
              height: 50,
              borderRadius: 6,
              marginTop: 20,
              borderWidth:1,
              borderColor:'#000000',
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
              See all +20 photos
            </Text>
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              >
              <View style={styles.modalContainer}>
                <Button title="Đóng" onPress={() => setModalVisible(false)} />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                  {tourImage.map((image,index) => (
                    <Image
                    key={index}
                      source={{uri: image !=="" ? image : undefined}}
                      style={styles.image}
                    />
                  ))}
                </View>
                </KeyboardAwareScrollView>
              </View>
            </Modal>
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.lightBlack2,
              marginTop: 30,
            }}
          />
          {/* ItemLink */}
          <ItemLink dulieu={hotel_id} screen={"HotelDetail"} icon={"hotel"} tile={"Khách sạn"} name={hotel_id.hotelName} content={hotel_id.description}/>
          <ItemLink dulieu={destination_id} screen={"DestinationDetail"} icon={"location-arrow"} tile={"Điểm đến"} name={destination_id.destinationName} content={destination_id.content}/>
          <ItemLink dulieu={tourGuide_id} screen={"TourGuideDetail"} icon={"child"} tile={"Hướng dẫn viên"} name={tourGuide_id.name} content={tourGuide_id.phoneNumber}/>
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

          <View
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: COLOR.lightBlack2,
              padding: 15,
              marginBottom: 20,
              backgroundColor: 'white',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/2873992/pexels-photo-2873992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  marginRight: 20,
                }}
              />
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLOR.title,
                  }}>
                  Trần Tuấn Anh
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {Array.from({length: 5}).map((_, index) => {
                    if (index < 3) {
                      return (
                        <Image
                          key={`star-${index}`}
                          source={ICON.star_yellow}
                          style={{width: 16, height: 16}}
                        />
                      );
                    } else {
                      return (
                        <Image
                          key={`star-${index}`}
                          source={ICON.star}
                          style={{width: 16, height: 16}}
                        />
                      );
                    }
                  })}
                </View>
              </View>
            </View>

            <Text
              style={{
                fontSize: 17,
                fontWeight: '400',
                color: COLOR.detail,
                marginTop: 20,
              }}>
              ewqweq ewqewq ewqewq ewqewq ewqewq ewqewq eqewqe weqewqeq weqweq111111111111111111111111
            </Text>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <Text style={{color:COLOR.detail,fontSize:14,fontWeight:'400'}}>
                  Đã đăng
                </Text>
                <Text style={{color:COLOR.detail,fontSize:14,fontWeight:'400',marginLeft:10}}>
                  10/10/2023
                </Text>
              </View>

            </View>
           
          </View>

          <TouchableOpacity 
            style={{
              flexDirection: 'row',
              width: 200,
              height: 50,
              borderRadius: 6,
              marginTop: 10,
              borderWidth:1,
              borderColor:'#000000',
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
              Thêm +20 đánh giá
            </Text>
          </TouchableOpacity>

          
        </View>
        <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.lightBlack2,
              marginTop: 30,
              marginHorizontal:15
            }}
          />
          {/* độ tuổi qui định */}
          <View style={{flexDirection:'column',justifyContent:'flex-start',paddingHorizontal:15,paddingVertical:20}}>
            <Text style={{fontSize:18,color:COLOR.title,fontWeight:'600'}}>
              Độ tuổi qui định
            </Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:7}}>
              <Text style={{fontSize:14,color:COLOR.detail,fontWeight:'400'}}>
                Trẻ em: {childrenAge} tuổi
              </Text>
              <Text style={{fontSize:20,color:COLOR.primary,fontWeight:'600'}}>
                {childrenPrice}/Trẻ em
              </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:7}}>
              <Text style={{fontSize:14,color:COLOR.detail,fontWeight:'400'}}>
                Người lớn: {adultAge} tuổi
              </Text>
              <Text style={{fontSize:20,color:COLOR.primary,fontWeight:'600'}}>
                {adultPrice}/Người lớn
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
          
          <TouchableOpacity onPress={() => navigation.navigate('Detail_Booking',{id: params.id, childrenPrice: childrenPrice, adultPrice: adultPrice, image: tourImage[0], tourName: tourName, limitedPerson: limitedPerson})}
            style={{
              flex: 1,
              height:52,
              backgroundColor: COLOR.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              padding: 10,
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
      </SafeAreaView>
    </KeyboardAwareScrollView>
      )
    }
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
})
