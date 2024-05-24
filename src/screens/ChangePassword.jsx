import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {commonStyles} from '../utlis/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AUTH_ENDPOINTS} from '../services/constants';
import {axiosBase} from '../services';

export function ChangePassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [textBoxError, setTextBoxError] = useState(false);
  const [textError, setTextError] = useState(false);
  const {userId} = route.params;

  const Checking = () => {
    if (password == null) {
      setTextError(true);
     
    } else if (password != confirmPassword) {
      setTextError(false)
      setTextBoxError(true);
    } else {
      changePassword();
    }
  };

  const changePassword = async () => {
    try {
      setTextError(false)
      const URL = AUTH_ENDPOINTS.CHANGE_PASSWORD;
      console.log(URL);
      const BODY = JSON.stringify({
        password: password,
        confirmPassword: confirmPassword,
        userId: userId,
      });
      const response = await axiosBase.post(URL, BODY);
      console.log(response.data);
      navigation.navigate('login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{}} behavior="position">
        <Image
          source={require('../images/background.png')}
          style={{position: 'relative', top: -210, left: 10}}
        />
        <Image
          source={require('../images/password.png')}
          style={{position: 'absolute', left: 95, top: -100}}
        />
      </KeyboardAvoidingView>
      <View style={styles.view2}>
        <View>
          <Text style={{color: 'black', fontSize: 30, fontWeight: '600'}}>
            Enter your Password
          </Text>
        </View>
        <InputTextComponent
          TextUpper={'New Password'}
          errorComponent={textError}
          placeHolder={'######'}
          value={password}
          onchange={setPassword}></InputTextComponent>
        <InputTextComponent
          TextUpper={'Confirm Password'}
          placeHolder={'######'}
          errorComponent={textBoxError}
          value={confirmPassword}
          onchange={setConfirmPassword}></InputTextComponent>
        <ButtonComponent
          onPresscomponent={Checking}
          title={'Done'}
          buttonStyle={styles.button}
          textStyle={commonStyles.textInButton}
        />
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
});
