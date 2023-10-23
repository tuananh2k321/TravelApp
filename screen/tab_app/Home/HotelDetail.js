import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLOR, ICON, SIZES} from '../../../constant/Themes';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import ImageSlideshow from '../../../component/Tab_item/ImageSlideshow';

const HotelDetail = props => {
  const [showMore, setShowMore] = useState(false);
  const maxChars = 200; // Số ký tự tối đa trước khi ẩn nội dung
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const sampleText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis condimentum morbi non egestas enim amet sagittis. Proin sed aliquet rhoncus ut pellentesque ullamcorper sit eget ac.Sit nisi, cras ametvarius eget egestas pellentesque. Cursus gravida euismod non';
  const images = [
    'https://www.lifegate.com/app/uploads/mare-fa-bene-2.jpg',
    'https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_640.jpg',
    'https://www.lifegate.com/app/uploads/mare-fa-bene-2.jpg',
  ];
  const {navigation} = props;
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: COLOR.white, width: SIZES.width}}>
        {/* <ImageBackground
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
            </ImageBackground> */}
        <ImageSlideshow images={images} interval={3000} />
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            width: SIZES.width,
            justifyContent: 'space-between',
            padding: 15,
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

          <View style={{flexDirection: 'row'}}>
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
              <FontAwesome5 name={'share-alt'} size={16} color="#000000" />
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
              <FontAwesome name={'heart-o'} size={16} color="#000000" />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
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
            Koh Rong Samloem
          </Text>
          {/* đánh giá */}
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
          {/* Địa chỉ */}
          <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: COLOR.title,
                marginTop: 25,
                marginBottom: 10,
              }}>
              Địa chỉ
            </Text>
            <Text
              numberOfLines={2}
              style={{fontSize: 16, fontWeight: '600', color: COLOR.detail}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </Text>
          </View>
          {/* sdt */}
          <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: COLOR.title,
                marginTop: 25,
                marginBottom: 10,
              }}>
              Số điện thoại
            </Text>
            <Text
              numberOfLines={2}
              style={{fontSize: 16, fontWeight: '600', color: COLOR.detail}}>
              1209012930123
            </Text>
          </View>
          {/* miêu tả */}
          <View style={{flexDirection: 'column', justifyContent: 'flex-start',paddingBottom:20}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: COLOR.title,
                marginTop: 25,
                marginBottom: 10,
              }}>
              Miêu tả
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: COLOR.detail,
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
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default HotelDetail;

const styles = StyleSheet.create({});
