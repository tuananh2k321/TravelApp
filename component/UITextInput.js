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

export default UITextInput = props => {
  const {hintText, onChangeText, isIconRight, isTextEntry, keyboardType, icon, borderError, onPress, defaultValue} = props;

  return (
    <View>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: borderError ?  COLOR.border : 'red' ,
          borderRadius: 10,
          marginTop: 10,
          paddingHorizontal: 15,
        }}
        placeholder={hintText}
        secureTextEntry = {isTextEntry}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        defaultValue= {defaultValue}
      />

      {isIconRight && (
        <TouchableOpacity
          onPress={onPress}
          style={{position: 'absolute', top: 25, right: 10}}>
          <Image source={icon} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      )}
    </View>
  );
};
