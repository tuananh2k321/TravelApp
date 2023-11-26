import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOR } from '../../constant/Themes';
import { useState } from 'react';


const Reason = ({ navigation }) => {

    const [errorContent, setErrorContent] = useState(true);
    const [content, setContent] = useState('');
    const [isValid, setIsvalid] = useState(false);

    return (
        <ScrollView>
            <SafeAreaView>
                <View style={styles.header}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Entypo name="chevron-small-left" size={30} color={COLOR.black} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', color: '#0FA3E2' }}>Lý Do</Text>
                        <View style={{ marginEnd: 20 }} />
                    </View>
                </View>


                <View style={{ marginTop: 30 }}>

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
                            Gửi Lý Do
                        </Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default Reason

const styles = StyleSheet.create({})