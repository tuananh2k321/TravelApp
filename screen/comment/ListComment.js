import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOR } from '../../constant/Themes';
import { useState } from 'react';
import { useEffect } from 'react';
import AxiosIntance from '../../constant/AxiosIntance';
import { AirbnbRating, Rating } from 'react-native-ratings';






const ListComment = ({ navigation, route }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setLoading] = useState(true)

    const [refreshing, setRefreshing] = useState(false);
    const { id } = route.params
    console.log('id>>>>', id)

    const handleRefresh = () => {
        setRefreshing(true);


        getComment()

        setRefreshing(false);


        // Thực hiện các công việc làm mới dữ liệu ở đây, sau đó cập nhật state data

        // Ví dụ: Sau 2 giây, dừng làm mới và cập nhật dữ liệu


    };


    const getComment = async () => {
        try {
            const response = await AxiosIntance().get(`comment/api/listComment/?tour_id=${id}`);

            // console.log("Check response commment", response)
            const listData = await response.comments
            console.log('listData list comments', listData)
            setComments(listData)
        } catch (error) {
            console.log("error:>>>>> " + error)
        }
    }
    useEffect(() => {
        getComment()
    }, [])

    const renderItem = ({ item }) => {
        const images = item?.image || [];

        return (
            <View
                style={{
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: COLOR.lightBlack2,
                    padding: 15,
                    backgroundColor: 'white',
                    marginBottom: 20
                }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={{ uri: item.user_id.avatar }}
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
                            {item.user_id.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Rating
                                ratingCount={5}
                                jumpValue={0.1}
                                imageSize={12}
                                startingValue={item.rating}
                                onFinishRating={rating => { setRatings(rating) }}
                            />
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
                    {item.content}
                </Text>
                <View style={{ flexDirection: "row" }}>
                    {images.map((imageUri, index) => (
                        <Image
                            key={index}
                            source={{ uri: imageUri }}
                            style={{
                                width: 70,
                                height: 70,
                                marginRight: 20,
                            }}
                        />
                    ))}
                </View>


                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={{ color: COLOR.detail, fontSize: 14, fontWeight: '400' }}>
                            Đã đăng
                        </Text>
                        <Text style={{ color: COLOR.detail, fontSize: 14, fontWeight: '400', marginLeft: 10 }}>
                            {item.timeStamp}
                        </Text>

                    </View>

                </View>

            </View>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Entypo name="chevron-small-left" size={30} color={COLOR.black} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Danh sách phản hồi</Text>
                    <View style={{ marginEnd: 20 }} />
                </View>
            </View>

            <FlatList
                data={comments}
                keyExtractor={item => item._id}
                renderItem={renderItem}
                onRefresh={handleRefresh}
                refreshing={refreshing}
            />
        </View>

    )
}

export default ListComment

const styles = StyleSheet.create({
    container: {
        marginBottom: 50
    }
})