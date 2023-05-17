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
  const {hintText, onChangeText, isIconRight, isTextEntry, keyboardType, icon} = props;

  return (
    <View>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: COLOR.border,
          borderRadius: 10,
          marginTop: 10,
          paddingHorizontal: 15,
        }}
        placeholder={hintText}
        secureTextEntry = {isTextEntry}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />

      {isIconRight && (
        <TouchableOpacity
          onPress={() => {}}
          style={{position: 'absolute', top: 25, right: 10}}>
          <Image source={icon} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      )}
    </View>
  );
};
