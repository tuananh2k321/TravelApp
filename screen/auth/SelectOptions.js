import React, {useMemo, useState} from 'react';
import {SafeAreaView, Image, Text, View, TouchableOpacity} from 'react-native';
import {COLOR, ICON, IMAGES, SIZES} from '../../constant/Themes';
import UIButtonPrimary from '../../component/UIButtonPrimary';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RadioGroup from 'react-native-radio-buttons-group';

export default SelectOptions = props => {
  const {navigation} = props;
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        value: 'option1',
      },
      {
        id: '2',
        value: 'option2',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState();
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          backgroundColor: COLOR.white,
          padding: 15,
          width: SIZES.width,
          height: SIZES.height,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{position: 'absolute', top: 15, left: 10}}
          onPress={() => navigation.pop()}>
          <Image
            source={ICON.left}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <Image source={IMAGES.logo} style={{alignSelf: 'center'}} />

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLOR.title,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Quên mật khẩu
        </Text>

        <View style={{width: 300, alignSelf: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '400',
              color: COLOR.detail,
              marginTop: 15,
            }}>
            Chọn một phương thức để chúng tôi hỗ trợ lấy lại mật khẩu cho bạn
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <RadioGroup
            style={{alignSelf: 'center'}}
            radioButtons={radioButtons}
            onPress={(id) => setSelectedId(id)} // Cập nhật giá trị đã chọn vào selectedId
            selectedId={selectedId}
          />
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              marginLeft: 10
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: COLOR.detail,
                marginBottom: 10, // Điều chỉnh giá trị margin bottom tùy ý
              }}>
              Email
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: COLOR.detail,
                marginBottom: 6, // Điều chỉnh giá trị margin bottom tùy ý
              }}>
              Số điện thoại
            </Text>
          </View>
        </View>

        <View style={{marginTop: 30}}>
          <UIButtonPrimary
            text="Xác nhận"
            onPress={() => {
              console.log("selectedId: "+selectedId)
              if (selectedId == 1) {
                navigation.navigate('PasswordByEmail')
              } else if (selectedId == 2) {
                navigation.navigate('PasswordByPhoneNumber')
              }
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
