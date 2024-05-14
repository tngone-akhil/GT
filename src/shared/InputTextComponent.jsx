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
}) => {
  const [eyeVisible, setEyeVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  const toggle = () => {
    setEyeVisible(!eyeVisible);
    setTextVisible(!textVisible);
  };

  return (
    <View style={upperStyle}>
      <Text style={[style.text, upperFont]}>{TextUpper}</Text>
      <View>
        <TextInput
          style={[
            style.textbox,
            {
              backgroundColor: !isEditable ? '#ECECEC' : 'white',
              height: multiLine ? 100 : 45,
            },
          ]}
          placeholder={placeHolder}
          value={value}
          onChange={onchange}
          editable={isEditable}
          multiline={multiLine}
          secureTextEntry={textVisible}
          textAlignVertical={multiLine ? 'top' : 'center'}
          blurOnSubmit={true}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={toggle}
            style={{position: 'absolute', right: 17, top: 12}}>
            {!eyeVisible ? <Eyeoff /> : <Eyeon />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  textbox: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 10,
    width: '96%',
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10,
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
