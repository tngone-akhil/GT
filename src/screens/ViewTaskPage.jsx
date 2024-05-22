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

import {useRoute} from '@react-navigation/native';


export function ViewTaskPage() {
  const [details, setDetails] = useState();
  const route = useRoute();
  const {task} = route.params;
  console.log(task)

  return (
    <SafeAreaView style={style.Container}>
      <Header header={'View Task'} />
      <ScrollView>
        <View>
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Concept'}
            placeHolder={task.concept}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Location'}
            placeHolder={task.location}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Maintanance Work'}
            placeHolder={task.maintenanceWork}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Person to Contact in store Name'}
            placeHolder={task.poc}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Responsibility'}
            placeHolder={task.responsibility}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Concern Raised Time'}
            placeHolder={task.concernRaisedDate}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Raised Time'}
            placeHolder={task.raisedTime}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Priority'}
            placeHolder={task.priority}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Status'}
            placeHolder={task.status}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Aging'}
            placeHolder={task.aging}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Approved Quotation Date'}
            placeHolder={task.approvedQuotationDate}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            multiLine={true}
            TextUpper={'Action Plan'}
            placeHolder={task.actionPlan}
            isEditable={false}
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
