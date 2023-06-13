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

export default UIButtonPrimary = props => {
  const {text, onPress} = props;
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        backgroundColor: COLOR.primary,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
