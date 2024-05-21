import React, {useState} from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { AUTH_ENDPOINTS } from '../services/constants';
import { axiosIntercepted } from '../services';

const roles = [
  {label: 'Admin', value: 'ADMIN'},
  {label: 'User', value: 'CLIENT'},
];

export function AddUser() {

  const navigation = useNavigation()
  const [locationOn, setLocationOn] = useState(true);
  const [headQuaterOn, setHeadQuaterOn] = useState(false);
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [location,setLocation] = useState('')
  const [role,setRole] = useState('');
  const [loader,setLoader] = useState(false)


  const saveUser = async() =>{
    try{
      setLoader(true)
      const URL = AUTH_ENDPOINTS.ADD_USER
      const BODY = JSON.stringify(
        {
          name: name,
          email: email,
          phoneNumber: phone,
          location: location,
          role: role
        }
      )
      const response = await axiosIntercepted.post(URL,BODY)
      navigation.navigate('User')
      setLoader(false)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={style.Container}>
       {loader && <Loader />}
      <Header header={'Add User'} />
      <ScrollView>
        <View>
          <InputTextComponent
            upperFont={stylesall.fontStyle}
            TextUpper={'Name'}
            value={name}
            onchange={e=>setName(e)}
            placeHolder={'Enter the Name'}
          />
          <InputTextComponent
            upperFont={stylesall.fontStyle}
            TextUpper={'Email'}
            value={email}
            onchange={e=>setEmail(e)}
            placeHolder={'Enter the Email'}
          />
          <InputTextComponent
            upperFont={stylesall.fontStyle}
            TextUpper={'Phone'}
            value={phone}
            onchange={e=>setPhone(e)}
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
          <InputTextComponent onchange={e=>setLocation(e)} placeHolder={'Enter the Name'} />
          <DropDownComponent
            upperText={'Role'}
            placeholder={'Select Role'}
            data={roles}
            functionality={(value)=>{setRole(value)}}
          />
          <ButtonComponent
            onPresscomponent={saveUser}
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
