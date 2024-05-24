import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {AUTH_ENDPOINTS, BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosBase, axiosIntercepted} from '../services';
import {useNavigation} from '@react-navigation/native';

export function UpdatePassword() {
  const navigation = useNavigation();
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    checkNewPassword();
    confirmChecking();
  }, [password]);

  const [onclickPassword, setonclickPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const checkNewPassword = () => {
    const regex =
      /^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&?@ ]).*$/;

    if (!regex.test(password.password)) {
      return true;
    }
    return false;
  };

  const confirmChecking = () => {
    if (password.password != password.confirmPassword) {
      return true;
    }
    return false;
  };

  const updatePassword = async () => {
    if (confirmChecking() || checkNewPassword()) {
      console.log('error');
      ToastAndroid.show('something went wrong', ToastAndroid.SHORT);
      return;
    }
    try {
      const URL = AUTH_ENDPOINTS.UPDATE_PASSWORD;
      const BODY = JSON.stringify({
        password: password.password,
        confirmPassword: password.confirmPassword,
      });
      const res = await axiosIntercepted.post(URL, BODY);
      navigation.navigate('Settings');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      keyboardVerticalOffset={Platform.OS == 'ios' ? 50 : 8}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View>
          <ScrollView>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
              }}>
              <Image source={require('../images/lock.png')} />
            </View>

            <View style={{margin: 10}}>
              <Text style={{color: 'black', fontSize: 30, fontWeight: '600'}}>
                Enter Your Password
              </Text>

              <InputTextComponent
                isPassword={true}
                upperFont={styles.upperText}
                TextUpper={'New Password'}
                placeHolder={'#######'}
                value={password.password}
                errorText={
                  'Password must be at least 6 characters with the combination of uppercase, lowercase, number and symbols.'
                }
                errorComponent={onclickPassword && checkNewPassword()}
                onchange={data => {
                  setPassword(prev => {
                    setonclickPassword(true);
                    return {...prev, password: data};
                  });
                }}
              />
              <InputTextComponent
                isPassword={true}
                upperFont={styles.upperText}
                TextUpper={'Confirm Password'}
                placeHolder={'#######'}
                value={password.confirmPassword}
                errorText={'Passwords are not same'}
                errorComponent={confirmChecking() && confirmPassword}
                onchange={data => {
                  setPassword(prev => {
                    setConfirmPassword(true);
                    return {...prev, confirmPassword: data};
                  });
                }}
              />
              <ButtonComponent
                title={'Sent'}
                buttonStyle={styles.button}
                textStyle={styles.textInButton}
                onPresscomponent={updatePassword}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2051E5',
    height: 55,
    width: '100%',
    borderRadius: 30,
    marginTop: 30,
  },
  textInButton: {
    color: 'white',
    padding: 13,
    paddingLeft: 160,
    fontWeight: '500',
    fontSize: 20,
  },
  upperText: {
    margin: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
