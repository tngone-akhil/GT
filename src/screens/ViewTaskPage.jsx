import React, {useDebugValue, useEffect, useState} from 'react';
import {
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
import {Header, RemarkBox} from '../shared/CommonComponent';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import {useRoute} from '@react-navigation/native';
import {axiosIntercepted} from '../services';
import {useAuth} from '../context/AuthContext';

export function ViewTaskPage() {
  const [details, setDetails] = useState();
  const route = useRoute();
  const {taskId} = route.params;
  const {auth} = useAuth();

  useEffect(() => {
    getTaskDetails();
  }, []);

  const getTaskDetails = async () => {
    try {
      console.log(taskId)
      const URL = BUSINESS_ENDPOINTS.VIEWTASK +`?id=${taskId}`;
      const response = await axiosIntercepted(URL);
      const result = response.data;
      setDetails(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={style.Container}>
      <Header header={'View Task'} />
      <ScrollView>
        <View>
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Concept'}
            placeHolder={details?.concept}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Location'}
            placeHolder={details?.location}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Maintanance Work'}
            placeHolder={details?.maintenanceWork}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Person to Contact in store Name'}
            placeHolder={details?.poc}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Responsibility'}
            placeHolder={details?.responsibility}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Concern Raised Time'}
            placeHolder={details?.concernRaisedDate}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Raised Time'}
            placeHolder={details?.raisedTime}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Priority'}
            placeHolder={details?.priority}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Status'}
            placeHolder={details?.status}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Aging'}
            placeHolder={details?.aging}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Approved Quotation Date'}
            placeHolder={details?.approvedQuotationDate}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            multiLine={true}
            TextUpper={details?.actionPlan}
            placeHolder={'Max'}
            isEditable={false}
          />
          <Text
            style={[styles.upperFont, {color: 'black'}, {marginBottom: 30}]}>
            Remarks
          </Text>
          <RemarkBox
            message={'Task is completed'}
            name={'Akhil'}
            dateAndTime={'MAR 09:00AM'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  upperFont: {
    fontWeight: '500',
    margin: 10,
  },
});
