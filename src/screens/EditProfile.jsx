import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Header, Loader} from '../shared/CommonComponent';
import {style} from './UserManagement';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosBase, axiosIntercepted} from '../services';
import {useAuth} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';

export function EditProfile() {
  const navigation = useNavigation();
  const {auth} = useAuth();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.GET_USER + `/${auth.userId}`;
      const response = await axiosIntercepted(URL);
      setUser(response.data);
      setName(response.data.userName);
      setPhone(response.data.phoneNumber);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.EDIT_PROFILE;
      const BODY = JSON.stringify({
        username: name,
        phoneNumber: phone,
        image: '',
      });

      await axiosIntercepted.post(URL, BODY);
      setLoader(false)
      navigation.navigate('Settings');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={style.Container}>
      {loader && <Loader />}
      <Header header={'Edit Profile'} />
      <ScrollView>
        <View style={{marginTop: 10}}>
          <InputTextComponent
            upperFont={styles.fontStyle}
            TextUpper={'Name'}
            placeHolder={name}
            value={name}
            onchange={value => setName(value)}
          />
          <InputTextComponent
            upperFont={styles.fontStyle}
            TextUpper={'Phone'}
            placeHolder={phone}
            value={phone}
            onchange={value => setPhone(value)}
          />
          <InputTextComponent
            upperFont={styles.fontStyle}
            TextUpper={'email'}
            placeHolder={user?.email}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.fontStyle}
            TextUpper={'Location'}
            placeHolder={user?.location}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.fontStyle}
            TextUpper={'Role'}
            placeHolder={user?.userType}
            isEditable={false}
          />
          <ButtonComponent
            buttonStyle={styles.button}
            textStyle={styles.textLogin}
            title={'Save'}
            onPresscomponent={updateProfile}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  fontStyle: {
    margin: 10,
    fontWeight: '600',
    color: 'black',
  },
  button: {
    backgroundColor: '#2051E5',
    height: 55,
    width: '97%',
    borderRadius: 30,
    marginVertical: 10,
    alignSelf: 'center',
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
});
