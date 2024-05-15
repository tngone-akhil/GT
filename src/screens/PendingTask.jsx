import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import {BoxView, Header} from '../shared/CommonComponent';
import {styles} from './TaskPage';
import {BUSINESS_ENDPOINTS} from '../services/constants';
import useAxiosPrivate from '../hooks/useAxios';

export function PendingTask() {
  let data = [];
  const axiosIntercepted = useAxiosPrivate();
  useEffect(() => {
    GetAllPendingTask();
  }, []);

  const GetAllPendingTask = async () => {
    try {
      const URL = BUSINESS_ENDPOINTS.GETALLPENDINGTASK;
      const response = await axiosIntercepted.get(URL);
      const result = response.data;
      data = result;
      data.map((res, index) => { key={index};console.log(res.concept,index)})
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header header={'Pending Task'} />
      <ScrollView style={{backgroundColor: '#F2F4FF'}}>
        <View style={styles.view}>
    
       
          {data.map((res, index) => {
            return (
              <BoxView
                key={index}
                Header={res.concept}
                Subheader={res.maintenanceWork}
                status={res.status}
                Date={res.approvedQuotationDate}
                Place={res.location}
                Function={()=>navigation.navigate('editTask')}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
