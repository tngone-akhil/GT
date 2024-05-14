import React from 'react';
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

export function ViewTaskPage() {
  return (
    <SafeAreaView style={style.Container}>
      <Header header={'View Task'} />
      <ScrollView>
        <View>
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Concept'}
            placeHolder={'Max'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Location'}
            placeHolder={'Avenues'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Maintanance Work'}
            placeHolder={'Lights not Working'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Person to Contact in store Name'}
            placeHolder={'Sandeep'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Responsibility'}
            placeHolder={'Vendor'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Concern Raised Time'}
            placeHolder={'22/05/2023'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Raised Time'}
            placeHolder={'09:00'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Priority'}
            placeHolder={'Max'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Status'}
            placeHolder={'Max'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Aging'}
            placeHolder={'Max'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            TextUpper={'Approved Quotation Date'}
            placeHolder={'Max'}
            isEditable={false}
          />
          <InputTextComponent
            upperFont={styles.upperFont}
            multiLine={true}
            TextUpper={'Action Plan'}
            placeHolder={'Max'}
            isEditable={false}
          />
          <Text style={[styles.upperFont, {color: 'black'},{marginBottom:30}]}>Remarks</Text>
         <RemarkBox message={"Task is completed"} name={"Akhil"} dateAndTime={'MAR 09:00AM'}/>
         
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
