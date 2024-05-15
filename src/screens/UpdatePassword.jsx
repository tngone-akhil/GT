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


export function UpdatePassword() {
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
              }}>
              <Image source={require('../images/lock.png')} />
            </View>

            <View style={{margin: 10}}>
              <Text style={{color: 'black', fontSize: 30, fontWeight: '600'}}>
                Enter Your Password
              </Text>

              <InputTextComponent
                upperFont={styles.upperText}
                TextUpper={'New Password'}
                placeHolder={'#######'}
                value={email}
                onchange={setEmail}
              />
              <InputTextComponent
                upperFont={styles.upperText}
                TextUpper={'Confirm Password'}
                placeHolder={'#######'}
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
