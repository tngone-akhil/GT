import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {ButtonComponent} from '../shared/ButtonComponent';
import { useNavigation } from '@react-navigation/native';

export const WelcomePage = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'space-between', alignContent: 'center'}}>
        <Image style={{}} source={require('../images/logo.png')}></Image>
        <ButtonComponent
          buttonStyle={styles.button}
          title={'Get Started'}
          textStyle={styles.text}
          onPresscomponent={() => navigation.navigate('login')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2051E5',
    height: 55,
    width: '100%',
    borderRadius: 30,
    marginTop:"30%"
  
  },
  text: {
    color: 'white',
    padding: 15,
    paddingLeft: 110,
    fontWeight: '500',
    fontSize: 16,
  },
});
