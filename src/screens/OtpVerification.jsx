import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';

import {ButtonComponent} from '../shared/ButtonComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AUTH_ENDPOINTS} from '../services/constants';
import {axiosBase, axiosIntercepted} from '../services';
import {Loader} from '../shared/CommonComponent';

export function OtpVerification() {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState('');
  const [minutes, setminutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [loader, setLoader] = useState(false);
  const {Email} = route.params;

  const Send = async () => {
    try {
      setLoader(true);
      const URL = AUTH_ENDPOINTS.VERIFY_OTP;
      const BODY = JSON.stringify({
        email: Email,
        code: otp,
      });
      console.log(BODY)
      const response = await axiosBase.post(URL, BODY);
      const result = response.data;
      setLoader(false);
      console.log(result)
  
      if (result.isSuccess == true) {
        navigation.navigate('changepassword', {userId: result.userId});
      }else{
        ToastAndroid.show("OTP is Wrong",ToastAndroid.SHORT)
      }
    } catch (err) {
      console.log(err);
    }
  };

  function resend() {
    setminutes(1);
    setSeconds(59);
    resendOtp();
  }
  const resendOtp = async () => {
    const URL = AUTH_ENDPOINTS.FORGET_REQUEST + `?email=${Email}`;
    const response = await axiosBase.get(URL);
  };

  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds == 0) {
        if (minutes > 0) {
          setminutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  }, [seconds]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      keyboardVerticalOffset={Platform.OS == 'ios' ? 50 : 8}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {loader && <Loader />}
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View>
          <ScrollView>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
                backgroundColor: '#EEF2FF',
              }}>
              <Image source={require('../images/lock.png')} />
            </View>

            <View style={{margin: 15}}>
              <Text style={{color: 'black', fontSize: 30, fontWeight: '600'}}>
                OTP Verification
              </Text>

              <View>
                <Text style={{color: 'blue', fontWeight: '500', marginTop: 10}}>
                  {minutes}:{seconds < 10 ? '0' : ''}
                  {seconds}
                </Text>
              </View>
              <View>
                <OTPTextInput
                  inputCount={6}
                  textInputStyle={styles.otp}
                  // ref={e => {
                  //   otpInput = e;
                  // }}
                  handleTextChange={e => {
                    setOtp(e);
                  }}
                />
              </View>

              <Text style={{color: 'black'}}>
                I didnt't receive any code.
                <TouchableOpacity
                  onPress={() => {
                    resend();
                  }}
                  disabled={seconds > 0 || minutes > 0}>
                  <Text
                    style={{
                      color: minutes > 0 || seconds > 0 ? 'grey' : 'blue',
                      position: 'absolute',
                      top: -15,
                    }}>
                    RESEND
                  </Text>
                </TouchableOpacity>
              </Text>
              <ButtonComponent
                title={'Sent'}
                onPresscomponent={Send}
                buttonStyle={styles.button}
                textStyle={styles.textInButton}
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
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2051E5',
    height: 55,
    width: '100%',
    borderRadius: 30,
    marginTop: 70,
  },
  textInButton: {
    color: 'white',
    padding: 13,
    paddingLeft: 160,
    fontWeight: '500',
    fontSize: 20,
  },
  otp: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingVertical: 8,
    fontSize: 16,
    width: 50,
    textAlign: 'center',
    marginVertical: 15,
  },
});
