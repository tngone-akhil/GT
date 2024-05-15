import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from './UserManagement';
import {useNavigation} from '@react-navigation/native';
import {removeUserSession} from '../utlis/helpers';
import {useAuth} from '../context/AuthContext';
import {BASE_USER} from '../utlis/constants';

export function SettingPage() {
  const {auth, setAuth} = useAuth();
  const navigation = useNavigation();

  const Logout = () => {
    removeUserSession();
    setAuth(BASE_USER);
  };
  return (
    <SafeAreaView style={style.Container}>
      <View>
        <Text style={style.header}>Settings</Text>
      </View>
      <View style={{margin: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('editProfile');
          }}>
          <Text style={[styles.text, {color: 'black'}]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('updatePassword');
          }}>
          <Text style={[styles.text, {color: 'black'}]}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Logout}>
          <Text style={[styles.text, {color: 'red'}]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 5,
  },
});
