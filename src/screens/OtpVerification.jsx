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
import CountDown from 'react-native-countdown-component';

export function OtpVerification() {
  const navigation = useNavigation();
  const route = useRoute();
  const [counter, SetCounter] = useState(90);
  const [random, SetRandom] = useState(Math.random());
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);
  const [resendOTP,setResendOTP] = useState(false)
  const {Email} = route.params;

  const Send = async () => {
    try {
      setLoader(true);
      const URL = AUTH_ENDPOINTS.VERIFY_OTP;
      const BODY = JSON.stringify({
        email: Email,
        code: otp,
      });

      const response = await axiosBase.post(URL, BODY);
      const result = response.data;
      setLoader(false);


      if (result.isSuccess == true) {
        navigation.navigate('changepassword', {userId: result.userId});
      } else {
        ToastAndroid.show('OTP is Wrong', ToastAndroid.SHORT);
      }
    } catch (err) {

    }
  };

  const resend = () => {
    SetRandom(Math.random())
    setResendOTP(false)
    resendOtp();
  }
  const resendOtp = async () => {
    const URL = AUTH_ENDPOINTS.FORGET_REQUEST + `?email=${Email}`;
    const response = await axiosBase.get(URL);
  };

  

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

              <View style={{}}>
                <CountDown
                  key={random}
                  until={counter}
                  size={15}
                  onFinish={() => setResendOTP(true)}
                  separatorStyle={{color: 'black',}}
                  digitStyle={{backgroundColor: '#FFF'}}
                  digitTxtStyle={{color: 'blue'}}
                  timeToShow={['M', 'S']}
                  showSeparator
                  timeLabels={{m: '', s: ''}}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignSelf: 'center',
                }}></View>
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
                  onPress={resend}
                  disabled={!resendOTP}>
                  <Text
                    style={{
                      color: !resendOTP ? 'grey' : 'blue',
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
