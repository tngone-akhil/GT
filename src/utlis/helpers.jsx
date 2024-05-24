import React from 'react';
import {SECURE_STORAGE_KEYS} from './constants';
import EncryptedStorage from 'react-native-encrypted-storage';
import {StyleSheet} from 'react-native';

async function storeUserSession({user}) {
  try {
    await EncryptedStorage.setItem(
      SECURE_STORAGE_KEYS.USER_SESSION,
      JSON.stringify(user),
    );
  } catch (error) {
    return Promise.reject(error);
  }
}

async function retrieveUserSession() {
  try {
    const session = await EncryptedStorage.getItem(
      SECURE_STORAGE_KEYS.USER_SESSION,
    );
    if (session) {
      return JSON.parse(session);
    } else {
      return BASE_USER;
    }
  } catch {
    return BASE_USER;
  }
}

async function retrieveAppTheme(mode) {
  try {
    await EncryptedStorage.getItem(SECURE_STORAGE_KEYS.APP_THEME, mode);
  } catch (error) {
    return Promise.reject(error);
  }
}
export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export function validPhone(phone){
  if(phone.length == 10){
    return true
  }
  return false
}

// async function retrieveAppTheme(setIsDarkMode) {
//   try {
//     let mode =
//       (await EncryptedStorage.getItem(SECURE_STORAGE_KEYS.APP_THEME)) ?? 'dark';
//     setIsDarkMode(mode === 'dark' || mode === null);
//   } catch (ex) {
//     setIsDarkMode(true);
//   }
// }
async function removeUserSession() {
  try {
    await EncryptedStorage.removeItem(SECURE_STORAGE_KEYS.USER_SESSION);
  } catch (error) {
    return Promise.reject(error);
  }
}

const commonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#2051E5',
    height: 55,
    width: '100%',
    borderRadius: 30,
    marginTop: 80,
  },
  textInButton: {
    color: 'white',
    padding: 13,
    paddingLeft: 160,
    fontWeight: '500',
    fontSize: 20,
  },
});
export {
  retrieveAppTheme,
  commonStyles,
  removeUserSession,
  retrieveUserSession,
  storeUserSession,
};
