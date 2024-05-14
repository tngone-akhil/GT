import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {commonStyles} from '../utlis/helpers';

import {useData} from '../context/DataContext';
import {useNavigation} from '@react-navigation/native';

export function LoginPage({navigation}) {
  const {email, setEmail} = useState('');
  const {password, setPassword} = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Image
          source={require('../images/personImage.png')}
          style={{position: 'relative', width: '100%'}}
        />
      </KeyboardAvoidingView>
      <View style={{margin: 10}}>
        <Text style={styles.textLogin}>Login</Text>
        <InputTextComponent
          TextUpper={'Email'}
          upperFont={styles.upperText}
          value={email}
          placeHolder={'Enter your email'}
          onchange={setEmail}
        />
        <InputTextComponent
          secureText={true}
          upperFont={styles.upperText}
          TextUpper={'Password'}
          value={password}
          placeHolder={'Enter your Password'}
          onchange={setPassword}
          isPassword={true}>
          
       
        </InputTextComponent>
     
        <TouchableOpacity onPress={() => navigation.navigate('forget')}>
          <Text style={styles.textForget}>Forgot Password?</Text>
        </TouchableOpacity>
        <ButtonComponent
          buttonStyle={commonStyles.button}
          title="Login"
          textStyle={commonStyles.textInButton}></ButtonComponent>
      </View>
    </SafeAreaView>
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
    marginTop: 80,
  },
  textLogin: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
    marginBottom: 10,
  },
  textForget: {
    color: 'blue',
    textAlign: 'right',
    padding: 10,
    fontWeight: '500',
    fontSize: 14,
  },
  upperText: {
    fontWeight: '500',
    marginTop: 5,
  },
});

export default LoginPage;
