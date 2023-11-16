import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR, ICON, SIZES } from '../../constant/Themes';
import UITextInput from '../../component/UITextInput';
import Entypo from 'react-native-vector-icons/Entypo';
import {
    isValidEmpty
} from '../../constant/Validation';
import { useState } from 'react';
const AddComment = (props) => {
    const { navigation, route } = props;
    const [errorContent, setErrorContent] = useState(true);
    const [isValid, setIsvalid] = useState(false);
    const [content, setContent] = useState('');
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
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: COLOR.detail,
                            marginTop: 20,
                        }}>
                        Nội dung
                    </Text>

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
                            borderRadius: 8,
                        }}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: '#ffffff' }}>
                            Gửi Phản Hồi
                        </Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default AddComment

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
})