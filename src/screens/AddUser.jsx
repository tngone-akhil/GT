import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, Loader} from '../shared/CommonComponent';
import {style} from './UserManagement';
import {InputTextComponent} from '../shared/InputTextComponent';
import {stylesall} from './AddTaskScreen';
import {ButtonComponent} from '../shared/ButtonComponent';
import {DropDownComponent} from '../shared/DropDownComponenet';
import {useNavigation} from '@react-navigation/native';
import {AUTH_ENDPOINTS} from '../services/constants';
import {axiosIntercepted} from '../services';
import {validPhone, validateEmail} from '../utlis/helpers';

const roles = [
  {label: 'Admin', value: 'ADMIN'},
  {label: 'User', value: 'CLIENT'},
];

export function AddUser() {
  const navigation = useNavigation();
  const [locationOn, setLocationOn] = useState(true);
  const [headQuaterOn, setHeadQuaterOn] = useState(false);
  const [user, setUser] = useState({
    name: null,
    email: null,
    phone: '',
    location: null,
    role: null,
  });
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setphoneValid] = useState(false);
  const [nameValid, setnameValid] = useState(false);
  const [roleValid, setRoleValid] = useState(false);
  const [locationValid, setLocationValid] = useState(false);

  const [loader, setLoader] = useState(false);

  const [submit, setSubmit] = useState(false);

  const validation = () => {
    let flag = false;
    if (!user.name) {
      setnameValid(true);
      flag = true;
    }
    if (!validateEmail(user.email)) {
      setEmailValid(true);
      flag = true;
    }
    if (!validPhone(user.phone)) {
      setphoneValid(true);
      flag = true;
    }
    if (!user.location) {
      setLocationValid(true);
      flag = true;
    }
    if (!user.role) {
      setRoleValid(true);
      flag = true;
    }
    if (flag) {
      return;
    } else {
      saveUser();
    }
  };

  const saveUser = async () => {
    setSubmit(true);

    if (!validateEmail(user.email)) {
      setEmailValid(true);
    } else {
      try {
        setLoader(true);
        const URL = AUTH_ENDPOINTS.ADD_USER;
        const BODY = JSON.stringify({
          name: user.name,
          email: user.email,
          phoneNumber: user.phone,
          location: user.location,
          role: user.role,
        });
        const response = await axiosIntercepted.post(URL, BODY);
        setLoader(false);
        setSubmit(false);
        navigation.navigate('User');
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log(emailValid);
  return (
    <SafeAreaView style={style.Container}>
      {loader && <Loader />}
      <Header header={'Add User'} />
      <ScrollView>
        <View>
          <InputTextComponent
            errorText={'Please enter the Name'}
            errorComponent={nameValid}
            upperFont={stylesall.fontStyle}
            TextUpper={'Name'}
            value={user.name}
            onchange={e => {
              setnameValid(false);
              setUser(prev => {
                return {...prev, name: e};
              });
            }}
            placeHolder={'Enter the Name'}
          />
          <InputTextComponent
            errorText={'Enter the valid email'}
            errorComponent={emailValid}
            upperFont={stylesall.fontStyle}
            TextUpper={'Email'}
            value={user.email}
            onchange={e => {
              setEmailValid(false);
              setUser(prev => {
                return {...prev, email: e};
              });
            }}
            placeHolder={'Enter the Email'}
          />
          <InputTextComponent
            errorText={'Enter the valid Phone'}
            keyboardType={'numeric'}
            errorComponent={phoneValid}
            upperFont={stylesall.fontStyle}
            TextUpper={'Phone'}
            value={user.phone}
            onchange={e => {
              setphoneValid(false);
              setUser(prev => {
                return {...prev, phone: e};
              });
            }}
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
          <InputTextComponent
            errorText={'Enter the valid Location'}
            errorComponent={locationValid}
            value={user.location}
            onchange={e => {
              setLocationValid(false);
              setUser(prev => {
                return {...prev, location: e};
              });
            }}
            placeHolder={'Enter the Location'}
          />
          <DropDownComponent
            upperText={'Role'}
            error={roleValid}
            placeholder={'Select Role'}
            data={roles}
            functionality={e => {
              setRoleValid(false);
              setUser(prev => {
                return {...prev, role: e};
              });
            }}
          />
          <ButtonComponent
            onPresscomponent={validation}
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
