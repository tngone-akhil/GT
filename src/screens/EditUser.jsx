import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Header} from '../shared/CommonComponent';
import {style} from './UserManagement';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosIntercepted} from '../services';

export function EditUser() {
  const navigation = useNavigation();
  const route = useRoute();
  const {user} = route.params;
  const [name, setName] = useState(user.userName);
  const [phone, setPhone] = useState(user.phoneNumber);

  const EditProfile = async () => {
    try {
      const URL = BUSINESS_ENDPOINTS.EDIT_USER;
      const BODY = JSON.stringify({
        userId: user.userId,
        username: name,
        location: user.location,
        phoneNumber: phone,
      });
      const response = await axiosIntercepted.post(URL, BODY);
      navigation.goBack()
      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={style.Container}>
      <Header header={'Edit User'} />
      <ScrollView>
        <View style={{marginTop: 10}}>
          <InputTextComponent
            value={name}
            onchange={value => setName(value)}
            upperFont={styles.fontStyle}
            TextUpper={'Name'}
            placeHolder={user?.userName}
          />
          <InputTextComponent
            value={phone}
            onchange={value => setPhone(value)}
            upperFont={styles.fontStyle}
            TextUpper={'Phone'}
            placeHolder={user?.phoneNumber}
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
            onPresscomponent={()=>EditProfile()}
            title={'Save'}
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
