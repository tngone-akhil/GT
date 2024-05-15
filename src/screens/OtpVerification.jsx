import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';


import {ButtonComponent} from '../shared/ButtonComponent';


export function OtpVerification() {
  let OtpInput = useRef(null);
  const [otp, setOtp] = useState('');
  const [minutes, setminutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  function resend(){
    setminutes(1);
    setSeconds(59)
  }

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
                  ref={e => {
                    otpInput = e;
                  }}
                  handleTextChange={e => {
                    setOtp(e);
                  }}
                />
              </View>

              <Text style={{color: 'black'}}>
                I didnt't receive any code.
                <TouchableOpacity onPress={()=>{resend()}} disabled={seconds > 0 || minutes > 0}>
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
