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

import {
  Header,
  Loader,
  TouchableOpacityTextbox,
} from '../shared/CommonComponent';
import {InputTextComponent} from '../shared/InputTextComponent';
import {DateTimePickerComponent} from '../shared/DateTimePicker';
import {DropDownComponent} from '../shared/DropDownComponenet';
import {ButtonComponent} from '../shared/ButtonComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosIntercepted} from '../services';



export function EditTaskScreen() {
  const route = useRoute();
  const {task} = route.params;

  let Status = [
    {label: 'Pending', value: 'PENDING'},
    {label: 'Completed', value: 'COMPLETED'},
  ];
  let Priority = [
    {label: 'P1', value: 'P1'},
    {label: 'P2', value: 'P2'},
    {label: 'P3', value: 'P3'},
    {label: 'P4', value: 'P4'},
    {label: 'P5', value: 'P5'},
    {label: 'P6', value: 'P6'},
    {label: 'P7', value: 'P7'},
  ];

  const [closedTimePlaceHolder, setClosedTimePlaceHolder] = useState('');
  const [closedTime, setClosedTime] = useState(new Date());
  const [closedTimeString, setClosedTimeString] = useState();

  const [closedDatePlaceHolder, setClosedDatePlaceHolder] = useState('');
  const [closedDate, setClosedDate] = useState(new Date());
  const [closedDateString, setClosedDateString] = useState();

  const [closedTimeVisible, setClosedTimeVisible] = useState(false);
  const [closedDateVisible, setClosedDateVisible] = useState(false);
  const [quatationDateVisible, setQuatationDateVisible] = useState(false);

  const [quatationDateString, setQuatationDateString] = useState(task.approvedQuotationDate);
  const [quatationDate, setQuatationDate] = useState(new Date());
  const [quatationDatePlaceHolder, setQuatationDatePlaceHolder] = useState(
    task.approvedQuotationDate,
  );

  const [totalHours, setTotalHours] = useState(task?.totalHours);
  const [status, setStatus] = useState(task?.status);
  const [remarks, setRemarks] = useState(task?.remarks);
  const [concept, setConcept] = useState(task?.concept);
  const [location, setLocation] = useState(task?.location);
  const [maintenanceWork, setMaintenanceWork] = useState(task?.maintenanceWork);
  const [poc, setPoc] = useState(task?.poc);
  const [aging, setAging] = useState(task?.aging);
  const [actionPlan, setActionPlan] = useState(task?.actionPlan);
  const [responsibility, setResponsibilty] = useState(task.responsibility);
  const [priority, setPriority] = useState(task?.priority);
  const [loader, setLoader] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getTotalTime();
  }, [closedDateString, closedTimeString]);

  const getTotalTime = async () => {
    try {
      const URL = BUSINESS_ENDPOINTS.TOTAL_HOURS;
      const BODY = JSON.stringify({
        startDate: task.concernRaisedDate,
        startTime: task.raisedTime,
        endDate: closedDateString,
        endTime: closedTimeString,
      });

      const response = await axiosIntercepted.post(URL, BODY);
      setTotalHours(response.data.totalHours);
    } catch (err) {
      console.log(err);
    }
  };

  const editTaskDetails = async () => {
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.EDIT_TASK;
      const BODY = JSON.stringify({
        taskId: task.taskId,
        concept: concept,
        location: location,
        maintenanceWork: maintenanceWork,
        poc: poc,
        responsibility: responsibility,
        concernRaisedDate: task.concernRaisedDate,
        raisedTime: task.raisedTime,
        priority: priority,
        status: status,
        aging: aging,
        approvedQuotationDate: quatationDateString,
        actionPlan: actionPlan,
        remarks: remarks,
        totalHours: totalHours,
      });
      const response = await axiosIntercepted.post(URL, BODY);
      setLoader(false);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const closedDateFunction = (event, value) => {
    setClosedDateVisible(false);
    setClosedDate(value);
    const month =
      value.getMonth() + 1 < 10
        ? '0' + (value.getMonth() + 1)
        : value.getMonth() + 1;
    const day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
    setClosedDatePlaceHolder(day + '/' + month + '/' + value.getUTCFullYear());
    setClosedDateString(value.getUTCFullYear() + '-' + month + '-' + day);
  };

  const closedTimeFunction = (event, value) => {
    setClosedTimeVisible(false);
    const d = new Date(value);
    setClosedTime(d);
    const hours =
      d.getUTCHours() < 10 ? '0' + d.getUTCHours() : d.getUTCHours();
    const minutes =
      d.getUTCMinutes() < 10 ? '0' + d.getUTCMinutes() : d.getUTCMinutes();

    setClosedTimePlaceHolder((hours == 0 ? 12 : hours) + ':' + minutes);
    setClosedTimeString(hours + ':' + minutes + ':' + '00');
  };

  const quatationDateFunction = (event, value) => {
    setQuatationDateVisible(false);
    setQuatationDate(value);
    const month =
      value.getMonth() + 1 < 10
        ? '0' + (value.getMonth() + 1)
        : value.getMonth() + 1;
    const day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
    setQuatationDatePlaceHolder(
      day + '/' + month + '/' + value.getUTCFullYear(),
    );
    setQuatationDateString(value.getUTCFullYear() + '-' + month + '-' + day);
  };



  return (
    <SafeAreaView style={style.Container}>
      {loader && <Loader />}
      <Header header={'Edit Task'} />
      <ScrollView>
        <View>
          <Text style={styles.fontStyle}>Concern Closing Date</Text>
          <TouchableOpacityTextbox
            onpress={() => {
              setClosedDateVisible(true);
            }}
            value={closedDatePlaceHolder}
          />

          <Text style={styles.fontStyle}>Closed Time</Text>
          <TouchableOpacityTextbox
            onpress={() => {
              setClosedTimeVisible(true);
            }}
            isClock={true}
            value={closedTimePlaceHolder}
          />

          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Total Hours'}
            placeHolder={totalHours}
            isEditable={false}
          />
          <DropDownComponent
            placeholder={'Select a value'}
            functionality={value => {
              setStatus(value);
            }}
            data={Status}
            upperText={'Status'}
          />

          <InputTextComponent
            upperFont={styles.textUpper}
            placeHolder={remarks}
            value={remarks}
            TextUpper={'Remarks'}
            multiLine={true}
            onchange={value => setRemarks(value)}
          />

          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Concept'}
            placeHolder={concept}
            value={concept}
            onchange={value => setConcept(value)}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Location'}
            placeHolder={location}
            value={location}
            onchange={value => setLocation(value)}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Maintenance Work'}
            placeHolder={maintenanceWork}
            value={maintenanceWork}
            multiLine={true}
            onchange={value => setMaintenanceWork(value)}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Person to Contact in Store name'}
            placeHolder={poc}
            value={poc}
            onchange={value => setPoc(value)}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Responsibility'}
            placeHolder={responsibility}
            value={responsibility}
            onchange={value => setLocation(value)}
          />

          <Text style={styles.fontStyle}>Concern Raised Date</Text>
          <TouchableOpacityTextbox value={task.concernRaisedDate} />

          <Text style={styles.fontStyle}>Raised Time</Text>
          <TouchableOpacityTextbox isClock={true} value={task.raisedTime} />
          <DropDownComponent
            placeholder={'Select a value'}
            functionality={value => {
              setPriority(value);
            }}
            data={Priority}
            upperText={'Priority'}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Aging'}
            placeHolder={aging}
            value={aging}
            onchange={value => setLocation(value)}
          />
          <Text style={styles.fontStyle}>Approved Quatation Date</Text>
          <TouchableOpacityTextbox
            onpress={() => setQuatationDateVisible(true)}
            value={quatationDatePlaceHolder}
          />

          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Action Plan'}
            multiLine={true}
            placeHolder={actionPlan}
            value={actionPlan}
            onchange={value => setLocation(value)}
          />

          <ButtonComponent
            textStyle={styles.textLogin}
            onPresscomponent={editTaskDetails}
            buttonStyle={styles.button}
            title={'Save'}
          />
        </View>
      </ScrollView>
      {closedTimeVisible && (
        <DateTimePickerComponent
          functioning={closedTimeFunction}
          value={closedTime}
          mode={'time'}
          display="clock"
        />
      )}

      {closedDateVisible && (
        <DateTimePickerComponent
          functioning={closedDateFunction}
          value={closedDate}
          mode={'date'}
        />
      )}
      {quatationDateVisible && (
        <DateTimePickerComponent
          functioning={quatationDateFunction}
          value={quatationDate}
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
