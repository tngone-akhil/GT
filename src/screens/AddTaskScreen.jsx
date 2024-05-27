import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {style} from './UserManagement';

import {Header, TouchableOpacityTextbox} from '../shared/CommonComponent';
import {InputTextComponent} from '../shared/InputTextComponent';
import {DateTimePickerComponent} from '../shared/DateTimePicker';
import {DropDownComponent} from '../shared/DropDownComponenet';
import {ButtonComponent} from '../shared/ButtonComponent';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosIntercepted} from '../services';
import {useNavigation} from '@react-navigation/native';

let Priority = [
  {label: 'P1', value: 'P1'},
  {label: 'P2', value: 'P2'},
  {label: 'P3', value: 'P3'},
  {label: 'P4', value: 'P4'},
  {label: 'P5', value: 'P5'},
  {label: 'P6', value: 'P6'},
  {label: 'P7', value: 'P7'},
];
let Status = [
  {label: 'Pending', value: 'PENDING'},
  {label: 'Completed', value: 'COMPLETED'},
];

export function AddTaskScreen() {
  const [submit, setSubmit] = useState(false);
  const navigation = useNavigation();
  const [raisedDatePlaceHolder, setRaisedDatePlaceHolder] =
    useState('Raised Date');
  const [raisedDate, setRaisedDate] = useState(new Date());
  const [raisedDateString, setRaisedDateString] = useState(new Date());

  const [raisedTimePlaceHolder, setRaisedTimePlaceHolder] =
    useState('Raised Time');
  const [raisedTime, setRaisedTime] = useState(new Date());
  const [raisedTimeString, setRaisedTimeString] = useState(new Date());

  const [timeVisible, setTimeVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);

  const [quatationVisible, setQuatationVisible] = useState(false);
  const [quationPlaceString, setQuatationPlaceString] = useState('');
  const [quatationDate, setQuatationDate] = useState(new Date());
  const [quationPlaceHolder, setQuatationPlaceHolder] = useState('');

  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [concept, setConcept] = useState('');
  const [location, setLocation] = useState('');
  const [maintenanceWork, setMaintenanceWork] = useState('');
  const [poc, setPoc] = useState('');
  const [aging, setAging] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [responsibility, setResponsibilty] = useState('');

  const save = async () => {
    setSubmit(true);
    try {
      const URL = BUSINESS_ENDPOINTS.CREATE_TASK;
      const BODY = JSON.stringify({
        concept: concept,
        location: location,
        maintenanceWork: maintenanceWork,
        poc: poc,
        responsibility: responsibility,
        concernRaisedDate: raisedDateString,
        raisedTime: raisedTimeString,
        priority: priority,
        status: status,
        aging: aging,
        approvedQuotationDate: quationPlaceString,
        actionPlan: actionPlan,
      });

      const response = await axiosIntercepted.post(URL, BODY);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const raisedTimeFunction = (event, value) => {
    setTimeVisible(false);
    const d = new Date(value);
    setRaisedTime(d);
    const hours =
      d.getUTCHours() < 10 ? '0' + d.getUTCHours() : d.getUTCHours();
    const minutes =
      d.getUTCMinutes() < 10 ? '0' + d.getUTCMinutes() : d.getUTCMinutes();
    setRaisedTimePlaceHolder((hours == 0 ? 12 : hours) + ':' + minutes);
    setRaisedTimeString(hours + ':' + minutes + ':' + '00');
  };

  const raiseDateFunction = (event, value) => {
    setDateVisible(false);
    setRaisedDate(value);
    const month =
      value.getMonth() + 1 < 10
        ? '0' + (value.getMonth() + 1)
        : value.getMonth() + 1;
    const day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
    setRaisedDatePlaceHolder(day + '/' + month + '/' + value.getUTCFullYear());
    setRaisedDateString(value.getUTCFullYear() + '-' + month + '-' + day);
  };

  const quatationDateFunction = (event, value) => {
    setQuatationVisible(false);
    setQuatationDate(value);
    const month =
      value.getMonth() + 1 < 10
        ? '0' + (value.getMonth() + 1)
        : value.getMonth() + 1;
    const day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
    setQuatationPlaceHolder(day + '/' + month + '/' + value.getUTCFullYear());
    setQuatationPlaceString(value.getUTCFullYear() + '-' + month + '-' + day);
  };
  return (
    <SafeAreaView style={style.Container}>
      <Header header={'Add Task'} />
      <ScrollView>
        <View>
          <InputTextComponent
            errorComponent={concept.trim && submit}
            upperFont={stylesall.textUpper}
            TextUpper={'Concept'}
            placeHolder={'Enter Your Concept'}
            value={concept}
            onchange={data => setConcept(data)}
          />
          <InputTextComponent
            errorComponent={location.trim && submit}
            upperFont={stylesall.textUpper}
            TextUpper={'Location'}
            placeHolder={'Enter Your Location'}
            value={location}
            onchange={data => setLocation(data)}
          />
          <InputTextComponent
            errorComponent={maintenanceWork.trim && submit}
            upperFont={stylesall.textUpper}
            TextUpper={'Maintenance Work'}
            placeHolder={'Enter Maintenance Work'}
            multiLine={true}
            value={maintenanceWork}
            onchange={data => setMaintenanceWork(data)}
          />
          <InputTextComponent
            errorComponent={poc.trim && submit}
            upperFont={stylesall.textUpper}
            TextUpper={'Person to Contact in Store name'}
            placeHolder={'Enter Person to contact'}
            value={poc}
            onchange={data => setPoc(data)}
          />
          <InputTextComponent
            errorComponent={responsibility.trim && submit}
            upperFont={stylesall.textUpper}
            TextUpper={'Responsibility'}
            placeHolder={'Enter Responsibility'}
            value={responsibility}
            onchange={data => setResponsibilty(data)}
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

          <DropDownComponent
            placeholder={'Select'}
            functionality={value => setStatus(value)}
            data={Status}
            upperText={'Status'}
          />

          <InputTextComponent
            errorComponent={aging.trim && submit}
            upperFont={stylesall.textUpper}
            TextUpper={'Aging'}
            placeHolder={'Done'}
            value={aging}
            onchange={data => setAging(data)}
          />
          <Text style={stylesall.fontStyle}>Approved Quatation Date</Text>
          <TouchableOpacityTextbox
            onpress={() => {
              setQuatationVisible(true);
            }}
            value={quationPlaceHolder}
          />

          <InputTextComponent
            errorComponent={actionPlan.trim && submit}
            upperFont={stylesall.textUpper}
            TextUpper={'Action Plan'}
            multiLine={true}
            placeHolder={'Action plan'}
            value={actionPlan}
            onchange={data => setActionPlan(data)}
          />

          <ButtonComponent
            onPresscomponent={() => save()}
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
