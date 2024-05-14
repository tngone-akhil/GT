import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Vector from '../images/svg/Vector';
import {UserBox} from '../shared/CommonComponent';

export function UserManagement() {
  return (
    <SafeAreaView style={style.Container}>
      <View style={{height: 65}}>
        <Text style={style.header}>User Management</Text>
        <TouchableOpacity style={style.addButton}>
          <Vector style={{position: 'absolute', top: 16, right: 17}} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <UserBox
            email={'abiju60@gmail.com'}
            name={'Akhil Biju'}
            role={'User'}
          />
           <UserBox
            email={'abiju60@gmail.com'}
            name={'Akhil Biju'}
            role={'User'}
          />
           <UserBox
            email={'abiju60@gmail.com'}
            name={'Akhil Biju'}
            role={'User'}
          />
           <UserBox
            email={'abiju60@gmail.com'}
            name={'Akhil Biju'}
            role={'User'}
          />
           <UserBox
            email={'abiju60@gmail.com'}
            name={'Akhil Biju'}
            role={'User'}
          />
           <UserBox
            email={'abiju60@gmail.com'}
            name={'Akhil Biju'}
            role={'User'}
          />
           <UserBox
            email={'abiju60@gmail.com'}
            name={'Akhil Biju'}
            role={'User'}
          />
           <UserBox
           Box
            email={'abiju60@gmail.com'}
            name={'Akhil Biju'}
            role={'User'}
          />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

export const style = StyleSheet.create({
  Container: {
    flex: 1,
    alignContent:'center',
    backgroundColor: 'white',
  },
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    paddingTop: 5,
    alignSelf:'center'
  },
  addButton: {
    position: 'absolute',
    height: 55,
    width: 55,
    backgroundColor: 'blue',
    borderRadius: 50,
    right: 10,
  },
});
