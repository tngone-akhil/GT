import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';


export function ForgetPassword() {
  const {email, setEmail} = useData('');
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
                backgroundColor:'#EEF2FF'
              }}>
              <Image source={require('../images/forgetPassword.png')} />
            </View>

            <View style={{margin: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 30,
                  fontWeight: '600',
                  marginBottom: 10,
                  width:'50%'
                }}>
                Forget your Password?
              </Text>

              <InputTextComponent
                upperFont={styles.upperText}
                TextUpper={'E-Mail'}
                placeHolder={'Enter your Email'}
                value={email}
                onchange={setEmail}
              />

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
  view2: {
    marginTop: -150,
    margin: 15,
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
    margin: 5,
    fontSize: 16,
    fontWeight: '500',
  },
});
