import {
  SafeAreaView,
  Image,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SIZES, COLOR, ICON} from '../../../constant/Themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default TourDetail = () => {
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          width: SIZES.width,
          backgroundColor: COLOR.backgroundColor,
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
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                backgroundColor: COLOR.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={ICON.arrow_back}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: COLOR.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <Image
                  source={ICON.share}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>

              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: COLOR.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={ICON.heartt}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
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

          <Text
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
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: COLOR.title,
              marginBottom: 30,
            }}>
            Thêm...
          </Text>

          <View
            style={{borderWidth: 0.2, width: SIZES.width, borderColor: 'gray'}}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: COLOR.title,
              marginBottom: 10,
              marginTop: 30,
            }}>
            Bao gồm
          </Text>

          <View style={{flexDirection: 'row', marginBottom: 30}}>
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                height: 50,
                borderColor: COLOR.detail,
                borderWidth: 1,
                borderRadius: 20,
                marginRight: 10,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Image
                source={ICON.bus}
                style={{width: 25, height: 25, marginRight: 10}}
              />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: COLOR.detail,
                }}>
                Bus
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: 100,
                height: 50,
                borderColor: COLOR.detail,
                borderWidth: 1,
                borderRadius: 20,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Image
                source={ICON.clock}
                style={{width: 25, height: 25, marginRight: 10}}
              />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: COLOR.detail,
                }}>
                2 ngày 1 đêm
              </Text>
            </View>
          </View>

          <View
            style={{borderWidth: 0.2, width: SIZES.width, borderColor: 'gray'}}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: COLOR.title,
              marginBottom: 10,
              marginTop: 30,
            }}>
            Địa điểm khách sạn
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

          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLOR.detail,
              marginBottom: 10,
              marginTop: 30,
            }}>
            Đ. Xuân Thủy, Hàm Thuận Bắc, Bình Thuận 77157, Việt Nam
          </Text>

          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              borderRadius: 20,
              marginTop: 10,
              backgroundColor: COLOR.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
              }}>
              chi tiết
            </Text>
          </TouchableOpacity>

          <View
            style={{
              borderWidth: 0.2,
              width: SIZES.width,
              borderColor: 'gray',
              marginTop: 30,
            }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: COLOR.title,
              marginBottom: 10,
              marginTop: 30,
            }}>
            Checking
          </Text>

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

          <View
            style={{
              flexDirection: 'row',
              width: 100,
              height: 50,
              borderRadius: 20,
              marginTop: 10,
              backgroundColor: COLOR.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={ICON.camera}
              style={{width: 25, height: 25, marginRight: 10}}
            />

            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
              }}>
              +20
            </Text>
          </View>

          <View
            style={{
              borderWidth: 0.2,
              width: SIZES.width,
              borderColor: 'gray',
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
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: COLOR.detail,
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLOR.detail,
                      marginLeft: 10,
                    }}>
                    01/05/2023
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: COLOR.detail,
                marginTop: 20,
              }}>
              ewqweq ewqewq ewqewq ewqewq ewqewq ewqewq eqewqe weqewqeq weqweq
            </Text>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Image
                source={{
                  uri: 'https://nhadepso.com/wp-content/uploads/2023/01/hinh-anh-bien-dep_1.jpg',
                }}
                style={{
                  flex: 1,
                  height: 110,
                  resizeMode: 'cover',
                  marginBottom: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />

              <Image
                source={{
                  uri: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg',
                }}
                style={{
                  height: 110,
                  resizeMode: 'cover',
                  borderRadius: 10,
                  marginRight: 10,
                  flex: 1,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: COLOR.primary,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  flex: 1,
                }}>
                <Image
                  source={ICON.camera}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: 5,
                    alignSelf: 'center',
                  }}
                />

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'center',
                  }}>
                  +5
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                borderColor: COLOR.detail,
                borderWidth: 1,
                justifyContent: 'center',
                alignSelf: 'flex-end',
              }}>
              <Image
                source={ICON.vote_up}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              </View> */}
          </View>

          <View
            style={{
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: COLOR.detail,
              padding: 15,
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLOR.detail,
                      marginLeft: 10,
                    }}>
                    01/05/2023
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: COLOR.detail,
                marginTop: 20,
              }}>
              ewqweq ewqewq ewqewq ewqewq ewqewq ewqewq eqewqe weqewqeq weqweq
            </Text>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Image
                source={{
                  uri: 'https://nhadepso.com/wp-content/uploads/2023/01/hinh-anh-bien-dep_1.jpg',
                }}
                style={{
                  flex: 1,
                  height: 110,
                  resizeMode: 'cover',
                  marginBottom: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />

              <Image
                source={{
                  uri: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-song-bien-2.jpg',
                }}
                style={{
                  height: 110,
                  resizeMode: 'cover',
                  borderRadius: 10,
                  marginRight: 10,
                  flex: 1,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: COLOR.primary,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  flex: 1,
                }}>
                <Image
                  source={ICON.camera}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: 5,
                    alignSelf: 'center',
                  }}
                />

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'center',
                  }}>
                  +5
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                borderColor: COLOR.detail,
                borderWidth: 1,
                justifyContent: 'center',
                alignSelf: 'flex-end',
              }}>
              <Image
                source={ICON.vote_up}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              </View> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              width: 200,
              borderRadius: 20,
              marginTop: 10,
              backgroundColor: COLOR.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={ICON.camera}
              style={{width: 25, height: 25, marginRight: 10}}
            />

            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
              }}>
              +20 đánh giá
            </Text>
          </View>

          <View
            style={{
              borderWidth: 0.2,
              width: SIZES.width,
              borderColor: 'gray',
              marginTop: 30,
              marginBottom: 30,
            }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: COLOR.title,
              marginBottom: 20,
            }}>
            Các Tour du lịch khác
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: COLOR.primary,
              }}>
              $ 600
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLOR.primary,
              }}>
              /Person
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: COLOR.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
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
