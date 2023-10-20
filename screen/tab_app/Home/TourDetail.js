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
import React, {useState} from 'react';
import {SIZES, COLOR, ICON} from '../../../constant/Themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import ItemIncluded from '../../../component/Tab_item/Item_included';
import ItemLink from '../../../component/Tab_item/Item_link';
import { onPress } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

export default TourDetail = (props) => {
  const { navigation} = props;
  const [showMore, setShowMore] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const maxChars = 200; // Số ký tự tối đa trước khi ẩn nội dung
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const sampleText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis condimentum morbi non egestas enim amet sagittis. Proin sed aliquet rhoncus ut pellentesque ullamcorper sit eget ac.Sit nisi, cras ametvarius eget egestas pellentesque. Cursus gravida euismod non';
    const images = [
      { id: 1, source: "https://nhadepso.com/wp-content/uploads/2023/01/hinh-anh-bien-dep_1.jpg" },
      { id: 2, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
      { id: 3, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
      { id: 4, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
      { id: 5, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
      { id: 6, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
      { id: 7, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
      { id: 8, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
      { id: 9, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
      { id: 10, source: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg" },
      // Thêm các hình ảnh khác tại đây
    ];
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView
        style={{
          width: SIZES.width,
          backgroundColor: COLOR.white,
        }}>
        <ImageBackground
          source={{
            uri: 'https://ik.imagekit.io/tvlk/blog/2023/04/go-and-share-bai-bien-viet-nam-5.jpeg',
          }}
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
              fontWeight: 'bold',
              color: COLOR.primary,
              marginTop: 10,
              marginBottom: 10,
            }}>
            Koh Rong Samloem
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
            <ItemIncluded icon={"child"} title={"100.000"} content={"Giá tiền đối với trẻ em dưới 15 tuổi"} />
            <ItemIncluded icon={"child"} title={"200.000"} content={"Giá tiền đối với người lớn 15 tuổi trở lên"} />
            <ItemIncluded icon={"bus-alt"} title={"Xe buýt"} content={"Phương tiện di chuyển"} />
            <ItemIncluded icon={"calendar-alt"} title={"ngày 10 tháng 10 năm 2023"} content={"Ngày khởi hành của tour du lịch"} />
            <ItemIncluded icon={"child"} title={"Ít nhất 10 người"} content={"Tối thiểu người đi tuor"} />
            <ItemIncluded icon={"clock"} title={"2 ngày 1 đêm"} content={"Thời gian đi của tour du lịch"} />
            <ItemIncluded icon={"calendar-alt"} title={"Hoạt động vào tháng 10"} content={"Khoản thời gian mà tour còn hoạt động"} />
            
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
            Xe du lịch và hướng dẫn viên sẽ đợi bạn tại Đ. Xuân Thủy, Hàm Thuận Bắc, Bình Thuận 77157, Việt Nam
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
          {/* ItemLink */}
          <ItemLink screen={"HotelDetail"} icon={"hotel"} tile={"Khách sạn"} name={"Saigon hotel"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. A id diam nisl, non justo, in odio..."}/>
          <ItemLink icon={"location-arrow"} tile={"Điểm đến"} name={"Saigon hotel"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. A id diam nisl, non justo, in odio..."}/>
          <ItemLink icon={"child"} tile={"Hướng dẫn viên"} name={"Trần Anh Trí"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. A id diam nisl, non justo, in odio..."}/>
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
                source={{
                  uri: 'https://nhadepso.com/wp-content/uploads/2023/01/hinh-anh-bien-dep_1.jpg',
                }}
                style={{
                  height: 200,
                  resizeMode: 'cover',
                  marginBottom: 10,
                  borderRadius: 10,
                }}
              />

              <Image
                source={{
                  uri: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg',
                }}
                style={{height: 200, resizeMode: 'cover', borderRadius: 10}}
              />
            </View>

            <Image
              source={{
                uri: 'https://images.pexels.com/photos/2873992/pexels-photo-2873992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              }}
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
                  {images.map((image) => (
                    <Image
                      key={image.id}
                      source={{uri:image.source}}
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
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}>
          
          <TouchableOpacity
            style={{
              flex: 1,
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
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
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
