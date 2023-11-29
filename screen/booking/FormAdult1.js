import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import UITextInput from '../../component/UITextInput';
import { COLOR, ICON } from '../../constant/Themes';
import { validateDateOfBirth } from '../../constant/Validation';
import DatePicker from 'react-native-date-picker';
import { useEffect } from 'react';

const FormAdult = ({ index, onDataChange }) => {

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('nguoi lon');

  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [errorBirthday, setErrorBirthday] = useState(true);
  const [isValid, setIsvalid] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleInputChange = () => {
    const formData = { name, birthDate, gender, type };
    onDataChange(index, formData);
  };

  const checkForm = (
    birthDate,
  ) => {
    if (birthDate.length === 0) {
      console.log('birthDate emty');
      setErrorBirthday(false);
      setIsvalid(false);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={{
                fontSize: 16, fontWeight: 'bold'
            }}>Thông tin cơ bản (Bắt buộc) Người lớn</Text>
      <Text>Tên:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        onBlur={handleInputChange}
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
      onChangeText={text => {
        console.log(text);
        setBirthDate(text);
        setErrorBirthday(validateDateOfBirth(text));
        setIsvalid(true);
      }}
      onBlur={handleInputChange}/>
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
      
        <Text style={{marginTop: 10}}>Giới tính:</Text>
        <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          onBlur={handleInputChange}
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
        minimumDate={new Date('1950-12-31')}
        maximumDate={new Date('2005-12-31')}
        date={currentDate}
        onConfirm={date => {
            setOpen(false);
            var day = date.getDate().toString().padStart(2, '0');
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var year = date.getFullYear();
            setDate(day + '/' + month + '/' + year);
            setBirthDate(day + '/' + month + '/' + year);
            setErrorBirthday(
              validateDateOfBirth(day + '/' + month + '/' + year),
            );
            // console.log(day + '/' + month + '/' + year);
          }}
          onCancel={()=>{
            setOpen(false)
          }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
});

export default FormAdult;
