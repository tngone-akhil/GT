import React, {useState} from 'react';
import {
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {style} from './UserManagement';
import Arrow from '../images/svg/arrow';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {TouchableOpacityTextbox} from '../shared/CommonComponent';
import {DateTimePickerComponent} from '../shared/DateTimePicker';
import {useNavigation} from '@react-navigation/native';

export function FilterPage() {
  const navigation = useNavigation();

  const [toValue, setToValue] = useState('To');
  const [fromValue, setFromValue] = useState('From');

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTo, setModalVisibleTo] = useState(false);

  const onDateChangeFrom = (event, value) => {
    if (Platform.OS === 'android') {
      setModalVisible(false);
    }
    setFromDate(value);
    setFromValue(
      value.getDate() +
        '/' +
        (value.getMonth() + 1) +
        '/' +
        value.getUTCFullYear(),
    );
  };

  const onDateChangeTo = (event, value) => {
    if (Platform.OS === 'android') {
      setModalVisibleTo(false);
    }
    setToDate(value);
    setToValue(
      value.getDate() +
        '/' +
        (value.getMonth() + 1) +
        '/' +
        value.getUTCFullYear(),
    );
  };

  return (
    <SafeAreaView style={[style.Container]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Arrow style={{marginTop: 10, left: 10}} />
        </TouchableOpacity>
        <Text
          style={{color: 'black', fontSize: 30, fontWeight: '600', left: 20}}>
          Filters
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#E7EDFF',
            width: 80,
            height: 30,
            borderRadius: 30,
            marginTop: 10,
            right: 10,
          }}>
          <Text style={{textAlign: 'center', color: 'blue', marginTop: 5}}>
            Clear Filter
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text
          style={{fontSize: 16, fontWeight: '500', color: 'black', margin: 10}}>
          Date
        </Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacityTextbox
            value={fromValue}
            onpress={() => {
              setModalVisible(true);
            }}
          />
          <TouchableOpacityTextbox
            value={toValue}
            onpress={() => {
              setModalVisibleTo(true);
            }}
          />
        </View>
        <View style={{marginTop:10}}>
          <InputTextComponent
            TextUpper={'Location'}
            placeHolder={'Enter Location'}
            upperFont={{fontWeight: '500',marginLeft:10, fontSize: 16}}
          />
          <ButtonComponent
            title={'Apply'}
            buttonStyle={styles.button}
            textStyle={styles.textLogin}
          />
        </View>
      </ScrollView>

      {modalVisible && (
        <DateTimePickerComponent
          functioning={onDateChangeFrom}
          mode={'date'}
          value={fromDate}
        />
      )}

      {modalVisibleTo && (
        <DateTimePickerComponent
          functioning={onDateChangeTo}
          mode={'date'}
          value={toDate}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 60,
    marginTop: 200,
  },
  touchableOpacity: {
    width: '95%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  calender: {
    top: 10,
    right: 10,
  },
  button: {
    backgroundColor: '#2051E5',
    height: 55,
    width: '97%',
    borderRadius: 30,
    marginTop: 80,
    marginLeft: 10,
  },
  textLogin: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    marginTop: 14,
  },
  upperText: {
    paddingLeft:10
  },
});
