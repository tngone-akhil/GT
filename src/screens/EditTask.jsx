import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {style} from './UserManagement';

import {Header, TouchableOpacityTextbox} from '../shared/CommonComponent';
import {InputTextComponent} from '../shared/InputTextComponent';
import {DateTimePickerComponent} from '../shared/DateTimePicker';
import {DropDownComponent} from '../shared/DropDownComponenet';
import {ButtonComponent} from '../shared/ButtonComponent';
import { useNavigation, useRoute } from '@react-navigation/native';

let Status = [
  {label: 'Pending', value: 'PENDING'},
  {label: 'Completed', value: 'COMPLETED'},
];
let Priority = [
  {label: 'P1', value: 'PRIORITY 1'},
  {label: 'P2', value: 'PRIORITY 2'},
  {label: 'P3', value: 'PRIORITY 3'},
  {label: 'P4', value: 'PRIORITY 4'},
  {label: 'P5', value: 'PRIORITY 5'},
  {label: 'P6', value: 'PRIORITY 6'},
  {label: 'P7', value: 'PRIORITY 7'},
];

export function EditTaskScreen() {
  const [raisedDatePlaceHolder, setRaisedDatePlaceHolder] =useState('Raised Date');
  const [raisedDate, setRaisedDate] = useState(new Date());

  const [closedTimePlaceHolder, setClosedTimePlaceHolder] = useState('Raised Time');
  const [closedTime, setClosedTime] = useState(new Date());

  const [closedDatePlaceHolder, setClosedDatePlaceHolder] =useState('Raised Date');
  const [closedDate, setClosedDate] = useState(new Date());

  const [raisedTimePlaceHolder, setRaisedTimePlaceHolder] = useState('Raised Time');
  const [raisedTime, setRaisedTime] = useState(new Date());

  const [timeVisible, setTimeVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);

  const [priority, setPriority] = useState('');

  const navigation = useNavigation()
  const route = useRoute()

  const{taskId} = route.params


  const getTaskDetails = async() =>{
    try{
      const URL = '';
    }catch(err){
      console.log(err)
    }
  }
  return (
    <SafeAreaView style={style.Container}>
      <Header header={'Edit Task'} />
      <ScrollView>
        <View>
          <Text style={styles.fontStyle}>Concern Closing Date</Text>
          <TouchableOpacityTextbox
            onpress={() => {
              setDateVisible(true);
            }}
            value={raisedDatePlaceHolder}
          />

          <Text style={styles.fontStyle}>Closed Time</Text>
          <TouchableOpacityTextbox
            onpress={() => {
              setTimeVisible(true);
            }}
            isClock={true}
            value={raisedTimePlaceHolder}
          />

          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Total Hours'}
            placeHolder={'Total Hours'}
          />
          <DropDownComponent
            placeholder={'Select'}
            functionality={value => setPriority(value)}
            data={Status}
            upperText={'Status'}
          />

          <InputTextComponent
            upperFont={styles.textUpper}
            placeHolder={'Remarks'}
            TextUpper={'Remarks'}
            multiLine={true}
          />

          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Concept'}
            placeHolder={'Enter Your Concept'}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Location'}
            placeHolder={'Enter Your Location'}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Maintenance Work'}
            placeHolder={'Enter Maintenance Work'}
            multiLine={true}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Person to Contact in Store name'}
            placeHolder={'Enter Person to contact'}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Responsibility'}
            placeHolder={'Enter Responsibility'}
          />

          <Text style={styles.fontStyle}>Concern Raised Date</Text>
          <TouchableOpacityTextbox
            onpress={() => {
              setDateVisible(true);
            }}
            value={raisedDatePlaceHolder}
          />

          <Text style={styles.fontStyle}>Raised Time</Text>
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
            upperFont={styles.textUpper}
            TextUpper={'Aging'}
            placeHolder={'Done'}
          />
          <Text style={styles.fontStyle}>Approved Quatation Date</Text>
          <TouchableOpacityTextbox />

          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Action Plan'}
            multiLine={true}
          />

          <ButtonComponent
            textStyle={styles.textLogin}
            onPresscomponent={()=>console.log(taskId)}
            buttonStyle={styles.button}
            title={'Save'}
          />
        </View>
      </ScrollView>
      {timeVisible && (
        <DateTimePickerComponent
          functioning={value => {
            setTimeVisible(false);
          }}
          value={raisedTime}
          mode={'time'}
          display="clock"
        />
      )}

      {dateVisible && (
        <DateTimePickerComponent
          functioning={value => {
            setDateVisible(false);
            console.log(value);
          }}
          value={raisedTime}
          mode={'date'}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
