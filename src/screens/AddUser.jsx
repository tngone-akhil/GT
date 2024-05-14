import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../shared/CommonComponent';
import {style} from './UserManagement';
import {InputTextComponent} from '../shared/InputTextComponent';
import {stylesall} from './AddTaskScreen';
import {ButtonComponent} from '../shared/ButtonComponent';
import {DropDownComponent} from '../shared/DropDownComponenet';

const roles = [
  {label: 'Admin', value: 'admin'},
  {label: 'User', value: 'user'},
];

export function AddUser() {
  const [locationOn, setLocationOn] = useState(true);
  const [headQuaterOn, setHeadQuaterOn] = useState(false);

  const [role,setRole] = useState('');

  return (
    <SafeAreaView style={style.Container}>
      <Header header={'Add User'} />
      <ScrollView>
        <View>
          <InputTextComponent
            upperFont={stylesall.fontStyle}
            TextUpper={'Name'}
            placeHolder={'Enter the Name'}
          />
          <InputTextComponent
            upperFont={stylesall.fontStyle}
            TextUpper={'Email'}
            placeHolder={'Enter the Email'}
          />
          <InputTextComponent
            upperFont={stylesall.fontStyle}
            TextUpper={'Phone'}
            placeHolder={'Enter the Phone Number'}
          />
          <View
            style={{flexDirection: 'row', marginLeft: 10, marginBottom: -15}}>
            <TouchableOpacity
              onPress={() => {
                setLocationOn(true);
                setHeadQuaterOn(false);
              }}
              style={[
                locationOn ? styles.touchable : styles.touchableoff,
                {borderTopLeftRadius: 10, borderBottomLeftRadius: 10},
              ]}>
              <Text
                style={[
                  styles.touchableText,
                  locationOn ? {color: 'blue'} : {color: 'black'},
                ]}>
                Location
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setLocationOn(false);
                setHeadQuaterOn(true);
              }}
              style={[
                headQuaterOn ? styles.touchable : styles.touchableoff,
                {borderTopRightRadius: 10, borderBottomRightRadius: 10},
              ]}>
              <Text
                style={[
                  styles.touchableText,
                  headQuaterOn ? {color: 'blue'} : {color: 'black'},
                ]}>
                HeadQuaters
              </Text>
            </TouchableOpacity>
          </View>
          <InputTextComponent placeHolder={'Enter the Name'} />
          <DropDownComponent
            upperText={'Role'}
            placeholder={'Select Role'}
            data={roles}
            functionality={(value)=>{setRole(value)}}
          />
          <ButtonComponent
            buttonStyle={stylesall.button}
            textStyle={stylesall.textLogin}
            title={'Submit'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  touchable: {
    backgroundColor: '#E5ECFF',
    height: 30,
    width: 100,
    borderWidth: 1,
    borderColor: 'blue',
  },
  touchableText: {
    textAlign: 'center',
    marginTop: 2,
  },
  touchableoff: {
    backgroundColor: 'white',
    height: 30,
    width: 100,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
