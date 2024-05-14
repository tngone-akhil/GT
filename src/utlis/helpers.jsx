
import React, { useState } from 'react';
import { SECURE_STORAGE_KEYS } from './constants';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StyleSheet } from 'react-native';

async function retrieveAppTheme() {
    try{
        await EncryptedStorage.getItem(SECURE_STORAGE_KEYS.APP_THEME)
    }catch(error){
        return Promise.reject(error)
    }
    
}


export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState(true);
  
    const handlePasswordVisibility = () => {
      if (rightIcon) {
        setRightIcon(false);
        setPasswordVisibility(true);
      } else {
        setRightIcon(true);
        setPasswordVisibility(true);
      }
    };
  
    return {
      passwordVisibility,
      rightIcon,
      handlePasswordVisibility,
    };
  };

const commonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#2051E5',
    height: 55,
    width: '100%',
    borderRadius: 30,
    marginTop: 80,
  },
  textInButton:{
    color : 'white',
    padding : 13,
    paddingLeft : 160,
    fontWeight : '500',
    fontSize : 20
  },
})
export {retrieveAppTheme,commonStyles}