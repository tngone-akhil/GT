import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DownArrow from  '../images/svg/DownArrow.svg'

export function DropDownComponent({
  upperText,
  upperTextStyle,
  functionality,
  data = [],
  placeholder,

}) {
  return (
    <View style={{marginLeft: 10,marginTop:5}}>
      <Text style={[upperTextStyle,{color:'black',fontWeight:'500'}]}>{upperText}</Text>
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
       
        style={pickerSelectStyles}
        items={data}
        onValueChange={functionality}
        placeholder={{label: placeholder, value: null}}
      />
      <View style={{position:'absolute',right:15,top:38}}><DownArrow/></View>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 45,
    alignItems: 'center',
    marginVertical: 6,
    borderWidth: 1,
  },

  inputAndroid: {
    fontSize: 14,
    width:'98%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: 'grey',
    color: 'black',
  },
});
