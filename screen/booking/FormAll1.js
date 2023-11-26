import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import React from 'react'
import FormAdult from './FormAdult1';
import FormChildren from './FormChildren1';
import { Picker } from '@react-native-picker/picker';
import UITextInput from '../../component/UITextInput';
import { COLOR, ICON } from '../../constant/Themes';
import { validateDateOfBirth } from '../../constant/Validation';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';




const FormAll = (props) => {
    const { navigation, route } = props;
    const { adult, children } = route.params;
    console.log('aadult', adult)
    console.log('children', children)
    let adult1 = Number(adult);
    let children1 = Number(children);

    //này là của form
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');

    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false);
    const [errorBirthday, setErrorBirthday] = useState(true);
    const [isValid, setIsvalid] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const checkForm = (
        dob,
    ) => {
        if (dob.length === 0) {
            console.log('dob emty');
            setErrorBirthday(false);
            setIsvalid(false);
        }
    };

    const [formData, setFormData] = useState([lastName, dob, gender]);

    const handleInputChange = (index, fieldName, value) => {
        const updatedFormData = [...formData];
        updatedFormData[index][fieldName] = value;
        setFormData(updatedFormData);
    };

    const navigateToScreen3 = () => {
        // navigation.navigate('Abcd', { formData });
        console.log('âdaad', formData)
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            {[...Array(adult1)].map((_, index) => (
                <View key={index}>
                    <View style={styles.containerForm}>
                        <View>
                            <Text style={{
                                fontSize: 16, fontWeight: 'bold',
                                marginBottom: 25
                            }}>Trẻ em ...</Text>
                        </View>
                        <Text style={{
                            fontSize: 16, fontWeight: 'bold'
                        }}>Thông tin cơ bản (Bắt buộc)</Text>
                        <Text>Tên:</Text>
                        <TextInput
                            style={styles.input}
                            // onChangeText={(text) => setLastName(text)}
                            onChangeText={(text, index) => setLastName(text)}
                            value={lastName}
                            placeholder="Nhập tên"
                        />
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            color: COLOR.detail,
                        }}>Ngày - tháng - năm sinh:</Text>
                        <UITextInput
                            hintText="01/05/2003"
                            isIconRight={true}
                            icon={ICON.calendar}
                            defaultValue={date.toString()}
                            onPress={() => setOpen(true)}
                            borderError={errorBirthday}
                            onChangeText={(text, index) => {
                                console.log(text);
                                setDob(text)
                                setErrorBirthday(validateDateOfBirth(text));
                                setIsvalid(true);
                            }} />
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

                        <Text style={{ marginTop: 10 }}>Giới tính:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={gender}
                                onValueChange={(itemValue, index) => setGender(itemValue)}
                            >
                                <Picker.Item label="Chọn giới tính" value="" />
                                <Picker.Item label="Nam" value="Nam" />
                                <Picker.Item label="Nữ" value="Nữ" />
                                <Picker.Item label="Khác" value="Khác" />
                            </Picker>
                        </View>

                        <DatePicker
                            modal
                            open={open}
                            androidVariant="iosClone"
                            mode="date"
                            minimumDate={new Date('1990-12-31')}
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
                                setOpen(false)
                            }} />
                    </View>
                </View>
            ))}
            <Button title="Save" onPress={navigateToScreen3} />
        </View>
        </ScrollView>
    )
}

export default FormAll

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    formContainer: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    containerForm: {
        flexGrow: 1,
        padding: 20,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 9
    },
    pickerContainer: {
        borderColor: 'gray',
        borderWidth: 0.5,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 9
    },
    picker: {
        height: 50,
    },
})