import React from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLOR, ICON, IMAGES, SIZES} from '../constant/Themes';
import UITextInput from '../component/UITextInput';
import UIButtonPrimary from '../component/UIButtonPrimary';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default Successfully = () => {
  return (
      <SafeAreaView
        style={{
          backgroundColor: COLOR.primary,
          padding: 15,
          width: SIZES.width,
          height: SIZES.height,
          justifyContent: 'center',
        }}>
    
        <Image source={IMAGES.logoWhite} style={{alignSelf: 'center'}} />

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: "white",
            marginTop: 20,
            textAlign: 'center',
          }}>
          Thành Công
        </Text>
        {/* <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: "white",
            marginTop: 5,
            textAlign: 'center',
          }}>
          Đã tạo tài khoản
        </Text> */}

        <View style={{width: 300, alignSelf: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '400',
              color: 'white',
              marginTop: 15,
            }}>
            Sau này, bạn có thể khám phá bất kỳ nơi nào bạn muốn tận hưởng nó!
          </Text>
        </View>


        <View style={{alignItems: 'center', position: 'absolute', bottom: 50, left: '50%', right: '50%'}}>
        <TouchableOpacity style={{backgroundColor: 'white',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
        width: SIZES.width - 20,
        
        }}>
       <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLOR.title,
            textAlign: 'center',
          }}>
          Khám Phá
        </Text>
       </TouchableOpacity>
      </View>
      
      </SafeAreaView>
  );
};
