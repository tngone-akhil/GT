import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {style} from './UserManagement';

import {Header, TouchableOpacityTextbox} from '../shared/CommonComponent';
import {InputTextComponent} from '../shared/InputTextComponent';
import {DateTimePickerComponent} from '../shared/DateTimePicker';
import {DropDownComponent} from '../shared/DropDownComponenet';
import {ButtonComponent} from '../shared/ButtonComponent';

let Priority = [
  {label: 'P1', value: 'PRIORITY 1'},
  {label: 'P2', value: 'PRIORITY 2'},
  {label: 'P3', value: 'PRIORITY 3'},
  {label: 'P4', value: 'PRIORITY 4'},
  {label: 'P5', value: 'PRIORITY 5'},
  {label: 'P6', value: 'PRIORITY 6'},
  {label: 'P7', value: 'PRIORITY 7'},
];

export function AddTaskScreen() {
  const [raisedDatePlaceHolder, setRaisedDatePlaceHolder] =
    useState('Raised Date');
  const [raisedDate, setRaisedDate] = useState(new Date());

  const [raisedTimePlaceHolder, setRaisedTimePlaceHolder] =
    useState('Raised Time');
  const [raisedTime, setRaisedTime] = useState(new Date());

  const [timeVisible, setTimeVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);

  const [quatationVisible, setQuatationVisible] = useState(false);
  const [quatationDate, setQuatationDate] = useState(new Date());
  const [quationPlaceHolder,setQuatationPlaceHolder] = useState('')

  const [priority, setPriority] = useState('');

  const raisedTimeFunction = (event, value) => {
    setTimeVisible(false);
    const d = new Date(value);
    console.log(d)
    setRaisedTime(d);
    const hours = d.getUTCHours() < 10 ? '0' + d.getUTCHours() : d.getUTCHours();
    const minutes = d.getUTCMinutes() < 10 ? '0' + d.getUTCMinutes() : d.getUTCMinutes();
    setRaisedTimePlaceHolder((hours == 0 ? 12 : hours) + ':' + minutes);
  };

  const raiseDateFunction = (event, value) => {
    setDateVisible(false);
    setRaisedDate(value);
    console.log(value)
    setRaisedDatePlaceHolder(
      value.getDate() + '/' +(value.getMonth()+1) + '/' + value.getUTCFullYear(),
    );
  };

  const quatationDateFunction = (event, value) => {
    setQuatationVisible(false);
    setQuatationDate(value);
    setQuatationPlaceHolder(
      value.getDate() + '/' + (value.getMonth()+1) + '/' + value.getUTCFullYear(),
    );
  };
  return (
    <SafeAreaView style={style.Container}>
      <Header header={'Add Task'} />
      <ScrollView>
        <View>
          <InputTextComponent
            upperFont={stylesall.textUpper}
            TextUpper={'Concept'}
            placeHolder={'Enter Your Concept'}
          />
          <InputTextComponent
            upperFont={stylesall.textUpper}
            TextUpper={'Location'}
            placeHolder={'Enter Your Location'}
          />
          <InputTextComponent
            upperFont={stylesall.textUpper}
            TextUpper={'Maintenance Work'}
            placeHolder={'Enter Maintenance Work'}
            multiLine={true}
          />
          <InputTextComponent
            upperFont={stylesall.textUpper}
            TextUpper={'Person to Contact in Store name'}
            placeHolder={'Enter Person to contact'}
          />
          <InputTextComponent
            upperFont={stylesall.textUpper}
            TextUpper={'Responsibility'}
            placeHolder={'Enter Responsibility'}
          />

          <Text style={stylesall.fontStyle}>Concern Raised Date</Text>
          <TouchableOpacityTextbox
            onpress={() => {
              setDateVisible(true);
            }}
            value={raisedDatePlaceHolder}
          />

          <Text style={stylesall.fontStyle}>Raised Time</Text>
          <TouchableOpacityTextbox
            onpress={() => {
              setTimeVisible(true);
            }}
            isClock={true}
            value={raisedTimePlaceHolder}
          />
          <DropDownComponent
            placeholder={'Select'}
            functionality={value => setPriority(value)}
            data={Priority}
            upperText={'Priority'}
          />
          <InputTextComponent
            upperFont={stylesall.textUpper}
            TextUpper={'Aging'}
            placeHolder={'Done'}
          />
          <Text style={stylesall.fontStyle}>Approved Quatation Date</Text>
          <TouchableOpacityTextbox
            onpress={() => {
              setQuatationVisible(true);
            }}
            value={quationPlaceHolder}
          />

          <InputTextComponent
            upperFont={stylesall.textUpper}
            TextUpper={'Action Plan'}
            multiLine={true}
            placeHolder={'Action plan'}
          />

          <ButtonComponent
            textStyle={stylesall.textLogin}
            buttonStyle={stylesall.button}
            title={'Save'}
          />
        </View>
      </ScrollView>
      {timeVisible && (
        <DateTimePickerComponent
          functioning={raisedTimeFunction}
          value={raisedTime}
          mode="time"
          display="clock"
        />
      )}

      {dateVisible && (
        <DateTimePickerComponent
          functioning={raiseDateFunction}
          value={raisedTime}
          mode={'date'}
        />
      )}

      {quatationVisible && (
        <DateTimePickerComponent
          functioning={quatationDateFunction}
          value={raisedTime}
          mode={'date'}
        />
      )}
    </SafeAreaView>
  );
}
export const stylesall = StyleSheet.create({
  textUpper: {
    fontWeight: '500',
    margin: 10,
  },
  fontStyle: {
    margin: 10,
    fontWeight: '600',
    color: 'black',
  },
  button: {
    backgroundColor: '#2051E5',
    height: 55,
    width: '97%',
    borderRadius: 30,
    marginVertical: 10,
    alignSelf: 'center',
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
});
