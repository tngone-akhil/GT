import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Eyeon from '../images/svg/eyeOn.svg';
import Eyeoff from '../images/svg/eyeOff.svg';

export const InputTextComponent = ({
  TextUpper,
  placeHolder,
  value,
  onchange,
  upperStyle,
  upperFont,
  isEditable = true,
  multiLine = false,
  isPassword = false,
  errorComponent = false,
  errorText,
  keyboardType
}) => {
  const [eyeVisible, setEyeVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);

  const toggle = () => {
    setEyeVisible(!eyeVisible);
    setTextVisible(!textVisible);
  };

  return (
    <View style={upperStyle}>
      <Text style={[style.text, upperFont]}>{TextUpper}</Text>
      <View>
        <TextInput
        keyboardType={keyboardType}
          style={[
            style.textbox,
            {
              backgroundColor: !isEditable ? '#ECECEC' : 'white',
              height: multiLine ? 100 : 45,
              borderColor:!errorComponent ? '#808080':'red',
              
            },
          ]}
          placeholder={placeHolder}
          value={value}
          onChangeText={value => onchange(value)}
          editable={isEditable}
          multiline={multiLine}
          secureTextEntry={textVisible}
          textAlignVertical={multiLine ? 'top' : 'center'}
          blurOnSubmit={true}
          placeholderTextColor={'black'}
          
        />
        {isPassword && (
          <TouchableOpacity
            onPress={toggle}
            style={{position: 'absolute', right: 17, top: 12}}>
            {!eyeVisible ? <Eyeoff /> : <Eyeon />}
          </TouchableOpacity>
        )}
      </View>
     {errorComponent && <Text style={{position:'absolute', top:15,left:5,color:'red'}}>{errorText}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  textbox: {
    borderWidth: 1,
    borderRadius: 10,
    width: '96%',
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10,
    color:'black'
  },
  text: {
    color: 'black',
    marginBottom: 8,
    fontWeight: '400',
  },
  upperText: {
    marginTop: 12,
  },
  otp: {
    height: 50,
    width: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
