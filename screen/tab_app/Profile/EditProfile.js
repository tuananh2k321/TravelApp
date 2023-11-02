import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR, SIZES, ICON} from '../../../constant/Themes';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import {
    isValidEmpty,
    validateDateOfBirth,
    validateEmail,
    validatePassword,
    validatePhoneNumber,
  } from '../../../constant/Validation';
  import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
  import UITextInput from '../../../component/UITextInput';
  import { useSelector } from 'react-redux'
  import Loading from '../../Loading'
import { useEffect } from 'react';
// import { openPicker } from '@baronha/react-native-multiple-image-picker';
const EditProfile = (props) => {

    const {navigation} = props

    const handleReloadPage = () => {
        navigation.goBack(); // Quay lại màn hình trước đó
        navigation.navigate('Report'); // Điều hướng đến lại trang "ReportProblem"
      };

      const [selectedImage, setSelectedImage] = useState([]);

      const uploadImage = async (imageUri) => {
        setisLoading(true);
    
        const reference = storage().ref(`images/${new Date().getTime()}.jpg`);
        console.log('đang tải ảnh lên');
    
        try {
          // Tải lên tệp ảnh
          if (imageUri) {
            await reference.putFile(imageUri);
    
          // Lấy URL của tệp vừa tải lên
          const url = await reference.getDownloadURL();
          console.log('URL ảnh tải lên ne:', url);
          setImg(url);
          setisLoading(false);
          } else {
          console.log('Khg có image');
          }
          
        } catch (error) {
          console.error('Lỗi khi tải lên ảnh:', error);
        }
      };

    //   const uploadImages = async (imageUris) => {
    //     setisLoading(true);
    //   const uploadPromises = imageUris.map(async (imageData) => {
    //     const imageUri = imageData.realPath; // Lấy đường dẫn tệp ảnh từ realPath
    //     const reference = storage().ref(`images/${new Date().getTime()}.jpg`);
    //     console.log('đang tải ảnh lên');
    //     try {
    //       // Tải lên tệp ảnh
    //       await reference.putFile(imageUri);
    
    //       // Lấy URL của tệp vừa tải lên
    //       const url = await reference.getDownloadURL();
    //       console.log('URL ảnh tải lên:', url);
    
    //       return url; // Trả về URL của ảnh
    //     } catch (error) {
    //       console.error('Lỗi khi tải lên ảnh:', error);
    //       throw error; // Ném ra lỗi để Promise.all nhận biết lỗi
    //     }
    //   });
    //   try {
    //     const uploadedUrls = await Promise.all(uploadPromises);
    
    //     console.log('Tất cả ảnh đã được tải lên:', uploadedUrls);
    //     setisLoading(false)
    //     setImg(uploadedUrls);
    //   } catch (error) {
    //     console.error('Có lỗi khi tải lên ảnh:', error);
    //   }
    // }

    const options = {
        mediaType: 'photo', // Chỉ chọn ảnh, bạn có thể sử dụng 'video' để chọn video.
        includeBase64: false, // True nếu bạn muốn nhận được dữ liệu ảnh dưới dạng Base64.
        cameraType: 'back', // Sử dụng camera sau. Bạn có thể sử dụng 'front' cho camera trước.
        cropping: true, // Cho phép cắt ảnh sau khi chụp.
        useFrontCamera: false, // Sử dụng camera trước nếu cameraType là 'front'.
        showCropGuidelines: true, // Hiển thị hướng dẫn cắt ảnh.
        freeStyleCropEnabled: true, // Cho phép cắt ảnh theo tự do.
        cropping: true, // Cho phép cắt ảnh.
        cropperCircleOverlay: false, // Hiển thị vùng cắt hình tròn.
        compressImageQuality: 0.8, // Chất lượng ảnh nén (giá trị từ 0 đến 1).
      };
      const pickImage = async () => {
        try {
          const response = await openPicker(options);
          if (response) {
            setSelectedImage(response);
            console.log(response)
          }
        } catch (err) {
        }
    
      }

    const [errorName, setErrorName] = useState(true);
    const [errorLastName, setErrorLastName] = useState(true);
    const [errorPhone, setErrorPhone] = useState(true);
    const [errorBirthday, setErrorBirthday] = useState(true);
    const [isValid, setIsvalid] = useState(false);

  const [date, setDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');

  const user = useSelector(state => state.user.user);

  const userId = useSelector(state => state.user.user._id);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      console.log('Edit Profile user: ' + JSON.stringify(user));
        setIsLoading(false)
        console.log(user.dob)
    } else {
      setIsLoading (true)
    }
  }, [user]);

  if (isLoading) {
    return <Loading></Loading>; 
  }

    const checkForm = (
        name,
        lastName,
        phoneNumber,
        dob,
      ) => {
        if (name.length === 0) {
          console.log('name emty');
          setErrorName(false);
          setIsvalid(false);
        }
    
        if (lastName.length === 0) {
          console.log('last name emty');
          setErrorLastName(false);
          setIsvalid(false);
        }
    
        if (phoneNumber.length === 0) {
          console.log('phone number emty');
          setErrorPhone(false);
          setIsvalid(false);
        }
    
        if (dob.length === 0) {
          console.log('dob emty');
          setErrorBirthday(false);
          setIsvalid(false);
        }
        
      };
    
      if (isLoading) {
        return <Loading></Loading>; 
      }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Entypo name="chevron-small-left" size={30} color={COLOR.black} />
            </TouchableOpacity>
         
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#000000',
              position: 'absolute',
              left: '50%',
              transform: [{translateX: -50}],
              fontWeight: 'bold'
            }}>
            Edit Profile
          </Text>
        </View>
        <View style={styles.image}>
          <Image
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              resizeMode: 'stretch',
              borderWidth: 2,
              borderColor: COLOR.primary
            }}
            source={{uri: user.avatar}}></Image>
          <TouchableOpacity
          onPress={() => pickImage()}
           style={styles.settings}>
            <Feather
              style={{position: 'absolute'}}
              name="camera"
              size={20}
              color={COLOR.white}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Tên
        </Text>

        <UITextInput
          hintText="Tuấn Anh"
          borderError={errorName}
          onChangeText={text => {
            setName(text);
            setErrorName(isValidEmpty(text));
            setIsvalid(true);
          }}
          defaultValue={user.name}
        />

        {!errorName && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Không được để trống !
          </Text>
        )}

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Họ
        </Text>

        <UITextInput
          hintText="Trần"
          borderError={errorLastName}
          onChangeText={text => {
            setLastName(text);
            setErrorLastName(isValidEmpty(text));
            setIsvalid(true);
          }}
          defaultValue={user.lastName}
        />

        {!errorLastName && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Không được để trống !
          </Text>
        )}
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Số điện thoại
        </Text>

        <UITextInput
          hintText=""
          keyboardType="numeric"
          borderError={errorPhone}
          onChangeText={text => {
            setPhoneNumber(text);
            setErrorPhone(validatePhoneNumber(text));
            setIsvalid(true);
          }}
          defaultValue={user.phoneNumber}
        />

        {!errorPhone && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Số điện thoại không hợp lệ !
          </Text>
        )}

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: COLOR.detail,
            marginTop: 20,
          }}>
          Ngày sinh
        </Text>

        <UITextInput
          hintText="01/05/2003"
          isIconRight={true}
          icon={ICON.calendar}
          defaultValue={user.dob}
          onPress={() => setOpen(true)}
          borderError={errorBirthday}
          onChangeText={text => {
            console.log(text);
            setDob(text);
            setErrorBirthday(validateDateOfBirth(text));
            setIsvalid(true);
          }}
        />

        {!errorBirthday && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: 'red',
            }}>
            Ngày sinh không hợp lệ !
          </Text>
        )}
         <View
          style={{
            alignItems: 'center',
            marginTop: 28,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              backgroundColor: COLOR.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Text style={{fontWeight: '500', fontSize: 18, color: '#ffffff'}}>
              Lưu Thay Đổi
            </Text>
          </TouchableOpacity>
        </View>


        </View>
       
        <DatePicker
          modal
          open={open}
          androidVariant="iosClone"
          mode="date"
          minimumDate={new Date('1950-12-31')}
          maximumDate={new Date('2005-12-31')}
          date={currentDate}
          onConfirm={date => {
            setOpen(false);
            var day = date.getDate().toString().padStart(2, '0');
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var year = date.getFullYear();
            setDate(day + '/' + month + '/' + year);
            setDob(day + '/' + month + '/' + year);
            setErrorBirthday(
              validateDateOfBirth(day + '/' + month + '/' + year),
            );
            // console.log(day + '/' + month + '/' + year);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
       
      </SafeAreaView>
      
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width: SIZES.width,
    backgroundColor: COLOR.white,
    
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  image: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  settings: {
    backgroundColor: '#0FA3E2',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: "35%",
  },
});
