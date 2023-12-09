import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, PermissionsAndroid, View, ActivityIndicator, Pressable, FlatList } from 'react-native'
import React from 'react'
import { COLOR, ICON, SIZES } from '../../constant/Themes';
import UITextInput from '../../component/UITextInput';
import Entypo from 'react-native-vector-icons/Entypo';
import {
    isValidEmpty
} from '../../constant/Validation';
import { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { openPicker } from '@baronha/react-native-multiple-image-picker'; import storage from '@react-native-firebase/storage';
import AxiosIntance from '../../constant/AxiosIntance';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from '../Loading';
import Item_Booking from '../../component/Tab_item/Item_Booking';
import Item_wishlist from '../../component/Tab_item/Item_wishlist';
import ItemComment from '../../component/Tab_item/ItemComment'

const AddComment = (props) => {
    const { navigation, route } = props;
    const [errorContent, setErrorContent] = useState(true);
    const [isValid, setIsvalid] = useState(false);
    const [content, setContent] = useState('');
    const [cameraPhoto, setCameraPhoto] = useState()
    // const [uriFirebase, setUriFirebase] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5)
    // const [imageCamera, setImageCamera] = useState([])
    const [selectedImage, setSelectedImage] = useState([])
    const [dataTour, setDataTour] = useState()

    // const [user, setUser] = useState();
    // const [tourId, setTourId] = useState()
    const user = useSelector((state) => state.user);
    const { tourID } = route.params;

    useEffect(() => {
        const getTour = async () => {
            const response = await AxiosIntance().get(
                'tour/api/' + tourID + '/detail',
            );
            if (response.result) {
                console.log(response.tour)
                setDataTour(response.tour)
                setLoading(false)
            } else {
                console.log('get tour failed')
            }
        }
        getTour()
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    const options2 = {
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
    const takeAPicture = async () => {
        try {
            const response = await openPicker(options2);
            if (response && response.length > 0) {
                setSelectedImage(response);
                console.log("Hinh chon ne: ", response)
                //upload image
                //uploadImages(response)
            }
        } catch (err) {
        }

    }

    let options = {
        saveToPhotos: true,
        mediaTypes: 'photo',
    }
    const openCamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(options)
            // console.log('result', result)
            setCameraPhoto(result.assets[0].uri)
            // console.log('Results >>>>>>', result.assets[0].uri)

        }
    }
    const onDeleteImage = (image) => {
        console.log("Delete image", image)
        setSelectedImage((list) => {
            const filterImages = list.filter(img => img?.fileName !== image?.fileName);
            return filterImages;
        });
    };

    const uploadImages = async (imageUris) => {
        //setisLoading(true);
        const uploadPromises = imageUris.map(async (imageData) => {
            const imageUri = imageData.realPath; // Lấy đường dẫn tệp ảnh từ realPath
            const reference = storage().ref(`images/${new Date().getTime()}.jpg`);
            console.log('đang tải ảnh lên');
            try {
                // Tải lên tệp ảnh
                await reference.putFile(imageUri);

                // Lấy URL của tệp vừa tải lên
                const url = await reference.getDownloadURL();
                console.log('URL ảnh tải lên:', url);
                //setisLoading(false)

                return url; // Trả về URL của ảnh
            } catch (error) {
                console.error('Lỗi khi tải lên ảnh:', error);
                throw error; // Ném ra lỗi để Promise.all nhận biết lỗi
            }
        });

        try {
            const uploadedUrls = await Promise.all(uploadPromises);
            console.log('Tất cả ảnh đã được tải lên:', uploadedUrls);
            //setisLoading(false)
            addNewComment(uploadedUrls)

        } catch (error) {
            console.error('Có lỗi khi tải lên ảnh:', error);
        }
    }


    const addNewComment = async (uriFirebase) => {
        try {

            const currentDate = new Date();

            // Lấy thông tin ngày, tháng, năm, giờ, phút
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');

            // Tạo chuỗi định dạng dd/mm/yyyy hh:mm
            const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
            console.log("Check data", formattedDateTime)
            const response = await AxiosIntance().post("/comment/api/add-comment", {
                content: content,
                image: uriFirebase,
                rating: rating,
                timeStamp: formattedDateTime,
                user_id: user.user._id,
                tour_id: tourID
            })
            if (response.result) {
                navigation.pop();
                console.log(response.result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Entypo name="chevron-small-left" size={30} color={COLOR.black} />
                        </TouchableOpacity>

                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '600',
                                color: '#0FA3E2',
                                position: 'absolute',
                                left: '50%',
                                transform: [{ translateX: -60 }],
                                fontWeight: 'bold'
                            }}>
                            Phản Hồi
                        </Text>
                    </View>


                    <View style={{ marginTop: 30 }}>
                        <Rating
                            ratingCount={5}
                            showReadOnlyText={false}
                            fractions={1}
                            startingValue={5}
                            jumpValue={0.1}
                            imageSize={20}
                            showRating={true}
                            onFinishRating={rating => { setRating(rating) }}
                        />
                        <TextInput
                            style={{
                                borderColor: errorContent ? COLOR.border : "red",
                                borderRadius: 10,
                                marginTop: 10,
                                paddingHorizontal: 15,
                                borderWidth: 1,
                                height: 100,
                                textAlignVertical: "top"
                            }}
                            onChangeText={text => {
                                setContent(text);
                                setErrorContent(isValidEmpty(text));
                                setIsvalid(true);
                            }}
                            // defaultValue={user.name}
                            placeholder="Nội dung"
                            multiline={true}
                            // editable={false}
                            autoFocus={true}
                        />

                        {!errorContent && (
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: 'red',
                                }}>
                                Không được để trống !
                            </Text>
                        )}
                    </View>


                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: 25,
                        }}>
                        <TouchableOpacity
                            onPress={openCamera}
                            style={{ flex: 1, marginRight: 10 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: COLOR.border,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                }}>
                                <Image source={ICON.camera} />
                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity
                            onPress={() => takeAPicture()}
                            style={{ flex: 1 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: COLOR.border,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                }}>
                                <Image source={ICON.camera_library} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ marginTop: 20 }}>
                    <Image style={{ width: 100, height: 100 }} source={{ uri: galleryPhoto }} />
                </View> */}
                    <View style={styles.imageRow}>
                        {selectedImage?.map(image => {
                            return (
                                <View style={styles.imageContent} key={image.fileName + image.uri}>
                                    <Image style={styles.image} source={{ uri: image.path }} />
                                    <Pressable hitSlop={20} onPress={() => onDeleteImage(image)} >
                                        <Image style={styles.delete} source={ICON.close} />
                                    </Pressable>
                                </View>
                            );
                        })}
                        {loading ? (
                            <ActivityIndicator />
                        ) : null}
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: 28,
                            marginBottom: 20,
                        }}>
                        {/* <TouchableOpacity
                        onPress={() => uploadImages(selectedImage)}
                        style={{
                            width: "100%",
                            height: 50,
                            backgroundColor: COLOR.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 8,
                        }}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: '#ffffff' }}>
                            Gửi Phản Hồi
                        </Text>
                    </TouchableOpacity> */}
                    </View>
                    <ItemComment data={dataTour} navigation={navigation} />
                </ScrollView>

            </SafeAreaView>
            <View style={styles.groupButton}>
                <TouchableOpacity style={styles.button} onPress={() => uploadImages(selectedImage)}>
                    <Text style={styles.textButton}>Gửi Phản Hồi</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default AddComment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        width: SIZES.width,
        backgroundColor: COLOR.white,
        height: SIZES.height,
        marginBottom: 50

    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 5
    },
    imageContent: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 3,
    },
    delete: {
        width: 24,
        height: 24,
        marginTop: -8,
        marginLeft: -20
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingTop: 20
    },
    groupButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
        paddingVertical: 11,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    button: {
        width: '100%',
        height: 52,
        borderRadius: 15,
        backgroundColor: '#0FA3E2'
    },
    textButton: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 52,
        letterSpacing: -0.17,
        color: '#FFFFFF',
        textAlign: 'center'
    },
})