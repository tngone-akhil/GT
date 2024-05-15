import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {commonStyles} from '../utlis/helpers';
import {AUTH_ENDPOINTS} from '../services/constants';
import {axiosBase} from '../services';
import {useAuth} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {storeUserSession} from '../utlis/helpers';

export function LoginPage() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const {auth, setAuth} = useAuth();

  const validation = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setEmailError(true);
    } else if (!password.trim()) {
      setPasswordError(true);
      setEmailError(false)
    } else {
      setPasswordError(false);
      authenticateUser();
    }
  };

  const authenticateUser = async () => {
    // setRefreshing(true);
    try {
      const URL = AUTH_ENDPOINTS.AUTHENTICATE_USER;
      const BODY = JSON.stringify({
        email: email,
        password: password,
      });

      const response = await axiosBase.post(URL, BODY);
      const results = response.data;

      // generalHelpers.fetchLookups();
      // generalHelpers.storeToken(results.userId);
      let NEW_USER = {...auth};

      NEW_USER.userId = results.userId;
      NEW_USER.accessToken = results.token;
      NEW_USER.refreshToken = results.token;
      NEW_USER.role = results.userType;
      NEW_USER.username = results.username;
      NEW_USER.email = results.email;
      // NEW_USER.isHeadQuarters = results.isHeadQuarters;
      storeUserSession({user: NEW_USER});
      setAuth(prev => {
        return {...prev, ...NEW_USER};
      });
    } catch (err) {
      console.log(err);
      // setRefreshing(false);
      // Toast.show({
      //   visibilityTime: 2000,
      //   bottomOffset: 40,
      //   position: 'bottom',
      //   type: 'error',
      //   text1: ApiErrorTexts.oops,
      //   text2: ApiErrorTexts.something,
      // });
    } finally {
      // setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container,{}]}>
      <ScrollView>
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
            errorComponent={emailError}
          />
          <InputTextComponent
            errorComponent={passwordError}
            secureText={true}
            upperFont={styles.upperText}
            TextUpper={'Password'}
            value={password}
            placeHolder={'Enter your Password'}
            onchange={e => setPassword(e)}
            isPassword={true}></InputTextComponent>

          <TouchableOpacity onPress={() => navigation.navigate('forget')}>
            <Text style={styles.textForget}>Forgot Password?</Text>
          </TouchableOpacity>
          <ButtonComponent
            onPresscomponent={validation}
            buttonStyle={commonStyles.button}
            title="Login"
            textStyle={commonStyles.textInButton}></ButtonComponent>
        </View>
      </ScrollView>
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
