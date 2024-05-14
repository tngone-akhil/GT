import React, {useEffect, useState} from 'react';
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
import {DropDownComponent} from '../shared/DropDownComponenet';
import { useNavigation } from '@react-navigation/native';

export function AdvancedFilter() {

  const navigation = useNavigation();
  const [toValue, setToValue] = useState('To');
  const [fromValue, setFromValue] = useState('From');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTo, setModalVisibleTo] = useState(false);
  const[priority,setPriority] = useState('')
  const[staus,setStatus] = useState('')



 let  Priority =[{label:'P1', value :'PRIORITY 1'},
  {label:'P2', value :'PRIORITY 2'},
  {label:'P3', value :'PRIORITY 3'},
  {label:'P4', value :'PRIORITY 4'},
  {label:'P5', value :'PRIORITY 5'},
  {label:'P6', value :'PRIORITY 6'},
  {label:'P7', value :'PRIORITY 7'},
  ]

  let  Status =[{label:'Completed', value :'COMPLETED'},
  {label:'Pending', value :'PENDING'},
  
  ]

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
        <TouchableOpacity onPress={()=>navigation.goBack()}>
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
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 18,
              margin: 10,
            }}>
            Multilevel Filters
          </Text>
          <InputTextComponent
            TextUpper={'Concept'}
            placeHolder={'Enter Concept'}
            upperStyle={styles.upperText}
            upperFont={styles.upperFont}
          />
          <InputTextComponent
            TextUpper={'Location'}
            placeHolder={'Enter Location'}
            upperStyle={styles.upperText}
            upperFont={styles.upperFont}
          />
          <InputTextComponent
            TextUpper={'Responsibility'}
            placeHolder={'Enter Responsibility'}
            upperStyle={styles.upperText}
            upperFont={styles.upperFont}
          />
          <DropDownComponent
            functionality={data =>{setPriority(data) }
            }
            upperText={'Priority'}
            placeholder={'Select Priority'}
            data={Priority}
            upperTextStyle={{color:'black',fontWeight:'500',marginLeft:3}}
          />
          <DropDownComponent
            functionality={data =>{setStatus(data) }
            }
            upperText={'Status'}
            placeholder={'Select Status'}
            data={Status}
            upperTextStyle={{color:'black',fontWeight:'500',marginLeft:3}}
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
    
  },
  upperFont: {
    marginLeft: 10,
    marginTop: 5,
    fontWeight: '500',
  },
});
