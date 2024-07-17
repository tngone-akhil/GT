import React, { useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {style} from './UserManagement';

import {
  Header,
  Loader,
  TouchableOpacityTextbox,
} from '../shared/CommonComponent';
import {InputTextComponent} from '../shared/InputTextComponent';
import {ButtonComponent} from '../shared/ButtonComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {axiosIntercepted} from '../services';

export function EditTaskScreenClient() {
  const route = useRoute();
  const {task} = route.params;

  const [remark, setRemark] = useState(task?.actionPlan);
  const [loader,setLoader] = useState(false)

  const navigation = useNavigation();



  const editTaskDetails = async () => {
    try {
      setLoader(true);
      const URL = BUSINESS_ENDPOINTS.EDIT_TASK;
      const BODY = JSON.stringify({
        taskId: task?.taskId,
        concept: task?.concept,
        location: task?.location,
        maintenanceWork: task?.maintenanceWork,
        poc: task?.poc,
        responsibility: task?.responsibility,
        concernRaisedDate: task.concernRaisedDate,
        raisedTime: task.raisedTime,
        priority: task?.priority,
        status: task?.status,
        aging: task?.aging,
        approvedQuotationDate: task?.quatationDateString,
        actionPlan: task?.actionPlan,
        remarks: remark,
        totalHours: task?.totalHours,
      });
      const response = await axiosIntercepted.post(URL, BODY);
      setLoader(false);
      navigation.goBack();
    } catch (err) {

      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={style.Container}>
      {loader && <Loader />}
      <Header header={'Edit Task'} />
      <ScrollView>
        <View>
          

          <InputTextComponent
            upperFont={styles.textUpper}
            placeHolder={task?.remarks}
            TextUpper={'Remarks'}
            value ={remark}
            onchange={(value)=>setRemark(value)}
            multiLine={true}
          />

          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Concept'}
            placeHolder={task?.concept}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Location'}
            placeHolder={task?.location}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Maintenance Work'}
            placeHolder={task?.maintenanceWork}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Person to Contact in Store name'}
            placeHolder={task?.poc}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Responsibility'}
            placeHolder={task?.responsibility}
            isEditable={false}
          />

          <Text style={styles.fontStyle}>Concern Raised Date</Text>
          <TouchableOpacityTextbox color={"#ECECEC"} value={task.concernRaisedDate} />

          <Text style={styles.fontStyle}>Raised Time</Text>
          <TouchableOpacityTextbox color={"#ECECEC"} isClock={true} value={task.raisedTime} />

          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'priority'}
            placeHolder={task?.priority}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Aging'}
            placeHolder={task?.aging}
            isEditable={false}
          />
          <Text style={styles.fontStyle}>Approved Quatation Date</Text>
          <TouchableOpacityTextbox color={"#ECECEC"}
            value={task?.quatationDatePlaceHolder}
          />

          <InputTextComponent
            upperFont={styles.textUpper}
            TextUpper={'Action Plan'}
            multiLine={true}
            placeHolder={task?.actionPlan}
            isEditable={false}
          />

          <ButtonComponent
            textStyle={styles.textLogin}
            onPresscomponent={editTaskDetails}
            buttonStyle={styles.button}
            title={'Save'}
          />
        </View>
      </ScrollView>
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
